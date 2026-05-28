function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Image size is more than 2MB." });
  }

  const status = error.status || 500;
  res.status(status).json({
    message: error.message || "Internal server error",
  });
}

module.exports = { errorHandler, notFoundHandler };
