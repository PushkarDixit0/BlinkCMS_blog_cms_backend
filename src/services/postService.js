const Post = require("../models/Post");

function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `post-${Date.now()}`;
}

function normalizePostPayload(payload) {
  const status = payload.status === "published" ? "published" : "draft";

  return {
    title: payload.title,
    slug: payload.slug || makeSlug(payload.title),
    excerpt: payload.excerpt || "",
    content: payload.content,
    status,
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

