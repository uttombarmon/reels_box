import mongoose from "mongoose";

export interface UserInterface {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  username?: string;
  bio?: string;
  following?: [mongoose.Types.ObjectId];
  followers?: [mongoose.Types.ObjectId];
  likes?: [mongoose.Types.ObjectId];
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
