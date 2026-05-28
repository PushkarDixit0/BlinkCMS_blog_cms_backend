const express = require("express");
const assetController = require("../controllers/assetController");
const postController = require("../controllers/postController");
const protectedAdmin = require("../middleware/authMiddleware");
const { uploadEditorImage } = require("../middleware/uploadMiddleware");
const { validatePost } = require("../validations/requestValidation");

const router = express.Router();

router.get("/home", postController.getHomePosts);
router.get("/post/assets/:assetId", assetController.serveAsset);
router.get("/posts/:id", postController.getPublicPost);
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

