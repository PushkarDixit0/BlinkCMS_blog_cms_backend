const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { nanoid } = require("nanoid");

const uploadRoot = path.resolve(process.cwd(), "uploads", "assets");

fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadRoot);
  },
  filename(req, file, cb) {
    const assetId = nanoid();
    const extension = path.extname(file.originalname || "").toLowerCase();

    file.assetId = assetId;
    cb(null, `${assetId}${extension}`);
  },
});

function imageFileFilter(req, file, cb) {
  if (!file.mimetype?.startsWith("image/")) {
    const error = new Error("Only image uploads are allowed.");
    error.status = 400;
    return cb(error);
  }

  cb(null, true);
}

const uploadEditorImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
}).single("image");

module.exports = { uploadEditorImage };
