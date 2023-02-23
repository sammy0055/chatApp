//import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
export const generateUserToken = (id: string) => {
  return jwt.sign({ id }, 'shhhhh');
};
