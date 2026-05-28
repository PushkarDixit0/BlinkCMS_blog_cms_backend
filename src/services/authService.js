const env = require("../config/env");
const { signJwt } = require("../utils/jwt");
const sessionService = require("./sessionService");

function authenticateAdmin({ username, password }) {
  if (username !== env.adminUsername || password !== env.adminPassword) {
    return null;
  }

  const user = {
    id: "admin",
    username,
    role: "admin",
  };
  const session = sessionService.createSession(user);
  const token = signJwt(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
      sessionId: session.id,
    },
    env.jwtSecret,
    env.jwtExpiresInSeconds,
  );

  return { user, session, token };
}

module.exports = { authenticateAdmin };
