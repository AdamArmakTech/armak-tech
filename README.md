# Armak Technologies

Armak Technologies delivers low-voltage, telecommunications, and enterprise networking infrastructure across Southern California since 1998.

## Project Structure

Built with [Astro](https://astro.build) (static output).

- `src/`: Pages, layouts, components, styles, data (`src/data/site.ts` holds all business facts).
- `src/assets/`: Images optimized at build time.
- `public/`: Static files served as-is.
- `ai/`: AI-assisted development state, plans and guidelines.
- `legacy/`: Previous Vite + EJS site, kept for reference during the redesign (not built).
- `dist/`: Generated production-ready static site.

Design system review page: `/styleguide/` (run `npm run dev`, then open http://localhost:4321/styleguide/).

## Getting Started

### Prerequisites
- Node.js (v22.12+)
- npm
- `.env` with `WEB3FORMSAPIKEY` (contact form)

### Installation
```bash
npm install
```

### Development
Start the local development server with hot-reload:
```bash
npm run dev
```

### Build
Generate the production-ready static site in the `dist/` folder:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```
