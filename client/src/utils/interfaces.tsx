export interface IComment extends Document {
  content: string;
  timestamp: Date;
  poster: string;
  originalPost: IPost;
}

export interface IPost extends Document {
  title: string;
  content: string;
  author: IUser;
  timestamp: Date;
  keywords: string[];
  isPublished: boolean;
}

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
}
