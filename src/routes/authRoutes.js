const express = require("express");
const authController = require("../controllers/authController");
const { validateLogin } = require("../validations/requestValidation");

const router = express.Router();

router.post("/admin/login", validateLogin, authController.login);
router.get("/admin/login", (req, res) => {
  res.status(405).json({ message: "Use POST /admin/login to authenticate." });
});

module.exports = router;
