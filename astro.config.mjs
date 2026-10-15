// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://armak.tech',
  // Keep HTML-aware whitespace handling (Astro 7 defaults to JSX-style stripping,
  // which silently removes spaces between inline elements in copy).
  compressHTML: true,
  // Inline each page's CSS (~13 KB brotli on the homepage) instead of 5 render-blocking files:
  // first paint no longer waits an extra round trip, which matters most on phones.
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Internal review pages never go in the sitemap.
      // TODO: the Projects area is hidden until real projects exist (see showProjects in
      // src/data/content.ts) — remove the '/projects/' exclusion when real projects are added.
      filter: (page) => !page.includes('/styleguide') && !page.includes('/dev/') && !page.includes('/projects/'),
    }),
  ],
});
