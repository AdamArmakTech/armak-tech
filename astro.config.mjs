// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://armak.tech',
  // Keep HTML-aware whitespace handling (Astro 7 defaults to JSX-style stripping,
  // which silently removes spaces between inline elements in copy).
  compressHTML: true,
  integrations: [
    sitemap({
      // Internal review pages never go in the sitemap.
      // TODO(launch): project detail pages are noindex placeholders — drop the /projects/{slug}/
      // exclusion once real case studies replace them.
      filter: (page) =>
        !page.includes('/styleguide') && !page.includes('/dev/') && !/\/projects\/[^/]+\/$/.test(page),
    }),
  ],
});
