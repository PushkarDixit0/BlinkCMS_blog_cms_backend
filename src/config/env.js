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

const isProduction = process.env.NODE_ENV === "production";

function readNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function requireInProduction(name, value) {
  if (isProduction && !value) {
    throw new Error(`${name} is required when NODE_ENV=production.`);
  }
}

function requireValue(name, value) {
  if (!value) {
    throw new Error(`${name} is required.`);
  }
}

const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  process.env.MONGO_URL ||
  "";
const jwtSecret = process.env.JWT_SECRET || "";
const sessionSecret = process.env.SESSION_SECRET || "";
const adminUsername = process.env.ADMIN_USERNAME || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL || process.env.CLIENT_ORIGIN || "";

if (isProduction || process.env.DB_REQUIRED === "true") {
  requireValue("MONGODB_URI", mongoUri);
}

requireInProduction("JWT_SECRET", jwtSecret);
requireInProduction("SESSION_SECRET", sessionSecret);
requireInProduction("ADMIN_USERNAME", adminUsername);
requireInProduction("ADMIN_PASSWORD", adminPassword);
requireInProduction("CLIENT_URL", clientUrl);

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction,
  port: Number(process.env.PORT) || 5000,
  mongoUri,
  dbRequired: process.env.DB_REQUIRED === "true" || isProduction,
  jwtSecret,
  sessionSecret,
  jwtExpiresInSeconds: readNumber("JWT_EXPIRES_IN_SECONDS", 60 * 60),
  sessionExpiresInMs: readNumber("SESSION_EXPIRES_IN_MS", 60 * 60 * 1000),
  adminUsername,
  adminPassword,
  clientUrl,
  clientOrigins: clientUrl
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  apiUrl: process.env.API_URL || "",
  maxJsonBodySize: process.env.MAX_JSON_BODY_SIZE || "1mb",
  maxImageSizeBytes: readNumber("MAX_IMAGE_SIZE_BYTES", 2 * 1024 * 1024),
  mongoMaxRetries: readNumber("MONGO_MAX_RETRIES", 3),
  mongoRetryDelayMs: readNumber("MONGO_RETRY_DELAY_MS", 1000),
};

module.exports = env;
