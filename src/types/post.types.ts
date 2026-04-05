import { IUser } from "./user.types";


export enum PostVisibility {
  PUBLIC = "public",
  PRIVATE = "private"
}

export interface IPost {
  _id?: string;
  author: IUser;
  content: string;
  image?: string;
  visibility: PostVisibility;
  likes: IUser[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
