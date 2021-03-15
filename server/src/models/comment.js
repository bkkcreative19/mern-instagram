import mongoose from "mongoose";
const Schema = mongoose.Schema;
let commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
