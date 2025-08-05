import { PostInterface } from "@/types/Post";
import mongoose, { Model, Schema } from "mongoose";
import Comment from "./Comment";
import Like from "./Like";

const PostSchema: Schema<PostInterface> = new Schema(
  {
    caption: {
      type: String,
      trim: true,
      maxlength: [1000, "Caption cannot be more than 1000 characters"],
    },
    contentUrl: {
      type: String,
      trim: true,
      maxlength: [2000, "Content URL cannot be more than 2000 characters"],
      validate: {
        validator: function (v: string | undefined) {
          if (!v) return true;
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid URL for contentUrl!`,
      },
    },
    // contentType: {
    //   type: String,
    //   enum: ["text", "image", "video", "link"],
    //   required: [true, "Content type is required"],
    //   default: "text",
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    likes: {
      type: [Like.schema],
      ref: "Like",
      default: [],
    },
    comments: {
      type: [Comment.schema],
      ref: "Comment",
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
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

const Post: Model<PostInterface> =
  mongoose.models.Post || mongoose.model<PostInterface>("Post", PostSchema);

export default Post;
