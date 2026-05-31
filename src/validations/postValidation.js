const { z } = require("zod");

const postBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(140),
  content: z
    .string()
    .min(1, "Content is required.")
    .refine((content) => !content.includes("data:image/"), {
      message: "Post content cannot include base64 images. Upload images as assets first.",
    }),
  contentJson: z.unknown().optional().nullable(),
  status: z.enum(["draft", "published"]).default("draft"),
  author: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
});

const createPostSchema = z.object({
  body: postBodySchema,
});

const updatePostSchema = z.object({
  body: postBodySchema,
});

module.exports = {
  createPostSchema,
  postBodySchema,
  updatePostSchema,
};
