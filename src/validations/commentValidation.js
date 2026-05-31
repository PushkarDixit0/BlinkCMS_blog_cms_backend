const { z } = require("zod");

const createCommentSchema = z.object({
  body: z.object({
    authorName: z.string().trim().min(1, "Author name is required.").max(80),
    comment: z.string().trim().min(1, "Comment is required.").max(1000),
  }),
});

const commentStatusSchema = z.object({
  body: z.object({
    status: z.enum(["approved", "unapproved", "hidden"]),
  }),
});

module.exports = { commentStatusSchema, createCommentSchema };
