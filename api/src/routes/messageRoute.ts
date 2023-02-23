import express from "express"
import { authGateway } from "../controllers/auth"
import { allMessages, sendMessage } from "../controllers/messageControllers"

export const messageRoute = express.Router()

 messageRoute.post("/", authGateway, sendMessage)
 messageRoute.get("/:chatId", authGateway, allMessages)