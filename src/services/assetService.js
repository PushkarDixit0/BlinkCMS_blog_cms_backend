const AssetData = require("../models/AssetData");
const env = require("../config/env");

function toAssetUrl(assetId) {
  const path = `/post/assets/${assetId}`;
  return env.apiUrl ? `${env.apiUrl.replace(/\/+$/, "")}${path}` : path;
}

function createAsset(file, user) {
  return AssetData.create({
    assetId: file.assetId,
    fileName: file.generatedFileName,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    data: file.buffer,
    url: toAssetUrl(file.assetId),
    createdBy: user?.username || "admin",
  });
}

function getAssetById(assetId) {
  return AssetData.findOne({ assetId });
}

module.exports = {
  createAsset,
  getAssetById,
};
