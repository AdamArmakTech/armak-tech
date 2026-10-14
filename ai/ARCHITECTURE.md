# Architecture

PURPOSE: Technical system design of the Armak Technologies website.

## Overview
A static, multi-page site built with **Astro 7**. Zero JavaScript by default; motion and
interactive pieces load only where used. Output is plain HTML/CSS/JS in `dist/`.

## Source layout (`/src`)
- **`data/site.ts`** — single source of truth: contact details, `FOUNDED` / computed
  `yearsInBusiness`, services (with TIA-style codes `A-01…`), nav, service area. Never hardcode these.
- **`styles/tokens.css`** — all design tokens (color, type, spacing, motion).
- **`styles/global.css`** — reset, typography classes (`t-display`, `t-h1…`, `t-mono`), layout
  primitives (`container`, `section`, `grid-12`), form fields/chips, motion states.
- **`layouts/Base.astro`** — `<head>` meta/OG/canonical, fonts, header, footer, motion script.
- **`components/layout/`** — `Header` (mega-menu + mobile menu), `Footer`.
- **`components/ui/`** — design-system primitives (Logo, Label, Stripe, Button, SectionHead,
  SpecStrip, TestCard, ServiceTile, Stat).
- **`components/home/`** — homepage sections. `BuildingExplorer` + `BuildingSvg` is the signature
  interactive cutaway (one `<g data-layer="{service slug}">` per system). `ServiceArea` lazy-loads
  MapLibre + OpenFreeMap tiles (worker via `?url` + `setWorkerUrl`).
- **`components/forms/ContactForm.astro`** — 2-step Web3Forms form (progressive enhancement;
  `WEB3FORMSAPIKEY` read at build time). Never submit it in testing — it emails sales@armak.tech.
- **`components/services|pages|projects/`** — inner-page building blocks (PageHero, PageCta, …).
- **`data/content.ts`** — partners, process, pillars, credentials, industries, projects
  (`placeholder: true` → visible tag + noindex + build warning), testimonials.
- **`data/services-detail.ts`** — per-service page content + photos.
- **`components/process/`** — the five step demos (DemoFrame, OfficePlan, Assess/Design/Install/Support); helpers in `scripts/demo.ts`.
- **`scripts/prepare-logos.mjs`** — regenerates the ink partner logos from `scripts/logo-sources/`.
- **`scripts/motion.ts`** — Lenis smooth scroll (exposed as `window.armakLenis`), `[data-reveal]`,
  `[data-reveal-stagger]`, `[data-split]` (GSAP SplitText, dynamically imported), `[data-count]`.
  All skipped under `prefers-reduced-motion`; CSS failsafes show content if the script never runs.
- **`assets/`** — images processed by `astro:assets` (WebP, responsive `srcset`).
- **`pages/`** — routes. `styleguide.astro` is the design-system review page (noindex).

## Conventions
- Style a child component from its parent with `:global(.class)` inside a scoped parent selector —
  Astro's scoped styles do not reach classes passed into child components.
- Brand red: `--signal` for CTAs/text (AA-compliant); `--logo-red` only for large/decorative use.
- `compressHTML: true` is set deliberately (Astro 7's default strips spaces between inline elements).

## Legacy
`/legacy` holds the previous Vite + EJS site for reference only (not built). The `old-site` git branch is the full backup of the old live site.

## AI workspace
State in `ai/PROJECT_STATE.md`, plans in `ai/plans/`, rules in `ai/AGENTS.md`.
