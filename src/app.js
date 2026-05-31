const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const env = require("./config/env");
const { ensureDatabase } = require("./middleware/databaseMiddleware");
const { errorHandler, notFoundHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use((req, res, next) => {
  const origin = req.get("origin");
  const allowedOrigin = origin
    ? env.clientOrigins.includes(origin)
      ? origin
      : null
    : env.clientOrigins[0];

  if (allowedOrigin) {
    res.header("Access-Control-Allow-Origin", allowedOrigin);
  }

  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Session-Id, X-Session-Token",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: env.maxJsonBodySize }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(ensureDatabase);
app.use(authRoutes);
app.use(adminRoutes);
app.use(postRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

