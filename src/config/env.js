const fs = require("fs");
const path = require("path");

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://localhost:27017/blog-cms",
  dbRequired: process.env.DB_REQUIRED === "true",
  jwtSecret: process.env.JWT_SECRET || "change-this-development-secret",
  jwtExpiresInSeconds: Number(process.env.JWT_EXPIRES_IN_SECONDS) || 60 * 60,
  sessionExpiresInMs: Number(process.env.SESSION_EXPIRES_IN_MS) || 60 * 60 * 1000,
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};

module.exports = env;
