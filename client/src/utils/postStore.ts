import { IPost } from "./interfaces";
import makeObservable from "./makeObservable";

const postStore = makeObservable(<Array<any>>[]);

export default postStore;
