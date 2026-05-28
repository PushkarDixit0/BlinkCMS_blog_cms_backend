const sessionService = require("../services/sessionService");

function validateSession(req, res, next) {
  const sessionId = req.get("x-session-id") || req.jwt?.sessionId;
  const session = sessionService.getSession(sessionId);

  if (!session) {
    return res.status(401).json({ message: "Missing, invalid, or expired session." });
  }

  if (req.jwt?.sessionId && req.jwt.sessionId !== session.id) {
    return res.status(401).json({ message: "JWT token does not match the active session." });
  }

  req.session = session;
  req.user = session.user;
  next();
}

module.exports = { validateSession };
