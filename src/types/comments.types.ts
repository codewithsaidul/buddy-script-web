import { IPost } from "./post.types";
import { IUser } from "./user.types";


export interface IComment {
  _id?: string;
  post: IPost;  
  user: IUser; 
  text: string;
  isLiked?: boolean;
  parentId?: string | null;
  likes: IUser[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}