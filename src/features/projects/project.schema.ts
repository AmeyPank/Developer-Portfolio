import { z } from "zod";

const optionalHttpsUrl = z
  .string()
  .trim()
  .refine((value) => !value || /^https:\/\//i.test(value), "Use a secure https:// URL.")
  .optional()
  .or(z.literal(""));

export const createProjectSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(100),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(1200),
  tags: z.string().trim().min(1, "Please provide at least one tag.").max(500),
  githubUrl: optionalHttpsUrl,
  liveUrl: optionalHttpsUrl,
  featured: z.boolean(),
  order: z.number().int().min(0).max(10000),
});

export type ProjectInputDto = z.infer<typeof createProjectSchema>;
export const projectIdSchema = z.string().uuid();
