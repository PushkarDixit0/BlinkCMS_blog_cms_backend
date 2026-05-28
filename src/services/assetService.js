const path = require("path");
const AssetData = require("../models/AssetData");

function createAsset(file, user) {
  const url = `/post/assets/${file.assetId}`;

  return AssetData.create({
    assetId: file.assetId,
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    url,
    createdBy: user?.username || "admin",
  });
}

function getAssetById(assetId) {
  return AssetData.findOne({ assetId });
}

function getAssetFilePath(asset) {
  return path.resolve(asset.path);
}

module.exports = {
  createAsset,
  getAssetById,
  getAssetFilePath,
};
