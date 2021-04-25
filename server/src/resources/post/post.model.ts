import { Schema, model, Types, Document } from "mongoose";

export interface IPost extends Document {
  name: string;
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, required: true },
  keywords: { type: [String], required: true },
  comments: { type: [Types.ObjectId], ref: "Comment" },
});

export default model<IPost>("Post", PostSchema);
