const { z } = require("zod");

const createTagSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Tag name is required.").max(40),
  }),
});

module.exports = { createTagSchema };
