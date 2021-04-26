import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.pre("save", async function () {
  const oldPwd = this.password;
  const newPwd = await bcrypt.hash(oldPwd, 10);
  this.password = newPwd;
});

export default model<IUser>("User", UserSchema);
