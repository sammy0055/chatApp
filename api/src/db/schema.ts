import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { IChat } from "./types";
export const ObjectId = Schema.Types.ObjectId;

const CHAT_SCHEMA = new Schema<any>(
  {
    chatName: { type: String, trim: true, required: true },
    isGroup: { type: Boolean, default: false },
    users: [{ type: ObjectId, ref: "User" }],
    latestMessage: {
      type: ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const MESSAGE_SCHEMA = new Schema(
  {
    sender: { type: ObjectId, ref: "User", required: true },
    content: { type: String, trim: true, required: true },
    chat: { type: ObjectId, ref: "Chat", required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const USER_SHEMA = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, requred: true, unique: true },
    password: { type: String, required: true },
    profilePictureUrl: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

USER_SHEMA.pre("save", async function (next) {
  if (!this.isModified) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

USER_SHEMA.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const ChatModel = models.Chat || model("Chat", CHAT_SCHEMA);
export const MessageModel = models.Message || model("Message", MESSAGE_SCHEMA);
export const UserModel = models.User || model("User", USER_SHEMA);
