import { Document } from "mongoose";

export interface IChat extends Document {
  title: string;
}
