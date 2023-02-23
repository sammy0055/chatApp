import { UserModel } from "../db/schema";
import { writeTODB } from "../utils/conmon-db-functions";
import expressAsyncHandler from "express-async-handler";
import { generateUserToken } from "../utils/generateToken";
import { errorLogger } from "../utils/error/logger";
import { filter_allUsers } from "../utils/db-filters";

import { Request, Response, NextFunction } from "express";
import { User } from "../types";

type body = {
  name: string;
  email: string;
  password: string;
};
export const registerUser = expressAsyncHandler(
  async (
    req: Request<{}, {}, User>,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { name, email, password, profilePictureUrl } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send("Please enter all fields");
        //throw new Error("Please enter all fields");
      }
      const isUser = await UserModel.findOne({ email });
      if (isUser) throw new Error("user already exist");

      const user = await writeTODB(req.body, UserModel);
      if (user)
        return res
          .status(201)
          .json({ ...user, token: generateUserToken(user._id) });
      else return res.status(400).send("request failed please try again");
    } catch (error: any) {
      const errMesage = errorLogger(error);
      return res.status(400).send(`request failed, ${errMesage}`);
    }
  }
);

export const login = expressAsyncHandler(
  async (req: any, res: any, next): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user: any = await UserModel.findOne({ email });
      if (user) {
        if (user && (await user.matchPassword(password)))
          return res
            .status(200)
            .json({ ...user._doc, token: generateUserToken(user._id) });
        else throw new Error("wrong password");
      } else throw new Error("user does not exist");
    } catch (error: any) {
      console.info(error?.message);
      return res.status(400).send(error?.message);
    }
  }
);

export const allUsers = async (
  req: Request<{}, {}, {}, { search: string }>,
  res: Response
) => {
  const { search } = req.query;
  if (!search)
    return res.status(401).json({
      error: {
        code: "bad query",
        message: "search query most be a valid string",
      },
    });
  try {
    const users = await UserModel.find(filter_allUsers(req.query.search)).find({
      _id: { $ne: req.user.id },
    });
    res.status(200).json({ data: users });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res.status(400).send(errMesage);
  }
};
