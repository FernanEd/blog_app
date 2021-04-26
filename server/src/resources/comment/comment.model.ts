import { Schema, model, Types, Document } from "mongoose";
import { IPost } from "../post/post.model";

export interface IComment extends Document {
  content: string;
  timestamp: Date;
  poster: string;
  originalPost: IPost | string;
}

const CommentSchema = new Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date() },
  poster: { type: String, required: true },
  originalPost: { type: Types.ObjectId, ref: "Post", required: true },
});

export default model<IComment>("Comment", CommentSchema);
