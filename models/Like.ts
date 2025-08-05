import { LikesInterface } from "@/types/Post";
import mongoose, { Model, Schema } from "mongoose";
const LikeSchema: Schema<LikesInterface> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
  },
  {
    timestamps: true,
  }
);
const Like: Model<LikesInterface> =
  mongoose.models.Like || mongoose.model<LikesInterface>("Like", LikeSchema);

export default Like;
