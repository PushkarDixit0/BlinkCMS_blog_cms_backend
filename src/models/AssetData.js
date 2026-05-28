const mongoose = require("mongoose");

const assetDataSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AssetData", assetDataSchema, "assetsData");
