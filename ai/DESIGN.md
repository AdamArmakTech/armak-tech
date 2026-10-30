# DESIGN.md — why armak.tech looks the way it does

Owner rule (2026-10-29): **every design aspect must be intentional and in line with the information on
the website.** Nothing decorative survives unless it carries meaning. Each rule below is "we do X because
the site says or does Y." If a change can't be tied to a rule, don't make it.

## The ten rules

1. **The homepage opens on the cable test report, not a stock photo.** The site's main promise is
   "Every run, rack and port is tested and documented before we leave the site. You get the reports"
   (`src/data/content.ts`, step 04). We own no photos of Armak's own work, so the report is the proof.
2. **Stock photos appear only on the six service pages, captioned as example equipment.** The seven
   photos in `src/assets/photos/` are interim stock (see CREDITS.md) and must never read as Armak jobs.
   They are not on the homepage, `/services/` or `/about/`. No trade-label chips on photos.
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
10. **Things move only where the job moves:** a test runs, a step advances, a demo plays. Headings,
    numbers and scrolling do not animate.

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
