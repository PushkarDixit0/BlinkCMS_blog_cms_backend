const commentService = require("../services/commentService");

async function createComment(req, res, next) {
  try {
    const comment = await commentService.createComment(req.params.id, req.body);

    if (!comment) {
      return res.status(404).json({ message: "Published post not found." });
    }

    res.status(201).json({ message: "Comment created.", comment });
  } catch (error) {
    next(error);
  }
}

async function getVisibleComments(req, res, next) {
  try {
    const comments = await commentService.getVisibleCommentsForPost(
      req.params.id,
    );
    res.json({ comments });
  } catch (error) {
    next(error);
  }
}

async function getAdminComments(req, res, next) {
  try {
    const comments = await commentService.getAllComments();
    res.json({ comments });
  } catch (error) {
    next(error);
  }
}

async function updateAdminComment(req, res, next) {
  try {
    const comment = await commentService.updateCommentStatus(
      req.params.id,
      req.body.status,
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.json({ message: "Comment updated.", comment });
  } catch (error) {
    next(error);
  }
}

async function deleteAdminComment(req, res, next) {
  try {
    const comment = await commentService.deleteComment(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.json({ message: "Comment deleted." });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createComment,
  deleteAdminComment,
  getAdminComments,
  getVisibleComments,
  updateAdminComment,
};
