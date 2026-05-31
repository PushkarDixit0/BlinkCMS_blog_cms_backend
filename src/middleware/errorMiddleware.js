const env = require("../config/env");

function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Uploaded image is too large." });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource identifier." });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  const status = error.status || 500;
  const message =
    status >= 500 && env.isProduction
      ? "Internal server error"
      : error.message || "Internal server error";

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({ message });
}

module.exports = { errorHandler, notFoundHandler };
