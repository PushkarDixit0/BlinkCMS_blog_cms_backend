const mongoose = require("mongoose");
const env = require("./env");

let connectionPromise = null;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = connectWithRetry().finally(() => {
    if (mongoose.connection.readyState !== 1) {
      connectionPromise = null;
    }
  });

  return connectionPromise;
}

async function connectWithRetry() {
  let lastError = null;

  for (let attempt = 1; attempt <= env.mongoMaxRetries; attempt += 1) {
    try {
      await mongoose.connect(env.mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000,
      });

      await mongoose.connection
        .collection("posts")
        .dropIndex("slug_1")
        .catch((error) => {
          if (error.codeName !== "IndexNotFound" && error.code !== 27) {
            console.warn(`Could not drop old slug index: ${error.message}`);
          }
        });

      console.log("MongoDB connected.");
      return mongoose.connection;
    } catch (error) {
      lastError = error;

      if (attempt < env.mongoMaxRetries) {
        await wait(env.mongoRetryDelayMs * attempt);
      }
    }
  }

  if (env.dbRequired) {
    throw lastError;
  }

  console.warn("MongoDB unavailable. Database-backed APIs will fail until it is reachable.");
  console.warn(lastError.message);
  return null;
}

module.exports = { connectDatabase };
