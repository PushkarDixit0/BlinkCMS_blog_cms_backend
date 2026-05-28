const express = require("express");
const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const protectedAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin", protectedAdmin, adminController.getDashboard);
router.get("/editor", protectedAdmin, postController.getEditorPost);
router.get("/editor/:id", protectedAdmin, postController.getEditorPost);

module.exports = router;
