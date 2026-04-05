

export enum UserRole {
  USER = "user",
  ADMIN = "ADMIN"
}

export enum UserStatus {
  PENDING = "pending",
  BLOCKED = "blocked",
  ACTIVE = "active"
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  bio?: string;
  interests?: string[];
  location?: string;
  role?: UserRole;
  status?: UserStatus;
  profileImg?: string; 
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}