const crypto = require("crypto");
const env = require("../config/env");
const { signJwt, verifyJwt } = require("../utils/jwt");

function createSession(user) {
  const now = Date.now();
  const session = {
    id: crypto.randomUUID(),
    user,
    createdAt: now,
    expiresAt: now + env.sessionExpiresInMs,
  };

  session.token = signJwt(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
      sessionId: session.id,
    },
    env.sessionSecret,
    Math.ceil(env.sessionExpiresInMs / 1000),
  );

  return session;
}

function getSession(sessionToken) {
  const payload = verifyJwt(sessionToken, env.sessionSecret);

  if (!payload) {
    return null;
  }

  return {
    id: payload.sessionId,
    user: {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    },
    expiresAt: payload.exp * 1000,
  };
}

function deleteSession() {
  return true;
}

module.exports = {
  createSession,
  getSession,
  deleteSession,
};
