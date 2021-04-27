import express from "express";
import config from "./utils/config";
import mongoose from "mongoose";
const app = express();

// Middleware

import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

import { signin, verify } from "./utils/auth";

app.post("/signin", signin);
app.use("/verify", verify);
// Routers

import userRouter from "./resources/user/user.router";
import commentRouter from "./resources/comment/comment.router";
import postRouter from "./resources/post/post.router";

app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

export default async () => {
  await mongoose.connect(config.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.listen(config.PORT, () => {
    console.log("Server ready!");
  });
};
