import express from "express";
import { authGateway } from "../controllers/auth";
import {
  accessChat,
  addUserToGroup,
  createGroupChat,
  fetchChats,
  removeUserFromGroup,
  renameGroup,
} from "../controllers/chatControllers";

export const router = express.Router();

router.route("/").post(authGateway, accessChat).get(authGateway, fetchChats);
router.route("/group").post(authGateway, createGroupChat);
router.route("/rename").put(authGateway, renameGroup);
router.route("/groupremove").put(authGateway, removeUserFromGroup);
router.route("/groupadd").put(authGateway, addUserToGroup);
