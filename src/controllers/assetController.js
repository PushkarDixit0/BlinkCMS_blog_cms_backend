const assetService = require("../services/assetService");

async function uploadEditorAsset(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const asset = await assetService.createAsset(req.file, req.user);

    res.status(201).json({
      message: "Asset uploaded.",
      asset: {
        id: asset._id,
        assetId: asset.assetId,
        fileName: asset.fileName,
        originalName: asset.originalName,
        mimeType: asset.mimeType,
        size: asset.size,
        url: asset.url,
        createdBy: asset.createdBy,
        createdAt: asset.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function serveAsset(req, res, next) {
  try {
    const asset = await assetService.getAssetById(req.params.assetId);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found." });
    }

    res.type(asset.mimeType);
    res.set("Content-Length", asset.size);
    res.send(asset.data);
  } catch (error) {
    next(error);
  }
}

module.exports = { serveAsset, uploadEditorAsset };
