function isMissing(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

function validateLogin(req, res, next) {
  const { username, password } = req.body;

  if (isMissing(username) || isMissing(password)) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  next();
}

function validatePost(req, res, next) {
  const { title, content, status } = req.body;

  if (isMissing(title) || isMissing(content)) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  if (status && !["draft", "published"].includes(status)) {
    return res.status(400).json({ message: "Status must be draft or published." });
  }

  if (String(content).includes("data:image/")) {
    return res.status(400).json({
      message: "Post content cannot include base64 images. Upload images as assets first.",
    });
  }

  next();
}

module.exports = { validateLogin, validatePost };
