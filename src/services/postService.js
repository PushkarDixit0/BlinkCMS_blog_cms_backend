const Post = require("../models/Post");

function normalizePostPayload(payload) {
  const status = payload.status === "published" ? "published" : "draft";
  const tags = Array.isArray(payload.tags)
    ? payload.tags
        .map((tag) => String(tag).trim())
        .filter(Boolean)
    : [];

  return {
    title: payload.title,
    content: payload.content,
    contentJson: payload.contentJson || null,
    status,
    tags,
    publishedAt: status === "published" ? new Date() : null,
  };
}

function getPublishedPosts() {
  return Post.find({ status: "published" }).sort({ publishedAt: -1, createdAt: -1 });
}

function getAllPostsForAdmin() {
  return Post.find({}).sort({ updatedAt: -1 });
}

function getPublishedPostById(id) {
  return Post.findOne({ _id: id, status: "published" });
}

function getPostByIdForAdmin(id) {
  return Post.findById(id);
}

function createPost(payload, user) {
  const post = new Post({
    ...normalizePostPayload(payload),
    author: user.username,
  });

  return post.save();
}

function updatePost(id, payload) {
  const update = normalizePostPayload(payload);

  if (update.status !== "published") {
    update.publishedAt = null;
  }

  return Post.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
}

function deletePost(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = {
  createPost,
  deletePost,
  getAllPostsForAdmin,
  getPostByIdForAdmin,
  getPublishedPostById,
  getPublishedPosts,
  updatePost,
};

