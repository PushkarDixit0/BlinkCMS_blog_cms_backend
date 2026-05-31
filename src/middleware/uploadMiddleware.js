const path = require("path");
const multer = require("multer");
const { nanoid } = require("nanoid");

const env = require("../config/env");

const maxImageSize = env.maxImageSizeBytes;
const storage = multer.memoryStorage();

function imageFileFilter(req, file, cb) {
  if (!file.mimetype?.startsWith("image/")) {
    const error = new Error("Only image uploads are allowed.");
    error.status = 400;
    return cb(error);
  }

  const assetId = nanoid();
  const extension = path.extname(file.originalname || "").toLowerCase();

  file.assetId = assetId;
  file.generatedFileName = `${assetId}${extension}`;
  cb(null, true);
}

const uploadEditorImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: maxImageSize,
    files: 1,
  },
}).single("image");

module.exports = { uploadEditorImage };
