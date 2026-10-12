# Armak Technologies — Full Site Redesign Plan

Status: APPROVED DIRECTION — ready for Phase 1 (see "Decisions" at bottom)
Date: 2026-10-11

---

## 1. Why we're doing this

The current site works technically (fast Vite build, lazy-loaded JS) but visually it reads as a
template / gaming UI, not a 28-year enterprise infrastructure contractor. Audit of the live site
(armak.tech) found:

| Problem | Where | Effect on a buyer |
|---|---|---|
| Too many competing effects: particle network, radar map, custom cursor, page loader, scroll-progress bar, section dots, parallax, card-shuffle decks, marquee | everywhere | Feels busy and "flashy-cheap"; slows first paint; distracts from the offer |
| Clashing palette: saturated violet-blue slabs + crimson + purple-navy | services, about, contact | No sense of a premium brand; low contrast hierarchy |
| All-caps condensed Oswald for every heading, glowing oversized nav links | global | Shouting; dated |
| Logo appears 3× in the hero (nav, hero image, bottom seal) | hero | Looks unsure of itself |
| Services hidden in stacked card decks, one card visible at a time | services | Buyer can't scan what you do in 5 seconds |
| Partner logos in a fan carousel showing one logo at a time | trust | The strongest proof (Cisco, Meraki, Fortinet, Axis…) is hidden |
| Inconsistent numbers: hero says "25 years", stats say "24+"; it's actually 28 (1998→2026) | hero/stats | Erodes trust |
| No proof: no project case studies, no client names, no testimonials, no photos of Armak's own people/work, no license # | — | The #1 thing commercial buyers look for is missing |
| Single page only | — | Can't rank for "structured cabling Glendale", "access control Burbank", etc. |

## 2. What the industry leaders do (research)

Researched the top North American integrators by revenue (SDM 2026 report, 2025 revenue:
Convergint $2.41B, Securitas Technology $1.18B, Everon $950M, Pavion $698M, M.C. Dean $575M),
top electrical/low-voltage contractors (Rosendin, Cupertino Electric), and the design-forward
companies in adjacent physical-security / infrastructure tech (Verkada, Rhombus, Anduril,
Samsara, Ubiquiti/UniFi, Vertiv).

Patterns that repeat across the best of them:

1. **Real people, real job sites.** Convergint, M.C. Dean, Rosendin, Cupertino Electric all lead
   with full-bleed photography of their own technicians in hard hats / at racks. Zero particle
   effects. Authenticity *is* the premium signal for contractors.
2. **Oversized, confident typography — but restrained palette.** Anduril and Samsara: huge
   grotesk headlines, black/white/off-white + ONE accent color. Rosendin: big white caps over photo.
3. **Proof immediately under the hero.** Rhombus, Samsara: client logo strip directly below the fold.
4. **Scannable capability grids.** Anduril's product tiles (photo cards in an asymmetric bento),
   Vertiv's industries row. Everything visible at once, every tile links deeper.
5. **Clear IA: Services · Industries · Projects · About · Careers · Contact.** Every
   large integrator has dedicated pages for each — this is also how they win local SEO.
6. **One dominant CTA** ("Request a Demo" / "Get a Quote") repeated in the header and at section ends.
7. **Technical metadata as decoration.** Anduril's "EST. 2017 → FUTURE", numbered "PT — 01/02"
   labels; Verkada's spec-sheet details. Signals engineering rigor without effects.
8. **Motion is subtle and purposeful:** text reveals on scroll, image scale-ins, sticky sections.
   Never ambient noise.

## 3. Design direction: "Precision Infrastructure"

The concept: **the site should feel like a perfectly terminated, labeled, certified rack.**
Clean, ordered, documented, quietly confident. Every design motif comes from the trade itself.

### 3.1 Signature motifs (what makes it *Armak*, not a template)
- **TIA-606 labeling system as the UI language.** Section labels styled like cable/port labels:
  `A-01 · SERVICES`, `B-02 · PROJECTS`. Mono font, small caps, hairline box.
- **T568B color-pair stripe.** A thin 8-segment stripe (orange-white / orange / green-white /
  blue / blue-white / green / brown-white / brown) used as a section divider and button
  hover accent. Instantly recognizable to anyone in the trade; invisible noise to no one.
- **"Certified" proof cards.** Show a stylized Fluke-style test-result snippet (PASS, margin dB,
  length) as a visual for "every cable tested and documented" — turns a claim into evidence.
- **Building cross-section explorer (homepage centerpiece).** An isometric/sectional SVG of a
  commercial building; hovering/tapping each layer (cabling, network, security, access, voice,
  AV) highlights it and shows that service. Replaces the particle field + radar as the
  "wow" moment — but it explains what you do instead of decorating.
- **Real service-area map.** MapLibre + OpenFreeMap (free, no API key) with a monochrome style,
  Glendale HQ pin, coverage polygon, city list. Replaces the hand-drawn SVG radar.

### 3.2 Design tokens
- **Color** (light-dominant, dark used for contrast bands)
  - Ink `#0B0D10`, Graphite `#1A1D22`, Steel `#5B6370`, Hairline `#D9D7D0`
  - Paper `#F4F3EF` (warm off-white, main background), White `#FFFFFF`
  - Signal Red — refined from the logo red, used ONLY for primary CTAs, live indicators, key numbers
  - Armak Blue — from the logo swoosh, used only in diagrams/map
  - T568B pair colors — only in the stripe motif
- **Type** (all free/OFL, self-hosted via @fontsource — no Google Fonts request)
  - Display + UI: **Geist Sans** (tight tracking, large sizes, sentence case — no more all caps)
  - Technical labels / specs / numbers: **Geist Mono**
- **Grid:** 12-col, 1px hairline rules, generous whitespace, max content width ~1320px
- **Icons:** Lucide (MIT) or Phosphor (MIT), 1.5px stroke

### 3.3 Motion (restrained)
- GSAP + ScrollTrigger + SplitText (all free for commercial use since Webflow's acquisition)
- Lenis smooth scroll (MIT)
- Headline line-reveals, image clip/scale-in, count-up on 3–4 numbers, one pinned section
  (building explorer). Everything respects `prefers-reduced-motion`.
- **Remove:** particles, custom cursor, loader screen, scroll-progress bar, section dots,
  parallax, card-shuffle decks, marquee.

## 4. Information architecture

```
/                         Home
/services/                Services overview
  /structured-cabling/    Cat6A, Cat8, fiber, certification
  /networking/            Switching, Wi-Fi, firewall (Cisco, Meraki, Aruba, Fortinet, UniFi)
  /video-surveillance/    CCTV, NVR, remote monitoring (Axis, Bosch, Hikvision, LTS)
  /access-control/        Card/mobile access, intercom (Honeywell…)
  /voip-unified-comms/    Cloud voice, call flows
  /audio-video/           Conference rooms, signage (Crestron)
/industries/              Healthcare, Education, Commercial Office, Retail, Hospitality,
                          Multifamily, Government, Industrial/Warehouse  (start as one page,
                          split later)
/projects/                Case studies (index + detail pages)
/about/                   Story since 1998, team, certifications, license #
/contact/                 Form + site-assessment booking + map
```
Service pages are generated from one data file (`services` content) through one template, so
adding a service = adding one entry.

## 5. Homepage, section by section

1. **Header** — logo (once), Services (mega-menu with all 6 + photos), Industries, Projects,
   About, phone number `(818) 858-4615`, red "Request Site Assessment" button. Becomes compact
   on scroll; full-screen menu on mobile.
2. **Hero** — full-bleed photo or muted looped video of Armak techs in a data closet.
   Headline (sentence case, huge): *"Infrastructure that doesn't go down."* One-line sub,
   two CTAs. Bottom spec strip in mono: `EST. 1998 · GLENDALE HQ · BICSI-CERTIFIED ·
   LICENSED & BONDED · 24/7 SUPPORT`.
3. **Proof strip** — static grayscale grid of manufacturer partners (Cisco, Meraki, Fortinet,
   Aruba, Axis, Bosch, Honeywell, CommScope, Panduit, Crestron, Ubiquiti) — all visible at once.
   Client logos added if permission is obtained.
4. **Building explorer** (pinned scroll section) — the signature interactive; each layer
   links to its service page.
5. **Services bento** — 6 photo tiles in an asymmetric grid (Anduril-style), each with label,
   one-line description, arrow → service page.
6. **The Armak standard (process)** — Assess → Design → Install → Certify → Support. Horizontal
   numbered timeline with the "test result" proof card on Certify.
7. **Featured projects** — 3 case studies: photo, sector, location, scope numbers
   (e.g. "1,240 drops · 86 cameras · 4 IDFs"), link to full story.
8. **Numbers band** (dark) — 28 years (computed from 1998, never hardcoded), 946+ projects,
   24/7, N cities served. Count-up once.
9. **Industries** — horizontal row of 8 sector cards.
10. **Service area** — MapLibre map + city list (also great for local SEO text).
11. **Testimonials** — 2–3 quotes with name/title/company.
12. **CTA + form** — two-step form: step 1 pick project type (chips), step 2 contact details.
    Keeps Web3Forms. Optional Cal.com embed to book a site walk directly.
13. **Footer** — full NAP, license #, hours, service links, city list, T568B stripe.

## 6. Technical approach

### Recommended: migrate to Astro (rewrite, not refactor)
Since every component is being redesigned anyway, switching costs are near zero and Astro is
purpose-built for this kind of site:
- Multi-page with shared layouts; `.astro` components are nearly identical to our EJS partials
- Content collections for services / projects / industries (typed, one template each)
- Built-in image optimization (AVIF/WebP, responsive `srcset`) — fixes the image backlog item
- Zero JS by default; GSAP/MapLibre loaded only on pages/sections that use them (same
  "contextual loading" idea we built by hand in `main.js`, but native)
- Official sitemap integration; easy JSON-LD
- Still a static build to `dist/` — hosting doesn't change

Alternative: stay on Vite + EJS with multi-page `build.rollupOptions.input`. Works, but we'd
hand-roll image optimization, sitemaps and page templating.

### Free / open-source pieces
| Need | Pick | License |
|---|---|---|
| Animation | GSAP + ScrollTrigger + SplitText | Free incl. commercial |
| Smooth scroll | Lenis | MIT |
| Map | MapLibre GL JS + OpenFreeMap tiles | BSD / free, no key |
| Fonts | Geist Sans + Geist Mono via @fontsource | OFL |
| Icons | Lucide | ISC/MIT |
| Forms | Web3Forms (existing key) | free tier |
| Booking (optional) | Cal.com embed | free tier |
| SEO | @astrojs/sitemap + LocalBusiness JSON-LD | MIT |

### Reuse from the current codebase
- `.env` `WEB3FORMSAPIKEY` and the form fields/honeypot from `src/components/cta.ejs`
- Submit/feedback logic from `src/js/components/cta.js`
- `src/js/utils/motion.js` reduced-motion pattern
- All copy in `src/components/*.ejs` as the starting text (to be tightened)
- Partner logos in `public/` (re-export the "removebg" PNGs as clean SVG/mono where possible)
- City list + HQ coordinates from `src/components/hero.ejs` for the new map

## 7. Phases

| Phase | Output | Needs from you |
|---|---|---|
| 0. Content & assets | Real photos, 3 projects, license #, certifications, 2–3 testimonials, client logo permissions | Yes — biggest quality lever |
| 1. Design system | Tokens, fonts, buttons, labels, stripe, cards, section headers + a `/styleguide` page to review | Approve look |
| 2. Homepage | All 13 sections above | Review |
| 3. Inner pages | 6 service pages, industries, projects, about, contact | Review copy |
| 4. SEO & performance | JSON-LD, sitemap, OG image, meta per page, image pipeline, Lighthouse ≥ 95 | — |
| 5. Launch | Old JS/CSS removed, redirects if any URLs change, deploy | Go-ahead |

Work happens on a `redesign` branch; the live site is untouched until launch.

## 8. Verification
- `npm run dev` and review every page at 375px, 768px, 1440px in the browser pane
- Lighthouse (performance, accessibility, SEO, best practices) ≥ 95 on home + one service page
- `prefers-reduced-motion` on → no animation, all content visible
- Keyboard-only navigation through header, mega-menu, building explorer, form
- Real form submission to sales@armak.tech via Web3Forms (with your OK)
- Validate JSON-LD with Google's Rich Results Test

## 9. Decisions (made 2026-10-11)
1. **Visual direction: Light editorial.** Off-white Paper background site-wide, Ink type, Signal
   Red only on CTAs/live indicators. Hero is light too: oversized headline on Paper with the photo
   *framed inside the grid* (not full-bleed dark). Ink is reserved for the footer and small
   inverse elements (buttons, the spec strip); the numbers band becomes a hairline-ruled light
   section with huge mono numerals instead of a dark band.
2. **Framework: Astro.** Full rewrite into Astro; the Vite + EJS source is retired at launch.
3. **Scope: full multi-page site** in round one (all pages in section 4).
4. **Photography: free stock for now** (Unsplash/Pexels, license-checked, no recognizable
   competitor branding or other companies' logos in shot). Every photo goes through one image
   component with a clear `TODO: replace with real Armak photo` slot so swapping later is a
   one-line change. Projects/testimonials use clearly marked placeholder content until the
   real ones are supplied — nothing fabricated ships to production.

Still needed from Armak before launch (not blocking the build): license #, certification list,
3 real projects, 2–3 testimonials with permission, client logo permissions.
