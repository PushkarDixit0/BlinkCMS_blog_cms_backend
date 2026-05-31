const authService = require("../services/authService");

function login(req, res, next) {
  let authResult;

  try {
    authResult = authService.authenticateAdmin(req.body);
  } catch (error) {
    console.error("Admin login failed while creating auth tokens.", error);
    return next(error);
  }

  if (!authResult) {
    return res.status(401).json({ message: "Invalid admin credentials." });
  }

  res.status(200).json({
    message: "Admin authenticated.",
    user: authResult.user,
    session: {
      id: authResult.session.id,
      expiresAt: authResult.session.expiresAt,
      token: authResult.session.token,
    },
    token: authResult.token,
  });
}

module.exports = { login };
