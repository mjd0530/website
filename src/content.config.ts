import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Content model: docs/sitemap.md. A missing required field fails the build.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      client: z.string(),
      years: z.string(),
      role: z.string(),
      scope: z.array(z.string()).min(1),
      team: z.string().optional(),
      impact: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .max(4)
        .optional(),
      cover: z.object({ src: image(), alt: z.string() }),
      accent: z
        .string()
        .regex(/^#[0-9a-f]{6}$/i)
        .optional(),
      featured: z.boolean().default(false),
      order: z.number().int(),
      status: z.enum(['public', 'archive']).default('public'),
    }),
});

export const collections = { projects };
