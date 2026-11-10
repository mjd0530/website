import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Content model: docs/sitemap.md. A missing required field fails the build.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/projects' }),
  schema: ({ image }) => {
    // An image slot. `src` is optional while real assets are being gathered:
    // without it the site renders a labelled placeholder tile. `alt` is always required
    // ("" only for decorative images).
    const media = z.object({
      src: image().optional(),
      alt: z.string(),
      label: z.string().optional(),
    });

    return z.object({
      title: z.string(),
      subtitle: z.string(),
      summary: z.string(),
      client: z.string(),
      years: z.string(),
      role: z.string(),
      scope: z.array(z.string()).min(1),
      awards: z.string().optional(),
      team: z.string().optional(),
      impact: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .max(4)
        .optional(),
      cover: media,
      hero: media,
      // Home spotlight: one wide image, then two.
      spotlight: z.tuple([media, media, media]),
      // Case-study table of contents. Each id must match a <Section id> in the body.
      sections: z.array(z.object({ id: z.string(), label: z.string() })).min(1),
      accent: z
        .string()
        .regex(/^#[0-9a-f]{6}$/i)
        .optional(),
      featured: z.boolean().default(false),
      order: z.number().int(),
      status: z.enum(['public', 'archive']).default('public'),
    });
  },
});

export const collections = { projects };
