const { validate } = require("../middleware/validateMiddleware");
const { loginSchema } = require("./authValidation");
const {
  commentStatusSchema,
  createCommentSchema,
} = require("./commentValidation");
const { createPostSchema, updatePostSchema } = require("./postValidation");

module.exports = {
  validateComment: validate(createCommentSchema),
  validateCommentStatus: validate(commentStatusSchema),
  validateLogin: validate(loginSchema),
  validatePost: validate(createPostSchema),
  validateUpdatePost: validate(updatePostSchema),
};
