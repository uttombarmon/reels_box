import mongoose, { Document } from "mongoose";
export interface PostInterface extends Document {
  _id: mongoose.Types.ObjectId;
  caption?: string;
  contentUrl?: string;
  // contentType: "text" | "image" | "video" | "link";
  userId: mongoose.Types.ObjectId;
  videoId?: mongoose.Types.ObjectId;
  likes?: LikesInterface[];
  comments: CommentsInterface[];
  tags?: string[];
  visibility: "public" | "private" | "unlisted";
  createdAt: Date;
  updatedAt: Date;
}
export interface LikesInterface {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export interface CommentsInterface {
  _id: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  likes: number;
  replies?: CommentsInterface[];
  visibility: "public" | "private" | "unlisted";
  createdAt: Date;
  updatedAt: Date;
}
