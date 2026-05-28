const postService = require("../services/postService");

async function getDashboard(req, res, next) {
  try {
    const posts = await postService.getAllPostsForAdmin();
    const publishedPosts = posts.filter((post) => post.status === "published");
    const draftPosts = posts.filter((post) => post.status === "draft");

    res.json({
      admin: req.user,
      totals: {
        all: posts.length,
        published: publishedPosts.length,
        draft: draftPosts.length,
      },
      publishedPosts,
      draftPosts,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getDashboard };
