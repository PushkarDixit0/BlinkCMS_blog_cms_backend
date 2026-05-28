const crypto = require("crypto");
const env = require("../config/env");

const sessions = new Map();

function createSession(user) {
  const sessionId = crypto.randomUUID();
  const session = {
    id: sessionId,
    user,
    createdAt: Date.now(),
    expiresAt: Date.now() + env.sessionExpiresInMs,
  };

  sessions.set(sessionId, session);
  return session;
}

function getSession(sessionId) {
  const session = sessions.get(sessionId);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

function deleteSession(sessionId) {
  sessions.delete(sessionId);
}

module.exports = {
  createSession,
  getSession,
  deleteSession,
};
