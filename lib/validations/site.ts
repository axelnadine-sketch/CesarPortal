import { z } from "zod";
import { slugify } from "@/lib/utils";

export const siteFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .transform((value) => slugify(value)),
  url: z.url().max(512),
  shortDescription: z.string().trim().min(10).max(240),
  longDescription: z.string().trim().max(5000).optional().or(z.literal("")),
  category: z.string().trim().min(2).max(80),
  tags: z.string().trim().max(500).optional().or(z.literal("")),
  imageUrl: z.url().max(512),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

export const siteApiSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().max(140).optional(),
  url: z.url().max(512),
  shortDescription: z.string().trim().min(10).max(240),
  longDescription: z.string().trim().max(5000).optional().or(z.literal("")),
  category: z.string().trim().min(2).max(80),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).optional(),
  imageUrl: z.url().max(512),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(9999).optional(),
});

export type SiteFormValues = z.infer<typeof siteFormSchema>;
