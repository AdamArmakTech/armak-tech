# Demo and drawing animations, richer and smoother (2026-11-06)

Side session started from the main session on 2026-11-06 (owner, from his phone: "beef up EVERY single animation
whilst keeping it as smooth as possible ... gracefully revealing itself ... BOTH ON DESKTOP AND ON PHONE").
Branch `claude/demo-motion-eec65d`, based on `intent-redesign` at e2e67f2. Not pushed, not published.

Files changed (only the ones this session owned): `src/scripts/demo.ts` (new helpers, old exports untouched),
`src/components/process/AssessDemo.astro`, `DesignDemo.astro`, `SupportDemo.astro`, `TraceDemo.astro`,
`OfficePlan.astro`, `DemoFrame.astro`, `RoomForLater.astro`, `src/components/ui/CableTest.astro`,
`src/components/pages/CablePlant.astro`, `src/components/plan/CableCompare.astro`, `src/components/home/Hero.astro`,
`Numbers.astro`, `PartnerStrip.astro`. Not touched: InstallDemo, Process, BuildingSvg, BuildingExplorer, motion.ts,
global.css, tokens.css, data, pages, PROJECT_STATE, DESIGN, HANDOFF.

## Two things the main session should know
- The worktree the app made for this session started from `main` (9d6993e), not from `intent-redesign`. The task's
  files (TraceDemo, RoomForLater, CableCompare, CablePlant, CLAUDE.md, ai/DESIGN.md) only exist on `intent-redesign`,
  so this branch was fast-forwarded onto `intent-redesign` (e2e67f2) before any work. The sibling worktrees
  (`claude/site-reveals-9929c9`, `claude/about-page-1c7980`) were cut the same way and may need the same fix.
- `.claude/launch.json` has a local, uncommitted third entry `armak-dev-motion` (port 4331), because 4321 and 4322
  belong to the main checkout's servers. Keep or drop it; it is not in the commit.

## What was wrong before (audit, 2026-11-06)
- Site walk: a dot slid at one speed; the drawing showed nothing about what was found; report rows only recoloured.
- Site plan: all 18 routes drew at once in one 900 ms transition, from the devices toward the closet (backwards), and
  the corner camera's branch stopped short of the trunk (the trunk started at the rack, x 73; the camera is at x 16).
- Move request: the old cord dash-faded out and a new one dash-faded in; "test" and "record update" were two faded ticks.
- Cable test: the four measurements showed "Testing…" then the finished value popped in; the wire map did nothing
  while they ran.
- Trace, hero card, numbers, partner strip, the two tables, the cable-plant labels: one flat fade or no entrance.

## What each one shows now (and how long it takes)
Timings measured at 390 px in Chromium from the tab click to the demo's `finished()` signal.
- Site walk (4.9 s, was 4.8): the walker waits at the entrance, then one leg per finding, easing in and out of each
  stop (170 plan units per second, 300 ms per stop). 120 ms before each stop the room is shaded (new `.plan__room`
  floors in OfficePlan, ink at 5%). At each stop a mark appears on the plan: rings closing in on the two old cameras
  and the keypad; the two old unlabeled runs drawn from the desks to the closet; the open-ceiling hatch plus a band
  along the conference wall that needs conduit; a ring on the ELEC panel; three of the rack's four units filling in.
  The pin drops (scale 1.6 → 1) and the report line is written in from the left (clip-path), the detail 150 ms
  later. The green "Site report ready" line rises and its check draws itself. The walker and the red line are ONE
  Web Animation each (transform / stroke-dashoffset), so no script runs per frame.
- Site plan (4.4 s, was 3.3): walls as before; 12 drops snap 25 ms apart with the count ticking in step; each access
  point lands (scale 0.5 → 1) and its coverage spreads from it (scale 0.45 → 1, 700 ms) 140 ms apart; each camera
  lands and its view opens from the camera point (transform-origin at the camera, 120 ms apart); then the trunk draws
  out from the rack along the ceiling (420 ms, plus a short spur left to x 16 so the corner camera's branch now
  connects), and one branch drops from the trunk to each device in the order the trunk reaches them (40 ms apart,
  200 ms each). The routes count ticks as each branch lands. Jack codes then slip up into place.
- Move request (5.0 s, was 4.9): Request: the ticket slides in, its stage dot pops. Look up: a highlight runs down the
  four record rows 130 ms apart; when it reaches 2B-14 the row is hit AND port A-14 lights red on the panel; when it
  reaches 3A-02 that row is hit and A-22 lights in steel ("found, free"). Re-patch: ONE cord (its top end carried
  by script, redrawn each frame for 900 ms) is pulled 12 units down out of A-14, carried across, and pushed up into
  A-22; a small plug rides on the end; A-14 then turns to a dashed steel outline (free) and A-22 turns green.
  Test & update: a green pulse runs down the new cord to the switch and back (560 ms, one Web Animation along the
  cord's curve), the first check draws itself, ", in use" is written in next to A-22 in the record, the second check
  draws, and "Done" lands with a small settle.
- Cable test (6.2 s, was 6.0): while the wires draw, the wire-map row tallies "1 / 8" … "8 / 8". For each of the four
  measurements the readout counts up (0.0 m → 47.2 m; +0.0 → +5.8 dB margin, eased so the last digits settle) while
  the map shows what the tester does: Length, a signal runs to the far end and back; Crosstalk, the four pairs
  (1-2, 3-6, 4-5, 7-8, now tagged `data-pair`) light one at a time while the others step back to 22%; Insertion loss,
  the signal fades as it travels; Return loss, the signal goes out and a smaller echo comes back. Failing cable
  unchanged. New prop `startDelay` (ms) for the first automatic run, used by the hero.
- Trace a cable (interactive, timings unchanged 0–900 ms): a tracer dot runs the route ahead of the line (one Web
  Animation through the four corners), the chosen jack pops, the three words rise in as their leg starts, and the
  port lights with a ring that spreads out once (pseudo-element, transform + opacity).
- Hero: the test-report card now settles onto the photo on its own (28 px rise + scale 0.98 → 1, 900 ms, starting at
  480 ms) and its wires draw 800 ms after the card is on screen at load (scrolled to later: at once). The chooser
  label, the three tiles (60 ms apart) and the call line arrive in order; the three credentials 50 ms apart.
- Numbers: each figure rises 90 ms after the one before; its unit ("Years in business") is written in from the left as
  the number counts (motion.ts still does the counting), the note after it; the "+" lands at 1.25 s as the count
  settles. Own IntersectionObserver at 60%, the same threshold motion.ts uses for the counts.
- Partner strip: the 13 wordmarks rise and fade in 45 ms apart, once, on first view. Still a wrapping row, nothing
  scrolls sideways.
- Cable-plant chart (About): the years on the axis, each Wi-Fi name and the "Put in on day one" line fade in as their
  bars land (`--d` per item). Bars unchanged.
- Which cable? table (Plan): the four cables arrive 80 ms apart on first view; on phones the cards rise 12 px, on the
  desktop table rows only fade (a transform on a table row is not reliable).
- Put in on day one for later (home): rows 60 ms apart, each ink tick drawing itself (stroke-dashoffset) as its row
  lands; rows rise 10 px where they are cards (under 900 px).
- Replay button (DemoFrame): the arrow winds back a quarter turn while pressed and springs forward on release.

## Rules kept
- transform, opacity, clip-path and stroke-dashoffset only; nothing animates width, height, position or shadows.
  SVG elements are moved with CSS transforms in viewBox units (`moveAlong` in demo.ts), so one Web Animation does it.
- Reduced motion: every demo decides once and shows its finished state; the arrivals (numbers, partners, tables,
  chart labels) are armed by script only, so they are simply there. Checked with the setting emulated: 5 of 5
  report rows on, 5 of 5 marks on, 2 of 2 port marks on, 8 of 8 wires drawn in both cards, nothing armed.
- No scripts: same finished states (checked with scripts blocked: all five step panels stacked, everything shown).
- `finished(root)` and `announce()` still end every stepper demo; the stepper's 1.6 s hold and crossfade are untouched.
- No new copy, no Armak claims. The only new words are UI readouts ("3 / 8", "0.0 m" while counting).
- Labels: no new SVG text; `fitSvgText` still sizes the plan labels. Checked at 390 and 1440.

## Checks
- `npx astro check`: 0 errors, 0 warnings, 0 hints. `npm run build`: passes (see the commit).
- Console: no errors or warnings on /, /about/, /plan/ at 390 and 1440 while every demo played.
- Smoothness, Chromium at 390 px with the CPU slowed 4x (dev server, so unminified): frames over 34 ms per run,
  steady state after the tab switch: idle page 2 of 160, Site walk 4 of 187, Site plan 3 of 179, Move request 4 of
  207, Cable test 5 of 317. Average frame 20 to 22 ms (idle 19 ms). Removing the cable test's patterns, pulse, pair
  dimming or counting changed nothing measurable, so none of them is a cost.
- Before/after PDF for the owner: `ai/exports/demo-motion-2026-11-06.pdf` (gitignored), made with Edge headless from
  Playwright screenshots at 2x.

## Left out, on purpose
- InstallDemo, Process, BuildingSvg and BuildingExplorer: the main session's files.
- The route layer in the site plan no longer fades in as a group (its pieces land one by one), so the legend chip's
  "highlight one layer" dim for that layer and the Wi-Fi / camera layers is instant rather than a 320 ms fade. Minor.
- A baseline smoothness measurement of the old demos was attempted against the main checkout's server (port 4321) and
  failed because its stepper markup has changed under the main session's uncommitted edits.
