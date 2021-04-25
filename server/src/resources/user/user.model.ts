import { Schema, model, Types, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

export default model<IUser>("User", UserSchema);
