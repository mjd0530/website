// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mikedemar.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  // Old case-study address from before the Tap to Launch rename (2026-11-19)
  redirects: {
    '/work/magic-move/': '/work/tap-to-launch/',
  },
});
