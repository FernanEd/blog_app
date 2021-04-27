import { Document } from "mongoose";
import { IPost } from "../post/post.model";
export interface IComment extends Document {
    content: string;
    timestamp: Date;
    poster: string;
    originalPost: IPost | string;
}
declare const _default: import("mongoose").Model<IComment, {}>;
export default _default;
