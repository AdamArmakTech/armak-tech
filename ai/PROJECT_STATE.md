# Project State

## Current Focus — Full redesign (branch `redesign`)
Plan: `ai/plans/redesign.md` ("Precision Infrastructure", light editorial, Astro, full multi-page).

- [x] Phase 0: Research industry leaders + write plan; decisions made (light editorial, Astro, full site, stock photos for now)
- [x] Phase 1: Design system
  - [x] Migrate to Astro 7; old Vite + EJS source moved to `legacy/` (delete at launch)
  - [x] Tokens (`src/styles/tokens.css`), global styles, Geist + Geist Mono (self-hosted)
  - [x] Components: Logo, Label (TIA-606), Stripe (T568B), Button, SectionHead, SpecStrip, TestCard, ServiceTile, Stat
  - [x] Header (services mega-menu + mobile menu), Footer
  - [x] Motion: Lenis, reveals, GSAP SplitText headings (on demand), count-ups; reduced-motion safe
  - [x] `/styleguide/` review page (noindex, excluded from sitemap)
- [x] Phase 2: Homepage — hero, partner strip, building explorer (signature), services bento,
      process, numbers, projects (placeholders), industries, service-area map, 2-step contact form
- [x] Phase 3: Inner pages — /services/ + 6 service pages (FAQ/Service/Breadcrumb JSON-LD),
      /about/, /industries/, /projects/ + 3 placeholder case studies (noindex), /contact/, 404
- [x] Stock photos: 7 approved and downloaded (credits: src/assets/photos/CREDITS.md;
      shortlist + alternates: ai/plans/stock-photos.md). Team photo (#8) declined by user.
- [x] Glossary: /glossary/ — 140 plain-English terms, 342 Q&As (5 parallel agents, one per
      alphabet range: src/data/glossary/{a-c,d-h,i-n,o-r,s-z}.ts, merged + validated in index.ts).
      Click a term → drawer (bottom sheet on phones); search, category filter, A–Z bar,
      shareable #slug links, DefinedTermSet JSON-LD. Linked from the footer.
- [ ] Phase 4: SEO & performance — LocalBusiness JSON-LD in Base, OG image, robots.txt,
      Lighthouse pass on a deployed preview
- [ ] Phase 5: Launch — remove `legacy/`, `src/pages/dev/`, unused `public/` images; replace placeholders; deploy

Built by a manager + 5 parallel agents (sections, map/contact, photo research, service pages,
inner pages). Verified: `astro check` 0 errors (57 files), 21 pages build, automated audit of
14 routes × 375/1440px (no overflow, one h1, alt text), map + worker load in production build.

## Needed from Armak before launch (not blocking)
- License number + classification (`site.license` in `src/data/site.ts`)
- Certifications list (BICSI is claimed on the old site — confirm)
- 3 real projects with scope numbers (`projects` in `src/data/content.ts` — build log warns while placeholders remain)
- 2–3 testimonials with permission, client-logo permissions
- Which industries they actually serve (`industries` in content.ts) and real milestones since 1998
- Team names/roles/photos for the About page slot
- Real job-site photos (all photos are interim stock; never caption them as Armak work)
- Vector (SVG) logo if one exists — current logo is a cleaned-up PNG
- Confirm service-page capabilities "Racks, patching & cable management" and "Firewalls / site-to-site VPN";
  TIA-606 labeling; which cable tester brand; any voice/UC vendor partners

## Review copy (written during the redesign, not from Armak)
Section headlines on the homepage and inner pages, plus general technology facts on service pages
(Cat 6A 10GBASE-T @100 m, Cat 8 25/40G @30 m, PoE 15.4/30/60–90 W, HDBaseT 100 m, etc. — checked).

## Backlog
- [ ] Partner logos: re-export as clean monochrome SVG/PNG for the proof strip
- [ ] Automated verification/linting beyond `astro check`
