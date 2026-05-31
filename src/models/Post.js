const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    contentJson: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    author: {
      type: String,
      default: "admin",
    },
    tags: [{
      type: String,
      required: true,
      trim: true,
    }],
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

postSchema.index({ status: 1, publishedAt: -1, createdAt: -1 });
postSchema.index({ updatedAt: -1 });

module.exports = mongoose.model("Post", postSchema);
