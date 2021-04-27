import { Schema, model, Types, Document } from "mongoose";
import { IUser } from "../user/user.model";

export interface IPost extends Document {
  title: string;
  content: string;
  author: IUser | string;
  timestamp: Date;
  isPublished: boolean;
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date() },
  isPublished: { type: Boolean, required: true, default: false },
});

export default model<IPost>("Post", PostSchema);
