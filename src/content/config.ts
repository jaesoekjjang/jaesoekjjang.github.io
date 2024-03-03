import { z, defineCollection, reference } from "astro:content";

const DEFAULT_TAG = "";

const blogs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date().transform((date) => date.toISOString().slice(0, 10)),
    description: z.string(),
    coverImage: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional()
      .default({ url: "placeholder.svg", alt: "placeholder" }),
    tags: z.string().array().optional().default([DEFAULT_TAG]),
    series: z.array(reference("blogs")).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blogs,
};
