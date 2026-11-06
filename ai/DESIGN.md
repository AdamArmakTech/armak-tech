# DESIGN.md — why armak.tech looks the way it does

Owner rule (2026-10-29): **every design aspect must be intentional and in line with the information on
the website.** Nothing decorative survives unless it carries meaning. Each rule below is "we do X because
the site says or does Y." If a change can't be tied to a rule, don't make it.

## The ten rules

1. **The homepage opens on the headline and the cable test report.** The headline stays "Built for the
   future." (owner, 2026-10-29). The report sits beside it because the site's main promise is "Every run,
   rack and port is tested and documented before we leave the site. You get the reports" (step 04).
2. **Photos show the equipment Armak installs, product-style on clean backgrounds** (the way Ubiquiti
   presents gear), never staged people and never stock passed off as Armak jobs. The seven interim stock
   photos in `src/assets/photos/` are replaced as product images with proper rights arrive (manufacturer
   partner assets or Armak's own shots). Until then a photo slot shows the product image or nothing, not a
   staged stock scene. No trade-label chips on photos.
3. **Index codes only where they name a real thing.** TIA-606 labels identify cables, ports and systems.
   Keep: services A-01..A-06 (menu, tiles, scope sheet, explorer tabs), steps 01..05, the cable test's
   cable ID, the 404 "link test". Drop: every section or page code (B-, C-, D-, F-, G-, H-, J-, K-, N-,
   P-, R-, T-). A label on a heading identifies nothing.
4. **Mono type only for what a technician reads off a tester or a drawing:** codes, standard names,
   lengths, PASS/FAIL. Breadcrumbs, kickers, nav, form labels and "Next" links are sentence-case sans.
5. **Hairlines only separate rows** (lists, schedules, FAQ, glossary, scope sheet, form fields), the way
   lines work on a drawing. Sections are separated by space, never by a top rule.
6. **T568B wire colors appear only where they mean wire pairs** (the CableTest wire map). They are a
   wiring standard, not a brand palette. No stripe on the footer or CTA panel.
7. **Red marks the one next action on a screen, plus FAIL. Green marks only PASS.** The guided CTAs and
   the cable test are the only things on the site that ask for attention. One red-filled button per screen.
8. **Every page ends in one dark band:** the Next-step block running straight into the footer. Every page
   ends with the same action, so they share one surface.
9. **Text is sized and colored to be read.** Headings fit two lines on a 375px phone (the hero three).
   Paragraphs are near-ink (`--text`); grey (`--steel`) is for metadata only. Plain sentences, no slogans.
10. **Motion is kept but restrained** (owner, 2026-10-29; additions approved 2026-10-30). What animates:
    smooth scroll, heading line reveals, counting numbers, the demos (a test runs, a step advances, a
    cable traces), map dots landing once on first view, scope-sheet rows revealing once, the step number
    ticking, and the explorer layer drawing in once per layer. Added 2026-10-31 (owner approved the ten
    animations and ten diagram features, 2026-10-30): press feedback on buttons, chips and replay buttons; the closet
    slider following the finger; the glossary popover growing from its word; swipe down to close the glossary sheet;
    direction-aware form steps and step-number tick; FAQ and "What’s this?" answers unfolding; menus dropping from the
    header; the trace port lighting when the route arrives; the thank-you slip and quiz result entering; a sliding
    highlight behind the active tab (process steps, explorer, cable test mode). Diagram motions: a room’s cable route
    drawing back to its closet; the design plan drawing itself (walls, jacks, routes); the trace legs and the record
    row wipe; the cable test gauges filling as each check passes; the job timeline hatch wiping in once; the
    Today / 10 years from now switch on the cutaway; the cable-plant chart bars growing once. Hover nudges run only on
    devices with a real hover. Nothing loops forever. Nothing else animates; no new scroll
    effects. Every animation shows its final state immediately under reduced motion and when scripts do
    not run.

## Tokens that carry the rules (`src/styles/tokens.css`)
- Spacing scale `--sp-1..10` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Use these, not ad-hoc rems.
- Section rhythm: `--space-section` 64–112px, `--space-block` 32–48px. Neighbouring sections share one gap.
- Text: `--ink` headings, `--text` paragraphs, `--steel` metadata, `--signal` the one action, `--pass` PASS.
- Type: display 44–104px, h1 36–68px, h2 28–44px, body 17px, small 15px, label 13px (floor).
- Breakpoints: 420 (max-width, small phones), 640, 900, 1024. No others.
- Radius 2px / 4px. Fonts: Geist and Geist Mono (self-hosted).

## What is fixed and never changes without the owner
Logo, the red accent, the fonts, all copy (facts come from Armak only; see `ai/HANDOFF.md`), the guided
CTA system (`src/lib/cta.ts`, `NextStep.astro`, `CtaDock.astro`, the two-step `ContactForm.astro`), the
cable test and process demos' content, the glossary data, the 2026-10-29 mobile fixes (44px targets,
13px floor, focus ring, header call icon).

## How to use this file
Before a visual change: name the rule it serves. After: check it against the four breakpoints, show a
screenshot. If a tool (Taste, Impeccable, guidelines review) proposes something outside these rules,
it needs the owner's yes first.

## Direction A: "The closeout package" (owner's choice, 2026-10-30) — overrides rules 8 and 10 where they differ
The site looks like the bundle of papers Armak hands a client at the end of a job: the test report, the drawing,
the summary sheet, a coupon. Each section is one SHEET (a white or paper panel) laid on a surface (ink, paper or
the logo blue #1d3f8f). Blue appears as a full surface once per page at most (the drawing / blueprint field).
- **Rule 8, replaced:** pages END LIGHT. The closing next-step band is a white sheet on paper (not ink), and the
  footer is paper with ink text and hairline rows. The only large dark surfaces are the hero band at the top of
  the homepage and, where a page needs one, a single mid-page ink band. Never a dark block at the bottom of a page.
- **Rule 10, extended (owner approved 2026-10-30):** motion tells the paperwork story: the report sheet settles
  onto the hero edge; the PASS stamp presses in; the numbers slip feeds out like a receipt; the coupon's
  perforation pulls on hover; schedule rows fill in; the blueprint traces itself; sheets lift slightly as they
  reach the top of the screen. Every animation plays once (hover ones on hover), is short (≤ 900 ms), uses
  transform/opacity/clip-path/stroke-dashoffset only (plus grid-template-rows for the FAQ and "What’s this?" unfolds, approved 2026-10-30), and shows the final state immediately under reduced motion
  and when scripts do not run. No other scroll effects.
- Sheets: white (#fff) or paper, 1px hairline edge, `--shadow-raise` only on the sheet that crosses a band edge.
  Big type is allowed for the hero headline and for measured figures (the "28"). Codes, red and photos rules
  (2, 3, 7) are unchanged.

## Owner decision 2026-10-31: back to the live site's look (overrides Direction A where they differ)
After seeing Direction A at computer width the owner said it "looks completely different and not in a good way":
empty space and an off layout in the hero, the photo gone, the three choice boxes gone. He chose "old look, keep the
new features": the look and layout of the live site (GitHub main, 9d6993e) come back; everything built since stays
(diagram features, animations, two-tier quote choice, UX-law fixes, honest copy, owner-confirmed facts).
Direction A is saved as git tag `direction-a-final` (11afcf0) in case it is wanted again.
Done 2026-10-31 (manager run). The live look also undoes parts of the 10-29 refresh, so these rules are PAUSED
until the owner says otherwise: rule 4 (mono labels, mono form labels and breadcrumbs are back), rule 5 (sections
have top rules again), rule 6 (the wire-colour stripe is back on the footer and the closing band), rule 8 as
written (inner pages end in the live site's dark Next-step band), rule 9's near-ink paragraphs (leads and muted text
are --steel again, 5.9:1) and the smaller type/spacing tokens (live sizes are back). Still in force: rule 2 (stock
photos are captioned "Illustrative photo"), rule 3 (no decorative section codes; real codes only), rule 7 (one red
filled button per screen: the sticky header button turns ink via `data-quiet-cta` while another red button is on
screen), rule 10 (all approved motion kept). Do not "fix" the live look back toward the refresh without the owner.

## Owner decision 2026-11-05: round 1 of the anti-slop redesign (overrides the 10-31 pause where they differ)
After the design critique (`ai/CRITIQUE_2026-11-05.md`) the owner decided, question by question: the headline "Built
for the future." stays (rule 1); the hero keeps the photo, the cable-test card and the three choice boxes, recomposed
as title, lead, one red button, then the boxes without outlines; NO index codes anywhere (rule 3 is now: codes only for
real cable IDs, pin numbers and lengths inside the test card and the demo drawings; the A-01..A-06 service codes and the
01..05 step numbers are gone); rule 4 is back in force (mono = `.t-readout`, only instrument readouts; every other label
is `.t-meta` or body text; `.t-mono` no longer exists); rule 5 is back (no top rules on sections; lines only in the
cable-test table, form fields and real list rows such as FAQ and glossary terms; surfaces are tone steps: paper, white
sheet, paper-sunken, with no 1px borders and no resting shadows); rule 9 is back (leads and running text in `--text`,
`--steel` only for `.t-meta`; body 17px; the scale is display, h1 up to 80px, h2 48px, h3 22px, lead, body, small 16px,
label 14px). Section rhythm is 64 to 112px (`--space-section`). Outline buttons and chips are filled tone steps. No
labels above headings and no boxed tags: `Label` renders quiet text, `SectionHead` and `PageHero` accept but ignore
`label`, `code` and `spec`. The footer keeps its wire stripe (owner, ART_DIRECTION "keeps"). Measured result (taste-skill
inspector, nine pages, 1440/768/390): findings 157 → 67, hard faults 99 → 29; what remains is real photographs (owner),
the motion decision (round 3), composition holes on About, Plan and Glossary (round 2), and allowed lines.
