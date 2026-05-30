const express = require("express");
const adminController = require("../controllers/adminController");
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const protectedAdmin = require("../middleware/authMiddleware");
const { validateCommentStatus } = require("../validations/requestValidation");

const router = express.Router();

router.get("/admin", protectedAdmin, adminController.getDashboard);
router.get("/admin/comments", protectedAdmin, commentController.getAdminComments);
router.put(
  "/admin/comments/:id",
  protectedAdmin,
  validateCommentStatus,
  commentController.updateAdminComment,
);
router.delete(
  "/admin/comments/:id",
  protectedAdmin,
  commentController.deleteAdminComment,
);
router.get("/editor", protectedAdmin, postController.getEditorPost);
router.get("/editor/:id", protectedAdmin, postController.getEditorPost);

module.exports = router;
