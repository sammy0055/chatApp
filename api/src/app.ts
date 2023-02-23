import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

import { router as userRouter } from "./routes/userRouter";
import { router as chatRouter } from "./routes/chatRouter";
import { messageRoute } from "./routes/messageRoute";
import connectDB from "./db";

connectDB();

const app: Express = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoute);

app.listen("5000", () => {
  console.info(`server running on port: ${5000}`);
});
