const { verifyJwtToken } = require("./jwtMiddleware");
const { validateSession } = require("./sessionMiddleware");
const { requireAdmin } = require("./adminMiddleware");

module.exports = [verifyJwtToken, validateSession, requireAdmin];
