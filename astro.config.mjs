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
  // Content-Security-Policy, emitted as a <meta> tag on every page. Astro hashes the inline
  // scripts and styles at build time, so the policy can't drift from the code. frame-ancestors
  // can't be set from a <meta> tag; it lives in vercel.json with the other headers.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "font-src 'self'",
        // Contact form (Web3Forms, plus the hCaptcha bot check) and the service-area map
        // tiles (OpenFreeMap).
        "connect-src 'self' https://api.web3forms.com https://tiles.openfreemap.org https://hcaptcha.com https://*.hcaptcha.com",
        // The hCaptcha box on the contact form is drawn inside an iframe from hCaptcha.
        'frame-src https://hcaptcha.com https://*.hcaptcha.com',
        "worker-src 'self' blob:",
        "child-src 'self' blob:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://api.web3forms.com",
        'upgrade-insecure-requests',
      ],
      // hCaptcha's script (js.hcaptcha.com) loads on the contact form.
      scriptDirective: {
        resources: ["'self'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
      },
      // style="" attributes (reveal delays, SVG fills) can't be hashed. hCaptcha also loads
      // its own styles.
      styleDirective: {
        resources: [
          "'self'",
          'https://hcaptcha.com',
          'https://*.hcaptcha.com',
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  integrations: [
    sitemap({
      // The style guide only exists on the dev server (see src/pages/styleguide.astro), so it
      // never belongs in the sitemap.
      // TODO: the Projects area is hidden until real projects exist (see showProjects in
      // src/data/content.ts) — remove the '/projects/' exclusion when real projects are added.
      filter: (page) => !page.includes('/styleguide') && !page.includes('/projects/'),
    }),
  ],
});
