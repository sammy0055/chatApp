import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../db/schema";
import { errorLogger } from "../utils/error/logger";

export const authGateway = async (
  req: Request,
  res: Response<{}, { user: any }>,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(500).json({
      error: { code: "unauthorized", message: "user is not logged in" },
    });
  try {
    const decodedToken = jwt.verify(authorization, process.env.client_secret!);
    req.user = decodedToken as { id: string; iat: number };

    next();
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res.status(400).send(errMesage);
  }
};
