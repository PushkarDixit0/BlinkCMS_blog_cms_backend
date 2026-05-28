const mongoose = require("mongoose");
const env = require("./env");

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected.");
    return mongoose.connection;
  } catch (error) {
    if (env.dbRequired) {
      throw error;
    }

    console.warn(
      `MongoDB unavailable at ${env.mongoUri}. Server will start, but post APIs that need the database will fail until MongoDB is running.`,
    );
    console.warn(error.message);
    return null;
  }
}

module.exports = { connectDatabase };
