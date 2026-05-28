const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const env = require("./config/env");
const { errorHandler, notFoundHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", env.clientOrigin);
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Session-Id",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(authRoutes);
app.use(adminRoutes);
app.use(postRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

