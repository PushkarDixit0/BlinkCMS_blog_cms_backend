const express = require("express");
const assetController = require("../controllers/assetController");
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const protectedAdmin = require("../middleware/authMiddleware");
const { uploadEditorImage } = require("../middleware/uploadMiddleware");
const {
  validateComment,
  validatePost,
} = require("../validations/requestValidation");

const router = express.Router();

router.get("/home", postController.getHomePosts);
router.get("/post/assets/:assetId", assetController.serveAsset);
router.get("/posts/:id", postController.getPublicPost);
router.get("/posts/:id/comments", commentController.getVisibleComments);
router.post(
  "/posts/:id/comments",
  validateComment,
  commentController.createComment,
);
router.post(
  "/post/assets",
  protectedAdmin,
  uploadEditorImage,
  assetController.uploadEditorAsset,
);
router.post("/post", protectedAdmin, validatePost, postController.createPost);
router.put("/posts/:id", protectedAdmin, validatePost, postController.updatePost);
router.delete("/posts/:id", protectedAdmin, postController.deletePost);

module.exports = router;

