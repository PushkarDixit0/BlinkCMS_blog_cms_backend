const { connectDatabase } = require("../config/db");

async function ensureDatabase(req, res, next) {
  if (req.path === "/health") {
    return next();
  }

  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { ensureDatabase };
