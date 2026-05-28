const AssetData = require("../models/AssetData");

function createAsset(file, user) {
  const url = `/post/assets/${file.assetId}`;

  return AssetData.create({
    assetId: file.assetId,
    fileName: file.generatedFileName,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    data: file.buffer,
    url,
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
