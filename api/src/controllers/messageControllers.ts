import { Request, Response } from "express";
import { Message } from "../types";
import { errorLogger } from "../utils/error/logger";
import { MessageModel, UserModel, ChatModel } from "../db/schema";

export const sendMessage = async (
  req: Request<{}, {}, Message>,
  res: Response
) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    const errorData = errorLogger(400);
    return res.status(400).json({
      error: errorData,
    });
  }

  let newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "name profilePictureUrl");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await ChatModel.findByIdAndUpdate(chatId, {
      $set: { latestMessage: message },
    });

    return res.status(200).json({ data: message });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const allMessages = async (
  req: Request<{ chatId: string }>,
  res: Response
) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name email profilePictureUrl")
      .populate("chat");
    return res.status(200).json({ data: messages });
  } catch (error: any) {
    return res.status(500).send(error.meesage);
  }
};
