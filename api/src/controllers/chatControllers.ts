import { Request, Response } from "express";
import { ChatModel, UserModel } from "../db/schema";
import { errorLogger } from "../utils/error/logger";

export const accessChat = async (
  req: Request<{}, {}, { userId: string }>,
  res: Response
) => {
  const { userId } = req.body;
  if (!userId) return res.sendStatus(400);
  try {
    var isChat = await ChatModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name, profilePictureUrl, email",
    });

    if (isChat.length > 0) res.status(200).json({ data: isChat[0] });
    else {
      var chatData = {
        chatName: "sender",
        isGroup: false,
        users: [req.user.id, userId],
      };
      const createdChat = await ChatModel.create(chatData);
      const fullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(200).json({ data: fullChat });
    }
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res
      .status(400)
      .json({ error: { code: "bad request", message: errMesage } });
  }
};

export const fetchChats = async (req: Request, res: Response) => {
  try {
    let userChats = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    userChats = await UserModel.populate(userChats, {
      path: "latestMessage.sender",
      select: "name, profilePictureUrl, email",
    });
    return res.status(200).json({ data: userChats });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res
      .status(400)
      .json({ error: { code: "bad request", message: errMesage } });
  }
};

export const createGroupChat = async (
  req: Request<{}, {}, { name: string; users: string[] }>,
  res: Response
) => {
  if (!req.body.users || !req.body.name)
    return res.status(400).json({
      error: {
        code: "bad input",
        message: "please fill all required fields",
      },
    });
  const users = req.body.users;
  if (users.length < 2)
    return res.status(400).json({
      error: {
        code: "users not valid",
        message: "more than two users are required",
      },
    });

  users.push(req.user.id);
  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroup: true,
      groupAdmin: req.user.id,
    });

    const fullChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({ data: fullChat });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res
      .status(400)
      .json({ error: { code: "bad request", message: errMesage } });
  }
};

export const renameGroup = async (
  req: Request<{}, {}, { chatId: string; chatName: string }>,
  res: Response
) => {
  const { chatId, chatName } = req.body;
  if (!chatId && !chatName)
    return res.status(400).json({
      error: {
        code: "bad request",
        message: "chatId and chatName most be valid",
      },
    });
  try {
    const updateChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updateChat)
      return res
        .status(404)
        .json({ error: { code: "not-found", message: "not found" } });
    res.status(200).json({ data: updateChat });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res
      .status(400)
      .json({ error: { code: "bad request", message: errMesage } });
  }
};

export const removeUserFromGroup = async (
  req: Request<{}, {}, { chatId: string; userId: string }>,
  res: Response
) => {
  const { chatId, userId } = req.body;
  if (!chatId && !userId)
    return res.status(400).json({
      error: {
        code: "bad request",
        message: "chatId and chatName most be valid",
      },
    });
  try {
    const removedUser = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removedUser) return res.status(404);
    res.status(200).json({ data: removedUser });
  } catch (error) {
    const errorData = errorLogger(400);
    return res
      .status(501)
      .json({ error: errorData });
  }
};

export const addUserToGroup = async (req: any, res: any) => {
  const { chatId, userId } = req.body;
  try {
    const addedUser = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!addedUser) return res.status(404);
    res.status(200).json({ data: addedUser });
  } catch (error: any) {
    const errMesage = errorLogger(error);
    return res
      .status(501)
      .json({ error: { code: "bad request", message: errMesage } });
  }
};
