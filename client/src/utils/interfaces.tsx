export interface IComment {
  content: string;
  timestamp: Date;
  poster: string;
  originalPost: string;
}

export interface IPost {
  title: string;
  content: string;
  author: IUser | string;
  timestamp: Date;
  isPublished: boolean;
}

export interface IUser {
  username: string;
  password: string;
  isAdmin: boolean;
}
