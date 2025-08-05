import mongoose from "mongoose";

export interface UserPublic {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  username: string;
  bio: string;
  followings: number;
  followers: number;
  likes: number;
}
