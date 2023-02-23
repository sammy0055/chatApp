import express from "express";
import { authGateway } from "../controllers/auth";
import { allUsers, login, registerUser } from "../controllers/userControllers";

export const router = express.Router()

router.post("/login", login)
router.route("/register").post(registerUser)
router.route("/").get(authGateway, allUsers)

