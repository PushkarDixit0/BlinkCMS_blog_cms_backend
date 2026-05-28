const postService = require("../services/postService");

async function getHomePosts(req, res, next) {
  try {
    const posts = await postService.getPublishedPosts();
    res.json({ posts });
  } catch (error) {
    next(error);
  }
}

async function getPublicPost(req, res, next) {
  try {
    const post = await postService.getPublishedPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Published post not found." });
    }

    res.json({ post });
  } catch (error) {
    next(error);
  }
}

async function getEditorPost(req, res, next) {
  try {
    if (!req.params.id) {
      return res.json({ mode: "create", post: null });
    }

    const post = await postService.getPostByIdForAdmin(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json({ mode: "edit", post });
  } catch (error) {
    next(error);
  }
}

async function createPost(req, res, next) {
  try {
    const post = await postService.createPost(req.body, req.user);
    res.status(201).json({ message: "Post created.", post });
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    const post = await postService.updatePost(req.params.id, req.body);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json({ message: "Post updated.", post });
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const post = await postService.deletePost(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json({ message: "Post deleted." });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPost,
  deletePost,
  getEditorPost,
  getHomePosts,
  getPublicPost,
  updatePost,
};

