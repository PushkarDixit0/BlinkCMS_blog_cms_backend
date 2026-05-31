const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["approved", "unapproved", "hidden"],
      default: "approved",
      index: true,
    },
  },
  { timestamps: true },
);

commentSchema.index({ postId: 1, status: 1, createdAt: 1 });
commentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);
