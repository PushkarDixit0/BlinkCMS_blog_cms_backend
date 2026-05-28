const express = require("express");
const authController = require("../controllers/authController");
const { validateLogin } = require("../validations/requestValidation");

const router = express.Router();

router.post("/admin/login", validateLogin, authController.login);

module.exports = router;
