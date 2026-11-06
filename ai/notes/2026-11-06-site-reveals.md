# Site-wide scroll reveals (2026-11-06)

Branch `claude/site-reveals-9929c9`, built on `intent-redesign` at e2e67f2. (The worktree was created from
`main`; it was fast-forwarded to `intent-redesign` before any work, so nothing from the live branch is lost.)

Owner's ask, from his phone on 2026-11-06: "how could we beef up EVERY single animation whilst keeping it as
smooth as possible? i want people to feel as though the site is gracefully revealing itself as they look at it and
scroll down on it BOTH ON DESKTOP AND ON PHONE". This widens DESIGN.md rule 10 ("no new scroll effects"): every
block now reveals once as it enters view, on phones too. Everything else about rule 10 still holds: transform,
opacity, clip-path and stroke-dashoffset only; each reveal plays once and takes under a second; reduced motion
shows everything at once; the content is always in the HTML; a CSS failsafe shows it all after 2.5 s if the
script never runs.

## The vocabulary (any session can use it on any element)

| Attribute | What it does | Use it on |
| --- | --- | --- |
| `data-reveal` | rise (default): fades in while lifting 24px (16px on phones) | text blocks, rows, lists, buttons |
| `data-reveal="fade"` | opacity only | breadcrumbs, logos, quiet lines, inline text |
| `data-reveal="clip"` | a masked wipe upward | photos, figures |
| `data-reveal="scale"` | settles from 0.98 to 1 | sheets, cards, panels |
| `data-reveal="draw"` | rise, and any inline SVG strokes inside draw themselves (90 ms apart) | rows and links with an icon |
| `data-reveal-group` | on a parent: its direct children reveal one after another, top to bottom, left to right; the value is the children's variant (`data-reveal-group="scale"`); `data-reveal-step="60"` changes the gap for that group | lists, grids, footer columns, article sections |

Rules of thumb:
- One reveal per block. Do not put `data-reveal` on a child of a group, or a group inside a revealed block (double fade).
- Never on an element with no box (`display: contents`), on sticky or fixed elements, or on containers that get
  children added by script (the new children would stay hidden). Mark the children instead.
- Never inside anything that gets cloned (the glossary term body is cloned into the drawer).
- Headings keep `data-split` (GSAP line reveal); do not add `data-reveal` to a split heading.
- Elements already above the screen when the page opens (a reload mid-page, a `#section` link) are shown at
  once, without motion.

## How it works

`src/scripts/motion.ts`
- Group children get `data-reveal` set from the group's value at boot (CSS hides them before that, so no flash).
- Two IntersectionObservers, one answer: "line" fires when a block's top edge passes a line a little above the
  bottom of the screen (10% on desktop, 5% on phones; threshold 0, so a block never has to be fully visible);
  "full" fires when a block is entirely inside the real viewport, which catches what the line can never reach (the
  last rows of the footer at the end of a page, short pages). Entries from both are pooled with a zero timer and
  sorted top to bottom, left to right, so each pass makes one cascade. Delays are `min(index, cap) × --reveal-step`
  (cap 8 on desktop, 6 on phones), so a long list never waits.
- `.is-revealing` carries the transition only while the reveal plays; afterwards a component's own hover/press
  transitions come back untouched (buttons, cards, logos).
- `draw`: strokes inside the block are measured with `getTotalLength()`, hidden with a dash pattern (the gap is
  longer than the shape and the offset leaves one stroke-width of margin, so a round cap cannot show as a dot),
  then drawn as the block rises; afterwards the inline dash styles are removed.
- Shapes that already have a dash pattern or no stroke are skipped (the map outline is left alone).

`src/styles/global.css` ("Motion states" block)
- Tokens: `--reveal-y` (24px; 16px under 640px), `--reveal-dur` (`--dur-slow` = 900 ms; 700 ms under 640px),
  `--reveal-step` (70 ms; 50 ms under 640px). The script reads the time tokens, so CSS is the one place to tune.
- Hidden and revealing states per variant; the failsafe (2.5 s) now covers group children and the clip variant;
  a print block shows everything in its final state (the /plan/ checklist prints).

## Where it is applied (files in this change)

- Section heads: title keeps `data-split`, intro `data-reveal` (unchanged). Spec strips fade (`SpecStrip`).
- Page openers: breadcrumbs fade (`PageHero`, `ServiceHero`); leads rise; CTA rows rise; the service scope sheet
  scales in with its own row cascade; aside content scales in (plan report, glossary search, 404 trace).
- Home: service tiles (scale, group), industries rows (group), "Next" links (draw: the arrow draws), service-area
  HQ block and county list (group), contact panel (scale) and contact details (group), projects grid when shown.
- Services index: the photo wipes up with a CSS-only animation (like the homepage hero, so this eager image never
  waits on the script), each row's summary, "includes" list and "See service" link reveal under the split name,
  the credentials list cascades.
- Service pages: capabilities grid (group), delivery steps (group), partner sentence and logos (fade group), FAQ rows
  (draw group: the plus signs draw), "Other services" head and grid (group), closing panel (scale).
- Industries: jump nav rises, each sector body (lead + systems line) cascades.
- Plan: jump nav, leads, checklist (group), print tools, estimator inputs (group) and results (group), send row,
  quiz questions, the Next-step block.
- Glossary: stats line, each letter heading, each term list (draw group: the chevrons draw).
- Contact: form panel (scale), details column (group).
- Projects: cover photo (clip), scope head, scope stats (group), story sections (group), related and more grids
  (scale groups), footer link.
- Legal and notices pages: each section cascades (group on the article).
- Footer: CTA headline is a split heading, CTA actions rise, the four columns cascade, area line and legal row fade.
- Inner closing panels (`PageCta`, `ServiceCta`): the whole sheet scales in; the title inside keeps its line reveal.
- Style guide: a "Reveals" block documents the vocabulary; swatches and type rows cascade.

## DESIGN.md rules served
- Rule 10 as the owner widened it on 2026-11-06 (every block reveals as it enters view, phones too); the motion
  budget (transform/opacity/clip-path/stroke-dashoffset, once, under a second, reduced motion and no-script safe) is
  kept exactly.
- Rule 5 (hairlines only separate rows): rows reveal one after another, so a list reads as a list.
- Rule 7 (one red action): nothing new is red; the red button simply arrives with its block.
- Rule 2 (product-style photos): photos wipe up rather than fade, so they read as placed on the page.
- Rule 9: no type, colour or spacing changed. Nothing moves sideways, so no phone row scrolls sideways.

## Checks (2026-11-06)
- `npx astro check`: 0 errors, 0 warnings. `npm run build`: passes.
- Playwright sweep on the dev server, 13 pages (home, services index, two service pages, industries, about, plan,
  glossary, contact, privacy, terms, open-source, 404, style guide) at 390×844 and 1440×900: scrolled end to end;
  every `data-reveal` block revealed (0 left), no `.is-revealing` or stroke leftovers, no horizontal overflow
  (scrollWidth = clientWidth), no console errors (only the expected 404 resource on the not-found page).
- Owner PDF: `E:\all-sites\armak-tech\ai\exports\reveals-2026-11-06.pdf` (phone-width before/after frames, the
  reveal slowed 6× for the pictures; frames in `ai/exports/reveal-shots/`, both gitignored).

## Anti-slop pass (same day, on the owner's question)
The taste-skill inspector (`scripts/inspect.mjs`, a real browser at 1440, 768 and 390) was run on the production
build of 12 pages before and after this pass (`.taste-skill/before` and `.taste-skill/after`, gitignored).

Motion changes made in this pass:
- The icon-stroke drawing is gone from the 140 glossary rows and the FAQ rows (one flourish repeated 140 times);
  it stays only on the three homepage "Next" links, where the arrow points down the page.
- Cascades vary by content instead of one 70 ms step everywhere: logos 40 ms, glossary terms and credentials 50,
  footer columns and the checklist 60, capability cards and FAQ rows 80, service tiles and project cards 90.
- A long list no longer arrives as a wall after the cap: full steps up to 5 (350 ms) on desktop and 4 (200 ms) on
  phones, then a quarter step per block, so nothing waits on a phone.
- The 404 "link test" card reveals line by line (head, result, route rows) instead of as one block.
- Not motion, but rule 9 in files of this change: /privacy/, /terms/ and /open-source/ running text is `--text`,
  not `--steel`.

Counts (12 pages, 3 widths each): before 25 FAIL / 51 WARN, after 25 FAIL / 48 WARN. The one motion finding
("little motion" on /404) is gone and the grey running text on /privacy/ and /terms/ is fixed. The 25 hard faults
are identical before and after and lie outside this change or inside the owner's own rules: too few photographs
(every page; rule 2 waits on product images), the paper palette and no footage (every page), hairlines in the scope
sheet, cable test and glossary rows (rule 5 allows list rows), mono readouts on /plan/ and /404 (rule 4), labels
read as "eyebrows" (breadcrumbs, the glossary chips), a three-line FAQ question at 390, white tile text over a
photo read as 1:1 contrast and a closing heading half below the screen edge read as "covered" (both probe
artifacts), the outlined license boxes on /open-source/, and uneven-margin warnings from the existing layout.
One of them is for the main session: the five-step tabs (`.steps__tabs` in Process.astro) scroll sideways at 390
(`side-scroll`), against the owner's rule that nothing scrolls sideways on phones. Lint (`lint.mjs src`): 63 FAIL /
26 WARN, all pre-existing patterns (hairline rows, mono readouts, the wire-colour stripe gradient, overlay
shadows); none from this change.

## Not done, or for other sessions
- `src/pages/about.astro` (about-page session): the facts card in the hero is slotted through PageHero's aside, whose
  wrapper has no box below 1024px; add `data-reveal="scale"` on that page's `<div slot="aside">`. The story
  figure's existing `data-reveal` still works (could become `clip`).
- `src/components/forms/ContactForm.astro` was left untouched because the main checkout has uncommitted edits to
  it; the panel around the form reveals instead.
- Hero, PartnerStrip, Numbers, Process, BuildingExplorer/BuildingSvg, the process demos, CableTest, CablePlant,
  CableCompare and PhotoBand belong to other sessions; the attributes above work on any element in them.
- `src/components/ui/Stat.astro` was left alone (used by Numbers, another session's file); stats on the project
  page reveal through their grid.
- Speed: the services index photo now runs a CSS-only wipe like the homepage hero, so no script wait, but any
  entrance animation can move the measured LCP; run PageSpeed on /services/ after the next publish.
- Local only, reverted before the commit: an `armak-dev-reveals` entry (port 4350) in `.claude/launch.json`, so
  this worktree's dev server did not collide with the other sessions' servers on 4321/4322.

## Merged (2026-11-06 evening, main session)
Merged into `intent-redesign` as d1486f0 on the owner's "Yes, merge both"; no conflicts. The script-armed arrivals
that the demo-motion branch added later (Numbers, PartnerStrip, CableCompare, RoomForLater) and the About chart sit
beside these reveals and got their own `@media print` resets on the night of 2026-11-06. See `ai/PROJECT_STATE.md`.
