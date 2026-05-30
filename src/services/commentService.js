const Comment = require("../models/Comment");
const Post = require("../models/Post");

function normalizeCommentPayload(payload) {
  return {
    authorName: String(payload.authorName || "").trim(),
    comment: String(payload.comment || "").trim(),
    status: payload.status || "approved",
  };
}

async function createComment(postId, payload) {
  const post = await Post.findOne({ _id: postId, status: "published" });

  if (!post) {
    return null;
  }

  const comment = new Comment({
    ...normalizeCommentPayload(payload),
    postId,
    status: "approved",
  });

  return comment.save();
}

function getVisibleCommentsForPost(postId) {
  return Comment.find({ postId, status: "approved" }).sort({ createdAt: 1 });
}

function getAllComments() {
  return Comment.find({})
    .populate("postId", "title")
    .sort({ createdAt: -1 });
}

function updateCommentStatus(id, status) {
  return Comment.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  ).populate("postId", "title");
}

function deleteComment(id) {
  return Comment.findByIdAndDelete(id);
}

module.exports = {
  createComment,
  deleteComment,
  getAllComments,
  getVisibleCommentsForPost,
  updateCommentStatus,
};
