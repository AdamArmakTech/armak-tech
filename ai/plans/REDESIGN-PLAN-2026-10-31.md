# armak.tech: stop making AI slop. A new way of designing it, not another restyle

## Context
The owner has asked for a "completely modern and new" site "with animations and revealing things and cool diagrams" since Oct 11. Every round came back looking AI-made. Three read-only reports (owner history, web research, site audit) agree on why:

1. **The identity never changed.** Geist + Geist Mono (the #1 "AI/dev-tool" font pair), two flat colours (off-white + near-black) with one red accent, mono uppercase labels, hairline rules, card grids with arrows, a stats row, the same fade-up on every section. Anthropic's own frontend skill and impeccable.style/slop list almost every one of these as AI tells, including the "engineering spec / mono label" look we called a design direction.
2. **I subtracted when he asked for more.** "Slop" was answered with a restraint rulebook (≤900 ms, play once, no new scroll effects, fewer reveals), so it got blander.
3. **The tools he installed were never actually run.** taste-skill's deal-and-inspect loop (`draw.mjs`, `inspect.mjs`), image-to-code (design images first), impeccable `critique`/`live`, the Figma connector: no trace of any of them on this site.
4. **He judged from cropped phone screenshots** and the new looks threw away what he liked (hero photo, three choice boxes, test card).

Goal: a site that looks designed by a person for this specific company. Real type, a real colour system with depth, one big signature motion story about "Built for the future", diagrams as the main feature, and the parts he likes kept. He sees pictures before code, and live pages at computer width before anything rolls out.

## Keep (owner decisions, fixed)
- "Built for the future." headline. 946+. Red button "Request a site assessment". Logo.
- Hero: photo with the cable test card on it, plus the three choice boxes ("I need a quote", "I'm planning a project", "Something's broken").
- Dark footer with the wire stripe. Smooth scroll, heading reveals, counting numbers.
- Every feature built since Oct 30: cable test, building cutaway + "10 years" switch, the five process demos, trace + handover record, job timeline, "Put in on day one" sheet, cable-plant chart, city search, glossary popovers, open-now status, UX-law fixes, all confirmed facts.

## Step 0. His small fixes from today (do first, ~30 min, one commit)
- Remove the "Print this scope sheet" button and its print code (`src/components/services/ServiceHero.astro`).
- Contact form: remove the free-rough-quote / on-site choice from the "What are you building?" step (`src/components/forms/ContactForm.astro`, tiers data in `src/data/content.ts`). Assumption: the free quote stops being advertised. Remove its mentions in the contact lead, the homepage contact intro and the Assess step, and keep "the assessment fee is credited toward your project". The email subject switch goes with it.
- Remove every "Illustrative photo" caption (hero, service tiles, services index, About, service pages, PhotoBand). Note for him, once: the photos are still stock. The real fix is product photos (Step 4).
- `npx astro check`, `npm run build`. Save the code-review report to `ai/CODE_REVIEW_2026-10-31.md` (the review is running read-only now).

## Step 1. Write the art direction from the subject, not from defaults (no code)
- Run taste-skill's design mode for real: `node C:/Users/Aram/.claude/skills/taste-skill/scripts/draw.mjs` deals 3 researched directions from its 247-site library. Keep the brand-fixed slots (`--keep` logo colours). Candidates that fit: `product-performs` (the demos), `hero-object`, `specimen-catalogue` (product photos).
- Build each direction from Armak's own world, not a template:
  - **Colour:** the logo's red and blue are real brand colours. Add colours with fixed meanings taken from cabling: Cat 6A jacket blue, OM4 aqua, OS2 yellow, fiber light. One dominant field colour with depth (grain via SVG feTurbulence, light, tone steps). No cream + one accent. No near-black + one acid accent.
  - **Type:** replace Geist. Candidates from the research: Archivo (variable width, condensed for signage-style headlines) + Schibsted Grotesk or Hanken Grotesk body + Martian Mono only for real cable and part IDs. Paid option: PP Formula Condensed + GT America. Big contrast: 3x size jumps, weights ~250 vs ~800.
  - **Drop the tells:** mono uppercase eyebrow labels, middle-dot strings, red square separators, hairline on every section head, arrow on every card, uniform fade-up, stats row as a strip.
- Output: `ai/ART_DIRECTION.md` with 3 directions, each with palette (hex + role), fonts, the hero, the signature scroll scene, and a do/don't list checked against the AI-tell lists (impeccable.style/slop, Anthropic frontend skill, Adrian Krebs' 15 tells).

## Step 2. Pictures before code (owner picks)
- image-to-code way: generate one large design image per direction for the homepage hero + first two sections at 1440 wide, plus one phone view. Tool: Figma connector `generate_image` (needs a Figma file via `create_new_file`; uses Figma AI credits, I'll say the cost before running).
- Run each image through the "reverse squint test": a fresh agent is shown it and asked "which tool or template made this?". Redo any that read as a template.
- Send him the images as one PDF. He picks a direction or mixes ("A's colours with B's hero"). One question, with pictures.

## Step 3. Build only the homepage, show it live at computer width
- Build the picked direction on a new branch `art-direction` (intent-redesign stays as the fallback). Pass `--direction <id>` sheet, tokens rewritten in `src/styles/tokens.css`, fonts via `@fontsource`, components restyled. Behaviour and data stay.
- **Signature motion, one per page.** Homepage: a pinned scroll story "Built for the future". The building cutaway draws itself from the wiring closet out to every room as you scroll (GSAP ScrollTrigger + DrawSVG, now free; Lenis already wired in `src/scripts/motion.ts`). Fiber light runs along the routes. Then the "10 years from now" moment: devices swap, desks move, the cabling stays. Spare fiber, conduit and room to grow light up (his ten confirmed practices). This is his brand angle as the main event.
- Everything else gets purposeful motion only: reveals tied to content (diagram parts arriving, report printing), not a fade on every block. Reduced-motion and no-JS show the final state (`@supports` guards).
- Loop: taste-skill `inspect.mjs` at 1440/768/390 plus impeccable `critique`, max 3 rounds, then emil-design-eng polish on the signature scene.
- He sees it on the preview link on his computer and his phone (push to the `art-direction` branch after he says go), plus a desktop video or GIF of the scroll scene. Gate: he approves the homepage before any other page changes.

## Step 4. Roll out, then photos
- Same direction across the inner pages: manager + Sonnet workers (batches of 5–6, one owner per file) + Opus proofreader, as before.
- Product photos, Ubiquiti-style. He's an authorized CommScope and Panduit partner, so their partner portals have image packs. Crestron images are on E: and need a yes on dealer status. Shot as objects on the new field colour. They replace the stock photos.

## Files that change most
`src/styles/tokens.css`, `src/styles/global.css`, `src/scripts/motion.ts`, `src/layouts/Base.astro`, `src/components/home/*` (Hero, BuildingExplorer, BuildingSvg, Process, Numbers, Industries), `src/components/ui/{SectionHead,Label,SpecStrip,ServiceTile,Button}.astro`, `ai/DESIGN.md` (rewritten from the chosen direction; rules 2, 3, 7 on facts, photos and red stay).

## Verification
- After each step: `npx astro check` 0 errors, `npm run build`.
- `reports/redesign/cta-handoff.test.mjs`: contact links, never two red buttons, contrast ≥4.5:1.
- taste-skill `lint.mjs` + `inspect.mjs`, scored against `references/critique.md`. Reverse squint test on the finished homepage.
- Playwright in Edge at 1440 and 390: no sideways scroll, no console errors, the signature scene works with mouse, touch, keyboard and reduced motion. The contact form is never submitted.
- He reviews on the live preview link at computer width, not cropped screenshots. Nothing goes to armak.tech until he says "publish".

## Cost and time
- Step 0: one worker, minutes.
- Steps 1–2: one Opus designer, a few Figma image credits.
- Step 3: one Opus builder + checks, about half a day.
- Step 4: the usual manager run.
- Fewer, bigger decisions for him: one picture pick, one homepage approval.
