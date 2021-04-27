import { Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    password: string;
    isAdmin: boolean;
}
declare const _default: import("mongoose").Model<IUser, {}>;
export default _default;
