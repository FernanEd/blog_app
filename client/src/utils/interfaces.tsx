export interface IComment {
  content: string;
  timestamp: Date;
  poster: string;
  originalPost: IPost;
}

export interface IPost {
  title: string;
  content: string;
  author: IUser;
  timestamp: Date;
  keywords: string[];
  isPublished: boolean;
}

export interface IUser {
  username: string;
  password: string;
  isAdmin: boolean;
}
