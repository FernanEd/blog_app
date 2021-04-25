import { Schema, model, Types, Document } from "mongoose";

export interface IComment extends Document {
  name: string;
}

const CommentSchema = new Schema({
  name: { type: String, required: true },
});

export default model<IComment>("Comment", CommentSchema);