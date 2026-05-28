const env = require("../config/env");
const { verifyJwt } = require("../utils/jwt");

function getToken(req) {
  const header = req.get("authorization") || "";

  if (!header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice(7);
}

function verifyJwtToken(req, res, next) {
  const token = getToken(req);
  const payload = verifyJwt(token, env.jwtSecret);

  if (!payload) {
    return res.status(401).json({ message: "Missing, invalid, or expired JWT token." });
  }

  req.jwt = payload;
  next();
}

module.exports = { verifyJwtToken };
