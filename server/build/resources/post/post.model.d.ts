import { Document } from "mongoose";
import { IUser } from "../user/user.model";
export interface IPost extends Document {
    title: string;
    content: string;
    author: IUser | string;
    timestamp: Date;
    isPublished: boolean;
}
declare const _default: import("mongoose").Model<IPost, {}>;
export default _default;
