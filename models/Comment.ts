import { CommentsInterface } from "@/types/Post";
import mongoose, { Model, Schema } from "mongoose";

const CommentsSchema: Schema<CommentsInterface> = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [2000, "Content cannot be more than 2000 characters"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

const Comment: Model<CommentsInterface> =
  mongoose.models.Comment ||
  mongoose.model<CommentsInterface>("Comment", CommentsSchema);

export default Comment;
