import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { s3Config } from "../config/aws-config";
import { v4 as uuid } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { errorLogger } from "../utils/error/logger";

const s3Client = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
});

export const uploadImage = async (req: any, res: any) => {
  try {
    const { fileType, fileSize } = req.body;

    const imageId = uuid();
    const imageExtension = fileType.split("/").pop();
    const newImagePath = `${imageId}.${imageExtension}`;

    const fileUploadParams = {
      Bucket: s3Config.bucketName,
      Key: newImagePath,
      ContentType: fileType,
      ContentLength: fileSize,
    };

    const command = new PutObjectCommand(fileUploadParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    res.status(200).json({ uploadUrl: signedUrl, imageId: newImagePath });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res.status(400).send(errMesage);
  }
};

export const downloadImage = async (req: any, res: any) => {
  const { imageId } = req.params;
  const fileDownloadParams = {
    Bucket: s3Config.bucketName,
    Key: imageId,
  };
  try {
    const command = new GetObjectCommand(fileDownloadParams)

    // Create the presigned URL.
    const data = await s3Client.send(command);
    // Convert the ReadableStream to a string.
    const url = await data?.Body?.transformToByteArray()
    console.log("xxx", data);

    if (data) res.send(data)
    else throw new Error("failed");

    //res.status(200).json({ imageUrl: signedUrl });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res.status(400).send(errMesage);
  }
};
