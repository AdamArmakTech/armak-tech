# Diagram features: build-ready specs (B1–B10)

Written 2026-10-30 by the design lead for the combined build run in `ai/plans/motion-and-diagrams.md` (section B).
Read that file first, then `ai/DESIGN.md`. This file changes nothing on the site; builders follow it.

## Summary

| # | Feature | Files (owner order inside each file is in "File ownership" below) | Blocked by facts? | Size |
|---|---|---|---|---|
| 1 | Cutaway: a room's cables run back to its closet | `BuildingSvg.astro`, `BuildingExplorer.astro` | No | M |
| 2 | Design step draws itself; a labeled jack opens in the trace demo | `DesignDemo.astro`, `TraceDemo.astro` (listener), `Process.astro` (listener) | No | M |
| 3 | Trace runs jack → ceiling → closet; one record row writes itself | `TraceDemo.astro` | No (record title upgrades with item A10, now confirmed) | M |
| 4 | Closet slider callouts on the "after" side | `InstallDemo.astro` | No (the "both ends" wording uses A10, now confirmed) | S |
| 5 | Cable test gauges fill as the report prints | `CableTest.astro` | No | S |
| 6 | Job timeline above the five steps, after-hours work hatched | new `process/JobTimeline.astro`, one line in `Process.astro`, data in `content.ts` | No | M |
| 7 | "Today / Years from now" switch on the cutaway | `BuildingSvg.astro`, `BuildingExplorer.astro`, `content.ts` | Generic part no; signature marks yes (confirmed 2026-10-30); "10 years" label yes (needs a source) | L |
| 8 | Rack headroom drawn in the closet "after" view | `InstallDemo.astro`, `content.ts` | Yes, confirmed 2026-10-30 | S |
| 9 | "Enough for today / What Armak installs" sheet | new `process/RoomForLater.astro`, one line in `Process.astro`, `content.ts` | Yes, confirmed 2026-10-30 | M |
| 10 | One cable plant, several device generations | new `pages/CablePlant.astro`, one line in `src/pages/about.astro`, `content.ts` | Bars no; any number yes (needs a source) | M |

Before any feature: one builder adds all new data to `src/data/content.ts` in one pass (section "Shared data"). Size S.

## Source of the confirmations (read this)

- On 2026-10-30 the build coordinator relayed that **the owner confirmed in chat that all ten practices in
  `ai/FATHER-CHECKLIST.md` section A are Armak defaults** (items 1–10). Item 11 (his own words on what Armak
  does that most installers skip) is still unanswered. The shipped `signature` values below are therefore
  `confirmed: 'yes'` for all ten, with `confirmedBy: 'owner'`, `confirmedOn: '2026-10-30'`.
- `FATHER-CHECKLIST.md` was updated in the working tree the same day (items 1–10 ticked "yes (owner,
  2026-10-30)", plus an owner note that he answers these himself). Two loose ends for whoever owns those files,
  not these builders: in that edit items 1–11 lost their line breaks and now run together on one line; and the
  user-level rules (`~/.claude/CLAUDE.md`) still name the owner's father as the source of truth for Armak
  business facts. Before "publish", the proofreader confirms with the owner that the confirmation stands.
- The owner's confirmation covers **what Armak does**. It does not cover what other installers do, and it does
  not source any lifespan number. Those limits drive the cuts at the bottom of this file.

## Rules every feature follows

- Motion: only `transform`, `opacity`, `clip-path`, `stroke-dashoffset`/`stroke-dasharray`. Each animation
  ≤ 900 ms. Plays once per view; plays again only when the visitor acts again. Easing from `src/styles/tokens.css`
  only: `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for things arriving or drawing, `--ease-in-out`
  (cubic-bezier(0.65, 0, 0.35, 1)) for things moving across the screen, plain `ease` for fades on hover.
  Durations: `--dur-fast` 160 ms, `--dur` 320 ms, `--dur-slow` 900 ms, or the ms stated. Exits are faster than entrances.
- Reduced motion: read `reduceMotion` from `src/scripts/demo.ts` (scripts) and `@media (prefers-reduced-motion: reduce)`
  (CSS). Show the end state at once. No travel, no fade.
- No JavaScript: the server-rendered HTML is the finished, sensible state. Never hide content in CSS that only a
  script can reveal; arm hidden states from the script (the pattern `Numbers.astro` uses with `is-armed`).
- First view: `onFirstView(el, cb)` from `demo.ts`. It does nothing inside `[data-steps]` (the Process stepper starts
  its own demos), so anything that must play on first view inside the stepper hooks the demo's replay instead.
- Type (rule 4): mono only for codes (`2B-15`, `IDF-2`, `A-01`, `01`–`05`), standard names (`Cat 6A`, `TIA-606`),
  measurements and counts in a parts list, PASS/FAIL. Every sentence and label in plain words is Geist sans,
  sentence case. Text inside SVG drawings follows the existing `fitSvgText` sizing (≈ 9.5–12.5 px on screen, as
  every label in these drawings already is); text in HTML keeps the 13 px floor.
- Colour (rule 7): red (`--signal`) only on the one action and FAIL. Green (`--pass`) only on PASS. Ticks are ink,
  never green. New diagram marks are ink, steel or `--armak-blue`. No T568B colours outside the wire map (rule 6).
- Copy: no new Armak claim beyond the site and the ten owner-confirmed practices. Sample values carry the word
  "Sample". Any number without a source reads, in the build: "NUMBER: needs source (see
  ai/research/cable-plant-lifespan-sources.md) or owner's answer". That research file **does not exist yet**
  (checked 2026-10-30).
- Phone first: 375 px wide, no sideways scroll, 44 px touch targets, focus ring visible on every new control.
- No new photo, library or network call.

## Shared data (`src/data/content.ts`, built first, one builder)

```ts
/* ── Signature practices (ai/FATHER-CHECKLIST.md section A) ──
 * Drives features B7–B10. confirmed:
 *   'yes'       shown as an Armak default
 *   'sometimes' shown with "On some jobs" (B7, B9 only; B8 needs 'yes')
 *   'no' | null shown nowhere (not in the drawing, the sheet or the chart)
 * Owner confirmed all ten as defaults in chat on 2026-10-30 (relayed by the build coordinator). */
export type Answer = null | 'yes' | 'sometimes' | 'no';

export interface SignatureItem {
  confirmed: Answer;
  /** The checklist line this answers, for tracing the fact back. */
  checklist: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10';
  /** What Armak installs. Short; used in the drawing (B7), the sheet (B9) and the chart notes (B10). */
  label: string;
  /** One plain sentence on what it makes possible later. Used in B7's list and B9's sheet. */
  detail: string;
  /** B9 left column: the version that is enough for today. Describes an option, names nobody. */
  today: string;
}

export type SignatureKey =
  | 'cat6aDefault' | 'twoDropsPerAp' | 'spareFiberStrands' | 'emptyConduit' | 'rackHeadroom'
  | 'zoneCabling' | 'ceilingGridJacks' | 'identicalJacks' | 'openStandards' | 'labelsAndAsBuilts';

export const signature: {
  confirmedBy: 'owner' | null;
  confirmedOn: string | null; // ISO date
  /** Item 11, the owner's own words. null until he writes them. Not rendered anywhere yet. */
  inOwnWords: string | null;
  items: Record<SignatureKey, SignatureItem>;
} = {
  confirmedBy: 'owner',
  confirmedOn: '2026-10-30',
  inOwnWords: null,
  items: {
    cat6aDefault: {
      confirmed: 'yes', checklist: 'A1',
      label: 'Cat 6A for new drops',
      detail: 'Carries 10 Gb/s over the full 100 m, so faster equipment can use the same cable.',
      today: 'Cat 6, enough for today’s speeds',
    },
    twoDropsPerAp: {
      confirmed: 'yes', checklist: 'A2',
      label: 'Two cables to each Wi-Fi access point',
      detail: 'The second cable is already in place when it is needed.',
      today: 'One cable to each access point',
    },
    spareFiberStrands: {
      confirmed: 'yes', checklist: 'A3',
      label: 'Spare fiber strands in every backbone',
      detail: 'Unused strands run between the closets, ready to connect later.',
      today: 'Only the strands in use today',
    },
    emptyConduit: {
      confirmed: 'yes', checklist: 'A4',
      label: 'Empty conduit with pull strings',
      detail: 'New cable can be pulled through later without opening walls.',
      today: 'Conduit only where cable runs today',
    },
    rackHeadroom: {
      confirmed: 'yes', checklist: 'A5',
      label: 'Room to grow in the rack',
      detail: 'Rack space, power and cooling beyond what today’s equipment needs.',
      today: 'A rack sized for today’s equipment',
    },
    zoneCabling: {
      confirmed: 'yes', checklist: 'A6',
      label: 'Zone cabling in open offices',
      detail: 'Cables meet at a point in the ceiling, so desks can move with short new runs.',
      today: 'A separate run from the closet to every desk',
    },
    ceilingGridJacks: {
      confirmed: 'yes', checklist: 'A7',
      label: 'Jacks ready in the ceiling',
      detail: 'Cameras and access points can be added or moved without a new cable run.',
      today: 'Ceiling cables only where devices hang today',
    },
    identicalJacks: {
      confirmed: 'yes', checklist: 'A8',
      label: 'The same jack everywhere',
      detail: 'Any jack can serve a phone, a computer or a camera. The role is set at the switch.',
      today: 'Different jacks for different uses',
    },
    openStandards: {
      confirmed: 'yes', checklist: 'A9',
      label: 'Open standards by default',
      detail: 'No lock-in to one brand of equipment.',
      today: 'One brand’s system from end to end',
    },
    labelsAndAsBuilts: {
      confirmed: 'yes', checklist: 'A10',
      label: 'Labels at both ends, and drawings handed over',
      detail: 'Every cable is labeled to TIA-606 at the jack and at the panel, and you get drawings of what was installed.',
      today: 'Labels at the panel only',
    },
  },
};

export const isShown = (s: SignatureItem) => s.confirmed === 'yes' || s.confirmed === 'sometimes';
export const shownSignature = (keys: SignatureKey[]) =>
  keys.map((k) => ({ key: k, ...signature.items[k] })).filter(isShown);

/* ── Lifespans for B10 (and the "10 years" label in B7) ──
 * Numbers render only when years AND source are both set for BOTH rows.
 * Fill only from ai/research/cable-plant-lifespan-sources.md (not written yet) or the owner's answer. */
export interface Lifespan { years: number | null; source: string | null; sourceUrl: string | null }
export const lifespans: { cabling: Lifespan; devices: Lifespan } = {
  cabling: { years: null, source: null, sourceUrl: null },
  devices: { years: null, source: null, sourceUrl: null },
};
export const lifespansSourced =
  [lifespans.cabling, lifespans.devices].every((l) => l.years !== null && !!l.source);

/* ── Install phases: one source for the words the Install demo (B4 owner may adopt) and the job timeline (B6) show ── */
export const installPhases = [
  { id: 'prestaged', title: 'Pre-staged', detail: 'Panels, labels and parts prepared before arriving on site.' },
  { id: 'afterhours', title: 'After-hours install', detail: 'The noisy work happens while the office is closed.' },
  { id: 'cutover', title: 'Phased cutover', detail: 'Systems switched over in planned phases, so the business keeps running.' },
];
```

Notes on this data:
- `installPhases` copies the words already in `InstallDemo.astro` (`steps` array) exactly. The InstallDemo
  owner may switch to reading it; if not, the two copies must stay word-for-word equal.
- `cat6aDefault.detail` reuses figures already on the site (`src/components/plan/CableCompare.astro`: Cat 6A,
  10 Gb/s, 100 m channel). `labelsAndAsBuilts.detail` names TIA-606 because checklist item 10 does.
- If any item is later set to `null` or `'no'`, every feature below drops it with no other change. Each feature
  states what it renders when its items are gone.

---

## B1. Cutaway: a room's cables run back to its closet

**What the visitor sees.** Pick a room on the building drawing and its cable drops draw up into the ceiling, along
the tray and down the riser to the wiring closet that serves it. A note says what the room has, such as
"3 cable drops · 1 access point · to IDF-2".

**Exact behavior**
- Rooms with a route: Offices, Conference, Open office, Lobby. Break room, MDF and IDF-2 keep today's hover
  behaviour only (no drops are drawn in the break room; the closets are the destination).
- Routes, built at render time from the arrays already in `BuildingSvg.astro` (`desks`, `aps`, the three extra
  `bx-drop` paths), so counts can never drift from the drawing:
  - Offices (L3): drops at x 225, 330, 430 from y 232 up to the L3 tray (y 140); home run `H195 V326` to IDF-2.
  - Conference (L3): drop at x 615 from y 154 to y 140; home run `M615 140 H195 V326` to IDF-2.
  - Open office (L2): drops at x 305–705 from y 377 to the L2 tray (y 284); home run `M705 284 H195 V326` to IDF-2.
  - Lobby (L1): drops at x 300 (from y 455) and 512 (from y 526) to the L1 tray (y 429); home run `M512 429 H195 V465` to the MDF rack.
  - Count rule: "cable drops" = `bx-drop` paths whose x falls in the room box; "access points" = `aps` entries in
    the box. Offices 3 · 1, Conference 1 · 1, Open office 5 · 2, Lobby 2 · 1. The build computes these; this list is
    only the expected result for the reviewer.
- Markup: one `<g class="bx-route" data-route="{room}" aria-hidden="true">` per room, drawn after the layers and
  before `.bx-rooms`, outside every `.bx-layer` (so the existing once-per-layer draw-in never picks it up). Each
  holds a `drops` path (all drops as subpaths), a `home` path, and (≥ 640 px only) a callout: a 1px leader line
  plus two text lines.
- Controls: a row of four buttons under the drawing, inside the white sheet:
  `<div role="group" aria-labelledby="bx-rooms-label">`, label "Show a room’s cables:", buttons
  `aria-pressed="false"`: "Offices", "Conference", "Open office", "Lobby". Plus pointer hover on the existing
  `.bx-room` rectangles, gated by `(hover: hover) and (pointer: fine)` (a tap on a phone must not leave a route stuck).
- States: `idle` (no route) → `drawing` → `shown` (hover) or `pinned` (button pressed).
- Timing when a route starts: all layers dim to 0.22 (existing `[data-active]` dimming with no active layer, 160 ms
  `ease`); `drops` path draws by `stroke-dashoffset` 1 → 0, 240 ms, `--ease-out`; `home` path draws 0 → done at
  240–720 ms (480 ms, `--ease-out`); the callout fades in, opacity 0 → 1, at 720–880 ms. Total 880 ms.
  Use WAAPI (`el.animate`) on paths with `pathLength="1"`.
- Interruption: starting another route cancels the running animations (`animation.cancel()`) and starts fresh.
  Leaving a hovered room (not pinned): route and callout fade out, opacity 1 → 0, 160 ms `ease`, layers return to
  the base selection. Pressing the pinned button again, choosing a tab or a chip, or pressing Escape while a room
  button has focus clears the pin. A pinned route ignores hover on other rooms.
- Route style: ink stroke 3 (home) and 2 (drops) with a 4-unit white halo underneath (`paint-order`/duplicate path),
  so it reads over any lit layer. The room's box gets the existing dashed `.bx-room:hover` outline while shown.
- Sheet title (`[data-bx-layer-name]`, ≥ 640 px) reads `{ROOM} · TO IDF-2` (or `TO MDF`), uppercase like the other titles.
- A polite live line under the room buttons (visible, sans, `--text`) reads
  "Offices: 3 cable drops · 1 access point · runs to IDF-2." It is the phone version of the callout (SVG labels are
  hidden below 640 px) and the screen-reader announcement. Empty when idle.
- Reduced motion: route, dimming and callout appear at full at once; fade-out is instant.
- No JavaScript: the room buttons are not rendered visible (render with `hidden`, unhide in the script); no route
  shows; the drawing stays exactly as today, which is complete on its own.

**Data.** Reads nothing new from `content.ts`. Reads `desks`, `aps`, the extra drop list and `rooms` (adds
`closet: 'IDF-2' | 'MDF'` and `routed: boolean` to each room entry) inside `BuildingSvg.astro`.

**Copy.** Group label "Show a room’s cables:". Buttons "Offices", "Conference", "Open office", "Lobby".
SVG callout (sans, codes mono): line 1 "3 cable drops · 1 access point", line 2 "to IDF-2". Live line as above,
singular/plural handled ("1 cable drop"). No Armak claim: the counts describe the drawing, whose title already says
"TYPICAL COMMERCIAL BUILDING".

**Design rule served.** Rule 10 (the explorer layer drawing in; a cable traces). Rule 3: IDF-2 and MDF name real
closets in the drawing. Must not break rule 7: the route is ink, never red; the existing red active layer is
dimmed while a route shows.

**Files.** `BuildingSvg.astro` (routes, callouts, room data), `BuildingExplorer.astro` (buttons, live line, pin
logic, clearing on tab/chip). Same owner as B7 and the section A fixes; see "File ownership".

**Checks**
1. 1440 wide, mouse: hover Offices. Within about 0.9 s the drops rise, the run reaches IDF-2, the callout reads
   "3 cable drops · 1 access point / to IDF-2". Move to Lobby: the Offices route vanishes first, the Lobby route
   ends at the MDF rack.
2. 375 wide, touch: tap "Open office". The route draws, the live line reads "Open office: 5 cable drops · 2 access
   points · runs to IDF-2." Tap the drawing elsewhere: nothing sticks from hover. Page does not scroll sideways.
3. Keyboard only: Tab to the room buttons, Space on "Conference" pins it (`aria-pressed="true"`), Escape clears it,
   a tab change (arrow keys in the tab list) also clears it.
4. Reduced motion on: press "Lobby". Route and callout appear in one frame.
5. JavaScript off: the room buttons are absent and the drawing is unchanged from today.
6. Count audit: compare each callout with the drops visibly drawn in that room; they must match.

**Risk.** Looks like a gimmick if every room lights up with flowing lines (the old endless `bx-flow` look).
Constraint: one route at a time, drawn once, then still; no looping dash.

---

## B2. Design step draws itself; a labeled jack opens in the trace demo

**What the visitor sees.** In step 02 the floor plan is drawn as you watch: walls first, then the jacks snap into
place, the Wi-Fi, cameras and cable routes follow, and the parts list totals up beside it. Four jacks carry labels,
and tapping one jumps to step 03 with that same jack's cable traced.

**Exact behavior**
- Trigger: the existing design run (stepper replay or `onFirstView` outside the stepper). Sequence, each piece
  ≤ 900 ms:
  1. Walls (`.plan__wall` inside this demo only, found by the DesignDemo script; `OfficePlan.astro` is not edited):
     `stroke-dashoffset` from full length to 0 using `getTotalLength()`, 600 ms, `--ease-out`, the four wall paths
     staggered 60 ms. Room labels fade in, opacity, 320 ms, starting at 300 ms.
  2. Drops snap: each drop starts at `translate(3px, 3px)` with opacity 0 and lands at its spot, 160 ms,
     `--ease-out`, staggered 30 ms (12 drops: 490 ms total). Replaces today's `scale(0)` pop.
  3. Wi-Fi coverage scale 0.9 → 1 plus opacity (not 0.15 → 1), 600 ms, `--ease-out` (today: 1.1 s).
  4. Cameras, as today, opacity 320 ms.
  5. Routes `stroke-dashoffset` 1 → 0, 900 ms, `--ease-in-out` (today: 1.2 s).
  6. Counts in the parts list keep counting up in step with each layer (existing `countUp`).
  7. When "Plan ready" shows, the four linked jacks show their codes (mono, paper chip like the trace demo's
     labels), opacity 0 → 1, 160 ms, staggered 40 ms.
- Linked jacks: four drops get an overlaid `<a class="ds__jack" href="#trace" data-jack="2B-15">` (44 px target,
  same overlay technique as `.tr__jacks` in TraceDemo). Mapping (design drop → trace jack):
  (100, 72) → 2B-15, (176, 72) → 2B-14, (300, 84) → 2C-03, (206, 166) → 2A-07. B3 moves the trace jacks to these
  exact points, so it is literally the same jack on the same plan. The other eight drops stay unlabeled and
  inert. No words or counts in either demo change.
- Click or Enter on a linked jack (with JS): `preventDefault()`, then
  `document.dispatchEvent(new CustomEvent('armak:trace', { detail: { jack: '2B-15' } }))`.
  - `Process.astro` listens: `takeOver()`, selects the panel that contains `[data-demo="trace"]` (step 03), the same
    way `openCertify` opens step 04.
  - `TraceDemo.astro` listens: on the next animation frame scrolls `#trace` into view (`block: 'nearest'`, smooth
    unless reduced motion), lights that jack (B3's sequence) and moves focus to its jack button.
- Interruption: replaying the design demo cancels the run (existing `createRun`); jack codes hide on reset.
- Reduced motion: the finished plan as server-rendered today, plus the four jack codes visible; links work; the
  trace lights without drawing.
- No JavaScript: finished plan with the four codes; each link jumps to `#trace` (the stepper is stacked without JS,
  so the trace demo is on the page). The trace stays unlit, which is its own no-JS state (B3).

**Data.** None from `content.ts`. A `linked` list in `DesignDemo.astro`: `{ id: '2B-15', x: 100, y: 72 }` × 4.

**Copy.** Hint after the run (replaces "Tap a layer to highlight it." only once the plan is ready, two short lines):
"Tap a layer to highlight it." / "Tap a labeled jack to trace its cable in step 03." Jack codes: `2B-15`, `2B-14`,
`2C-03`, `2A-07` (already sample data on the site; the frame's "Sample" tag covers them).

**Design rule served.** Rule 10 (the demos: a step advances). Rule 1 / step 02's promise "price the job from that
drawing": the drawing visibly comes first. Rule 4: jack codes in mono, hint in sans.

**Files.** `DesignDemo.astro` (owner: B2). Listener in `TraceDemo.astro` (built by the B3 owner from this spec).
Listener in `Process.astro` (built by the Process owner from this spec).

**Checks**
1. 1440 wide: open step 02. Walls draw before any jack appears; no single piece runs longer than 0.9 s; the parts
   list ends at 12 / 3 / 3 / 15 / 1 as today.
2. 1440: click `2C-03` on the design plan. Step 03 opens, the page scrolls to the trace demo, jack `2C-03` traces and
   its button has focus.
3. 375, touch: tap `2A-07`. Same result; the tap target does not overlap a neighbour's (no other linked jack within 44 px).
4. Keyboard: Tab reaches the four jack links after the legend chips; Enter on `2B-14` behaves as the click.
5. Reduced motion: step 02 shows the finished plan at once with codes visible.
6. JavaScript off: the stacked page shows the plan with codes; clicking a code jumps to the trace demo.

**Risk.** Turning into a slow "watch it build" film. Constraint: no piece over 900 ms and total under about 4 s
(shorter than today's 4.85 s), and every step is a real drafting order (walls, devices, routes).

---

## B3. Trace runs jack → ceiling → closet; one record row writes itself

**What the visitor sees.** Choose a jack and its cable climbs into the ceiling, runs along the main route and drops
into the closet, while three words under the plan light in turn: up the wall, across the ceiling, into the closet.
When it lands, the patch-panel port lights and a one-row record fills in: jack, panel, port, PASS, marked Sample.

**Exact behavior**
- Jack positions move to the design demo's drops (see B2): 2B-15 (100, 72), 2B-14 (176, 72), 2C-03 (300, 84),
  2A-07 (206, 166). Ports unchanged (B-15, B-14, B-03, B-07).
- Routes follow the design demo's own trunk (`TRUNK_Y = 128`, rack at x 73): each route is three paths, all
  `pathLength="1"`: branch `M{x} {y} V128`, trunk `M{x} 128 H73`, closet `M73 128 V62`.
  e.g. 2B-15: `M100 72 V128` · `M100 128 H73` · `M73 128 V62`.
- Sequence on choosing a jack (WAAPI, `--ease-out` for each leg): branch 0–120 ms, trunk 120–560 ms, closet
  560–700 ms. The word line under the plan has three spans; each goes opacity 0.4 → 1 (160 ms `ease`) as its leg
  starts. At 700 ms the port lights (this is section A item 8, which must hook into this arrival, not fire at
  click time). The record row reveals with `clip-path: inset(0 100% 0 0)` → `inset(0)`, 200 ms, `--ease-out`,
  700–900 ms.
- Only one jack lit at a time (as today). Choosing another: the old route and row fade out, opacity, 120 ms; then the
  new sequence starts. Pressing the lit jack again clears (as today). Replay clears.
- Record: a small table under the patch-panel strip, rule-5 hairlines between header and row.
  Columns: Jack · Panel · Port · Result. Row values mono: `2B-15` · `IDF2-B` · `B-15` · `PASS` (PASS in `--pass`).
  Empty row before any trace shows "—" in each cell.
- Reduced motion: route, words, port and row appear at once.
- No JavaScript: server-render jack 2B-15 already traced (route drawn, port B-15 lit, row filled, the existing
  `tr__line` text for 2B-15). The script clears it on start. That way the no-JS plan shows a real example instead of
  "Choose a jack" with buttons that do nothing.
- Listens for `armak:trace` (B2) and also gives the `.tr` wrapper `id="trace"` (no DemoFrame change).

**Data.** None from `content.ts` except one gate: the record's title reads "Handover record" when
`signature.items.labelsAndAsBuilts` is shown (confirmed 2026-10-30), otherwise "Test record". Jack data stays in
`TraceDemo.astro`.

**Copy.** Word line: "Up the wall · across the ceiling · into the closet". Record title "Handover record" with a
"Sample" tag beside it in the same style as the frame's tag. Column heads "Jack", "Panel", "Port", "Result".
Existing line kept: "Jack 2B-15 lands on port B-15. Matching labels mean anyone can find it in seconds."
No test date (see "Cannot be done truthfully").

**Design rule served.** Rule 1 / step 04: "tested and documented … You get the reports" made visible as one record
row. Rule 5: hairlines only between record rows. Rule 7: PASS is the only green. Rule 4: values in mono, words in sans.

**Files.** `TraceDemo.astro` (owner: B3; also builds section A item 8 and the B2 listener).

**Checks**
1. 1440: click 2B-14. The line climbs, runs left along y 128, rises into the closet; the port lights only as the line
   arrives (not at the click); the row fills last. Whole thing ≤ 0.9 s.
2. 375, touch: tap 2A-07, then 2C-03 quickly. The first trace clears, the second plays from its start, never two routes at once.
3. Keyboard: Tab to a jack, Space lights it; the record row is read by the live region ("Jack 2A-07 lands on port B-07…").
4. Reduced motion: everything appears in one frame.
5. JavaScript off: 2B-15 shows traced with a filled row.
6. Check that every route stays inside the plan's walls or crosses them only where the design demo's routes do.

**Risk.** A typing effect in the record would read as a gimmick. Constraint: the row is revealed by one clip wipe,
like ink drawn across a form, never letter by letter.

---

## B4. Closet slider callouts on the "after" side

**What the visitor sees.** As you drag the closet slider toward "After", short notes with leader lines appear on the
tidy side, pointing at the bundles, the short patch cords and the labels. They are part of the after drawing, so they
come into view exactly as the slider uncovers them.

**Exact behavior**
- No new animation. Callouts live inside the existing `in__after` clip group, in the empty left margin of the
  400 × 215 drawing (x 8–112), so the slider's own wipe reveals them. They show when the slider is below about 25%
  (fully "After"), during the auto-sweep's pause at 0, and whenever the visitor drags there.
- Three callouts (text + 1px ink leader line ending in a 2-unit dot):
  1. y ≈ 10–22: "Dressed in bundles" → the first cable tie at (136, 12).
  2. y ≈ 62–74: "Short patch cords" → a cord at (137, 72).
  3. y ≈ 92–104: "Labeled at both ends" → the `A-01` label end at (116, 34) is already taken by the label itself, so
     this leader points to the first patch-panel port (133, 35) from below. Wording depends on
     `labelsAndAsBuilts`: shown → "Labeled at both ends"; not shown → "Every port labeled" (pillar wording already on the site).
- Text: Geist sans, sentence case, two lines where needed, `fitSvgText` sizing as the existing labels, the paper halo
  the drawing's other text uses.
- Section A item 2 (slider follows the finger) changes `setSplit`; B4 needs nothing from `setSplit`.
- Reduced motion: no auto-sweep (as today); callouts appear when the visitor drags.
- No JavaScript: slider at 50; the left margin shows the "before" side, so the callouts are hidden by the clip, which
  is correct (the before half is meant to show there).

**Data.** Reads `signature.items.labelsAndAsBuilts` for callout 3's wording.

**Copy.** "Dressed in bundles", "Short patch cords", "Labeled at both ends" (or "Every port labeled").

**Design rule served.** Rule 10 (the demos). Pillar "Built to standard: every port labeled". Rule 4 (sans for words).

**Files.** `InstallDemo.astro`. Order: section A item 2 first, then B4, then B8.

**Checks**
1. 1440: drag the slider fully to "After". All three callouts are readable and no leader crosses `A-01` or another text.
2. 375: same drag with a thumb. Text does not touch the rack rail; nothing scrolls sideways.
3. Keyboard: focus the slider, press Home/End (or arrow to 0). Callouts appear at 0, disappear at 50.
4. First view with motion on: during the sweep's pause at 0 the callouts are visible, then clip away as it returns to 50.
5. Set `labelsAndAsBuilts.confirmed = null` in a scratch build: callout 3 reads "Every port labeled".

**Risk.** Callouts crowding a small drawing. Constraint: three at most, all in the empty left margin, none on the right
label column.

---

## B5. Cable test gauges fill as the report prints

**What the visitor sees.** The length bar and the three margin meters already in the cable test fill from the left at
the moment each check passes, ending at the sample reading, with the standard's limit marked. A failing cable leaves
them empty and faded.

**Exact behavior**
- Most of this exists: `.ct__bar`, `.ct__bar-fill`, the limit tick, the red-tinted zone below the limit (the FAIL
  zone) and the green-tinted zone above it. The work is to make the fill obey the motion rules and land with the reading.
- Change `.ct__bar-fill` from animating `width` (a layout property) to `width: 100%; transform: scaleX(0);
  transform-origin: left`. On `[data-state='pass']`: `transform: scaleX(var(--pos))`, 480 ms, `--ease-out`.
  Radius stays visually right by keeping the fill inside a clipped track (`overflow: hidden` on `.ct__bar`, limit
  tick moved out of the clipped box or given its own wrapper).
- The value text (`[data-ct-value]`) swaps from "Testing…" to the reading at the same instant the fill starts.
- Running state: the track shows no fill (no fake sweeping progress).
- Fail mode: rows go to `skip`, fill stays at `scaleX(0)`, bar opacity 0.35 (as today).
- Interruption: each run calls `reset()` first, which sets the fill to `scaleX(0)` with transitions off (`ct--instant`).
- Reduced motion: `showFinal()` sets the end state with no transition (as today).
- No JavaScript: the server-rendered passing report shows bars filled at their readings (as today).

**Data.** None new. Uses the existing sample readings (47.2 m against the 90 m limit; +5.8, +12.3, +4.1 dB margin),
already under the "Sample" tag.

**Copy.** No new words. Existing: "limit 90 m", "limit", "Margin = how far the cable beats the standard’s limit.
Above zero passes."

**Design rule served.** Rule 1 (the report beside the promise), rule 7 (green fill only on PASS; red only in the
FAIL zone), rule 4 (readings in mono).

**Files.** `CableTest.astro`. Order: section A item 1 (press feedback), item 6 (unfold), then B5, then item 10
(sliding mode highlight) last.

**Checks**
1. 1440: Run test on "Passing". Each bar fills only after its row stops saying "Testing…", ends at its tick; none
   takes longer than 0.5 s.
2. Switch to "Failing": bars stay empty and faded; the stamp says FAIL in red.
3. 375: bars fit the row, the "limit 90 m" caption does not clip; nothing scrolls sideways.
4. DevTools Performance: no layout events from the bars during a run (transform only).
5. Reduced motion: the report appears finished at once.

**Risk.** A gauge that moves while "Testing…" pretends to measure. Constraint: the fill moves only to show a result
already reached.

---

## B6. Job timeline above the five steps

**What the visitor sees.** A thin strip above the five steps shows one job from start to finish: 01 to 05 in order,
with the install part hatched where noisy work can happen after hours, a stepped edge where systems switch over in
phases, and an open end after 05 for support. The step you are looking at is marked on the strip.

**Exact behavior**
- New component `src/components/process/JobTimeline.astro`, placed in `Process.astro` between `<SectionHead>` and
  `<div class="steps" data-steps>` (outside `[data-steps]`, so `onFirstView` works).
- Layout: one row of five segments with the step codes in mono under each (`01`–`05`). Widths 1 : 1 : 2 : 1 : 1
  (03 is wider only to fit its three parts); a caption says "Not to scale." Segment 03 splits into three equal parts
  from `installPhases`: pre-staged (plain), after-hours install (45° hatch, the drawing's own `bx-hatch` style in
  ink at low contrast), phased cutover (a three-step stair edge). Segment 05 ends in an open arrow.
- Active step: the segment matching the selected tab gets a 3px ink bar along its top; others have a 1px
  `--hairline-strong` top line. It follows `aria-selected` on `[data-steps] [role="tab"]` via a MutationObserver
  (no edit to Process.astro's script). The change is instant: section A item 10 (sliding tab highlight) already
  animates the selection, and two moving markers for one state would be noise.
- One motion: on first view the hatch reveals left to right, `clip-path: inset(0 100% 0 0)` → `inset(0)`,
  480 ms, `--ease-out`. Once.
- Legend under the strip (sans, 13px floor, `--text`): hatch swatch + "Noisy work can be scheduled after hours";
  stair swatch + "Cutover in planned phases"; arrow + "We stay available after the job is done."
- 375: the strip spans the content width (no scroll); the legend stacks in three rows.
- Reduced motion: hatch shown at once. No JavaScript: full strip and legend, no active marker (the stepper is stacked
  without JS, so there is no single active step).
- Accessibility: `<figure aria-labelledby>` with a visually hidden caption "How the five steps fit one job"; the codes
  and legend are real text. Not focusable (it is not a control).

**Data.** `process` (codes and titles) and `installPhases` from `content.ts`.

**Copy.** Codes `01`–`05`. Legend lines above (each one is already on the site: the pillar "Cutover-ready" and step 05).
"Not to scale." Hidden caption "How the five steps fit one job." No durations, dates or day counts.

**Design rule served.** Rule 3 (step codes 01–05 are real), Direction A ("schedule rows fill in": a schedule strip of
the closeout package), pillar "Cutover-ready" made visible. Bends nothing.

**Files.** New `JobTimeline.astro` (owner B6). One import + one tag in `Process.astro` (Process owner places it).

**Checks**
1. 1440: scroll to "How every job runs." The hatch wipes in once; the marker sits on 01; clicking tab 03 moves the
   marker to 03 instantly.
2. Auto-advance (do not touch): the marker follows each step change.
3. 375: no sideways scroll; codes do not overlap; legend readable at ≥ 13px.
4. Reduced motion: hatch present at load, nothing moves.
5. JavaScript off: the strip and legend show, no marker.

**Risk.** A strip that just repeats the tab list. Constraint: it shows only what the tabs cannot: the order in time,
where after-hours work and phased cutover sit, and that support has no end. No step names repeated on the strip.

---

## B7. "Today / Years from now" switch on the cutaway

**What the visitor sees.** A two-way switch above the building drawing. "Years from now" slides the desks to new
spots and dims the devices, while the cabling in the walls and ceilings stays lit and unchanged, and marks the
built-for-later pieces Armak puts in: spare fiber, empty conduit, ceiling jacks, a zone point, two cables to each
access point, Cat 6A.

**Exact behavior**
- Control: `<fieldset class="bx-when">` with two radio inputs, styled like the cable test's Passing/Failing switch
  (ink selected state, no red): "Today" (checked) and "Years from now". Visually hidden legend "Show the building".
  Right-aligned above the drawing inside the white sheet; full width on 375. Rendered `hidden`; the script unhides it.
- "Years from now" state (`svg.bx` gets `data-when="later"`):
  - Desk groups (`.bx-furn` desk `<g>`s, given `data-desk`) move `translateX(16px)` (SVG units), 600 ms,
    `--ease-in-out`. Every desk stays in its room and its drop still lands on the desk top (checked: L3 and L2 right
    edges stay inside the walls at +16).
  - Every `.bx-layer` except `structured-cabling` goes to opacity 0.22; `structured-cabling` goes to 1 in ink
    (not the red active colour), 320 ms `ease`. The tabs keep their selection but the drawing shows this view.
  - Signature marks (`<g class="bx-later" aria-hidden="true">`, server-rendered only for shown items) fade in,
    opacity, 160 ms each, staggered 60 ms, starting at 300 ms (six marks end by 820 ms):
    - `cat6aDefault`: mono `Cat 6A` tag on the L3 tray near x 560.
    - `twoDropsPerAp`: a second short drop line beside the AP at (400, 274) with a leader.
    - `spareFiberStrands`: a leader on the riser at about y 380.
    - `emptyConduit`: a dashed line parallel to the riser at x 205, y 465 → 140, with a small loop at the top for the pull string.
    - `zoneCabling`: a small box on the L2 tray at x 480 with a leader.
    - `ceilingGridJacks`: three small squares just under the L2 ceiling at x 300, 500, 680.
    - Not drawn (nothing to point at in a section view): `rackHeadroom` (that is B8), `identicalJacks`,
      `openStandards`, `labelsAndAsBuilts`.
    - SVG text for the marks shows ≥ 640 px only (like all `bx` labels); on phones the list below carries it.
  - Sheet title reads `YEARS FROM NOW · CABLING STAYS`.
  - Under the drawing, a short caption and a list (HTML, sans): caption, then one line per shown drawn item:
    `label` and, after a dash, `detail`. Items with `confirmed: 'sometimes'` get " On some jobs." appended.
- Back to "Today": everything returns, desks with the same 600 ms `--ease-in-out`, marks fade out 120 ms, list hides.
  Transitions (not keyframes), so flipping fast retargets from where things are.
- Choosing a tab, a chip or a room (B1) while in "Years from now" sets the switch back to "Today" first. Room hover is
  ignored in "Years from now".
- Arrow keys move between the two radios (native). The live region says "Years from now: the cabling stays." or "Today."
- Reduced motion: state swaps at once.
- No JavaScript: switch absent; drawing shows today, complete as now.
- All signature items null or 'no': the generic version only. Desks move, devices dim, cabling stays, the caption shows,
  no marks and no list. Still true for any building.

**Data.** `shownSignature(['cat6aDefault','twoDropsPerAp','spareFiberStrands','emptyConduit','zoneCabling','ceilingGridJacks'])`
and `lifespans` (label only, see copy).

**Copy.**
- Switch: "Today" · "Years from now". If and only if `lifespansSourced` and `lifespans.cabling.years >= 10`, the second
  option reads "10 years from now". Until then: NUMBER: needs source (see ai/research/cable-plant-lifespan-sources.md)
  or owner's answer.
- Caption (generic, always in this state): "Desks move and devices get replaced. The cabling in the walls and ceilings stays."
- List heading: "Put in on day one for later:" then each item, e.g. "Empty conduit with pull strings. New cable can be
  pulled through later without opening walls."
- In-drawing marks: the `label` shortened only where it must fit: "Cat 6A", "2 cables per access point", "Spare fiber",
  "Empty conduit", "Zone point", "Ceiling jacks".

**Design rule served.** Rule 1: shows what the headline "Built for the future." means. Rule 10 (a state change the
visitor asks for). Rule 7: cabling in ink, no red. Rule 4: `Cat 6A` mono, the rest sans.

**Files.** `BuildingSvg.astro` (desk hooks, marks, later styles), `BuildingExplorer.astro` (switch, caption, list,
resets). Same owner as B1; B1 first.

**Checks**
1. 1440: flip to "Years from now". Desks slide right, devices fade, the cabling layer is the only strong layer, six marks
   appear within 0.9 s, the list shows six items.
2. Flip back and forth three times fast: no jumps, desks reverse from wherever they are.
3. 375, touch: tap "Years from now". Marks' text is hidden, the list under the drawing carries all six; no sideways scroll.
4. Keyboard: Tab to the switch, arrow to "Years from now", then Tab into the tab list and choose a tab: the switch resets to "Today".
5. Scratch build with every item `null`: no marks, no list, the caption still shows.
6. JavaScript off: no switch; the drawing is today's.

**Risk.** A "future" animation full of sparkle reads as marketing. Constraint: what changes is only what really changes
in a building (desks, devices); the cabling does not move at all, and nothing glows, pulses or loops.

---

## B8. Rack headroom drawn in the closet "after" view

**What the visitor sees.** On the tidy side of the closet drawing, the empty rack space between the switch and the
battery unit is outlined with a dashed box and labeled "room to grow".

**Exact behavior**
- Rendered only when `signature.items.rackHeadroom.confirmed === 'yes'` (confirmed 2026-10-30). `'sometimes'`, `'no'` or
  `null`: nothing is drawn (the drawing has no room for a qualifier; B9 carries "On some jobs" if it ever changes).
- Inside the existing `in__after` clip group: dashed rect x 132, y 134, w 136, h 22, `--steel` stroke 1.25, dash 4 3,
  no fill. Label in the right label column at (284, 143), single line, sans, `fitSvgText` sizing, paper halo.
- No new animation. The slider's wipe reveals it like everything else on the after side.
- No JavaScript / reduced motion: visible on the after half at the resting 50% split (the box's right part and the label).

**Data.** `signature.items.rackHeadroom`.

**Copy.** "Room to grow". No rack-unit count (none is sourced).

**Design rule served.** Rule 1 ("Built for the future." made concrete in the closet). Rule 10 (the demo). Rule 5 not
touched (the dashed box is a drawing mark, not a section rule).

**Files.** `InstallDemo.astro`, after B4.

**Checks**
1. 1440 at rest (50%): the label is readable and does not touch "ports 1–12" above or "AFTER" below.
2. 375 at rest: same check at phone label size (`--u` 1.25); if it touches, move the label baseline, never shrink below the other labels.
3. Drag fully to "After": the whole dashed box shows between the switch and the UPS.
4. Scratch build with `rackHeadroom.confirmed = 'sometimes'`: nothing is drawn.

**Risk.** Filler that looks like a missing device. Constraint: dashed outline and the label only, inside space that is
already empty in the drawing.

---

## B9. "Enough for today / What Armak installs" sheet

**What the visitor sees.** A short schedule sheet below the Principles: each row sets the version that is enough for
today beside what Armak installs instead, with a tick. It shows only practices the owner has confirmed.

**Exact behavior**
- New component `src/components/process/RoomForLater.astro`, placed in `Process.astro` after `.pillars`.
- Rows: every `shownSignature(all ten keys)` item, in the order of the type. A white sheet with a hairline edge
  (Direction A), a table: `<table>` with `<caption>` (the heading), header row, one row per item; rule-5 hairlines between rows.
- Columns: "Enough for today" (`today`, `--text`) · "What Armak installs" (`label` in weight 600, `detail` under it in
  `--text`) · a mark cell: an ink ✓ with visually hidden "Yes" for `'yes'`; the words "On some jobs" for `'sometimes'`.
- Render nothing at all (no heading, no wrapper, no space) when fewer than 3 rows are shown. One or two rows read as an
  empty template, the same reason the About milestones stay hidden. With today's data: 10 rows.
- 375: the table becomes stacked rows (like `CableCompare.astro` under 900 px): each row a block with
  "What Armak installs" first, then "Instead of: {today}" in `--text` (not grey; rule 9).
- Motion: none beyond the site's existing "schedule rows fill in" reveal if the Process owner already applies it to
  this section; this sheet adds no animation of its own.
- No JavaScript / reduced motion: identical (static).

**Data.** `signature.items` via `shownSignature`.

**Copy.** Heading (h3, sans): "Built for later, not just for today." Column heads as above. Mono only for `Cat 6A` and
`TIA-606` inside the text. No "most installers" anywhere (see cuts).

**Design rule served.** Rule 5 (hairlines separate schedule rows), rule 7 (ticks in ink, never green: they are not PASS),
rule 1 (the headline's promise, itemized). Bends nothing.

**Files.** New `RoomForLater.astro` (owner B9). One import + one tag in `Process.astro`.

**Checks**
1. 1440: ten rows, three columns, ticks ink, no green or red on the sheet.
2. 375: stacked rows, no sideways scroll, every line ≥ 13px.
3. Scratch build with eight items `null`: the sheet disappears completely and the Process section ends at Principles with no gap.
4. Scratch build with one item `'sometimes'`: that row shows "On some jobs" instead of the tick.
5. Screen reader: the table reads with its caption and column heads.

**Risk.** Competitor-bashing "us vs them" tables are a stock pattern. Constraint: the left column describes an option,
never a company or "most installers", and every right-column row is an owner-confirmed practice.

---

## B10. One cable plant, several device generations

**What the visitor sees.** A small chart on the About page: one long bar for the cabling in the walls, and below it a
row of shorter bars for the switches, access points and cameras that get replaced over the same span. It carries no
years until a source is cited.

**Exact behavior**
- New component `src/components/pages/CablePlant.astro`, placed in `src/pages/about.astro` inside the story sheet,
  directly after `.story__body`, next to the "Our standard" item whose text already says the work "stays reliable and
  easy to maintain for years". Not under the "28" in `Numbers.astro` (see cuts).
- Two labeled rows (HTML, not SVG, so text stays at the 13px floor):
  1. "Cabling in the walls and ceilings": one bar, full width, ink.
  2. "Switches, access points and cameras": three bars with 8px gaps, `--steel` outline 1.5px, no fill, together the same
     total width. Three is an illustration, not data (caption says so).
  - Under row 1, when shown, the confirmed cabling practices as small notes: `shownSignature(['cat6aDefault','spareFiberStrands','emptyConduit'])`
    labels joined by " · ". Hidden when none are shown.
- With sources (`lifespansSourced`): bar lengths follow `lifespans.cabling.years` and `lifespans.devices.years`; the device
  row gets `floor(cabling / devices)` bars; a mono axis shows 0 and the cabling years; a source line under the chart reads
  "Source: {source}" linked to `sourceUrl`. Without sources: no axis, no numbers, caption "Not to scale."
- Motion: on first view (`onFirstView`, threshold 0.35), bars grow `transform: scaleX(0.001 → 1)`,
  `transform-origin: left`: cabling bar 600 ms `--ease-out`; device bars 240 ms each, staggered 80 ms, starting at
  300 ms (ends at 780 ms). Armed from the script only (`is-armed`), so without JS or with reduced motion the bars are full.
- Not interactive.

**Data.** `lifespans`, `lifespansSourced`, `shownSignature([...])`.

**Copy.** Heading (h3, sans): "Devices come and go. The cabling stays." Row labels as above. "Not to scale." With
sources only: axis "0" and "{n} years" (NUMBER: needs source (see ai/research/cable-plant-lifespan-sources.md) or
owner's answer), "Source: …".

**Design rule served.** Rule 9 (text sized and coloured to be read: real labels, not a legend), rule 4 (mono only for the
years once sourced), the About sentence "stays reliable and easy to maintain for years" made visible. Rule 10 extended:
a short one-time draw.

**Files.** New `CablePlant.astro` (owner B10). One import + one tag in `src/pages/about.astro` (other agents are editing
that page now; the B10 builder adds only these two lines, after their work is committed).

**Checks**
1. 1440, About page: the chart sits under the story list inside the sheet; bars grow once in under 0.8 s; no numbers anywhere.
2. 375: rows fit, labels wrap cleanly, no sideways scroll.
3. Reduced motion and JavaScript off: bars full at load.
4. Scratch build with both lifespans filled and sourced: axis, proportional bars, and the source line appear.
5. Scratch build with the three cabling practices `null`: the note line under row 1 disappears, nothing else changes.

**Risk.** Unlabeled grey bars are the classic fake chart. Constraint: every bar is named in words, the chart says
"Not to scale" until it has a cited source, and the number of device bars is never presented as a measurement.

---

## File ownership (one owner per file; order inside each)

| File | Owner (one builder) | Order of work |
|---|---|---|
| `src/data/content.ts` | Data builder | Shared data, first, before anything else |
| `src/components/home/BuildingSvg.astro` + `BuildingExplorer.astro` | Cutaway builder | A rule fix (stop `bx-flow`/`bx-pulse` loops) → B1 → B7 → A10 (explorer tab highlight) last. B7 must not break B1's route layer or its clear-on-tab logic. |
| `src/components/process/DesignDemo.astro` | Design builder | B2 |
| `src/components/process/TraceDemo.astro` | Trace builder | B3 (new jack positions and routes) → A8 (port lights on arrival, hooked into B3's 700 ms point) → B2's `armak:trace` listener |
| `src/components/process/InstallDemo.astro` | Install builder | A2 (slider follows finger) → B4 → B8 |
| `src/components/ui/CableTest.astro` | Cable test builder | A1 → A6 → B5 → A10 (mode highlight) last |
| `src/components/home/Process.astro` | Process builder | A5 (step tick) → B2 listener (`armak:trace` opens step 03) → place `<JobTimeline />` and `<RoomForLater />` → A10 (tab highlight) last |
| `src/components/process/JobTimeline.astro` (new) | B6 builder | B6 |
| `src/components/process/RoomForLater.astro` (new) | B9 builder | B9 |
| `src/components/pages/CablePlant.astro` (new) | B10 builder | B10 |
| `src/pages/about.astro` | B10 builder, after the other agents' current edits are committed | two lines only |
| `src/components/process/OfficePlan.astro`, `DemoFrame.astro`, `src/scripts/demo.ts` | not touched by B features | (DemoFrame belongs to A1) |

`ai/DESIGN.md` rule 10 must be updated (by whoever owns that file in the run) to name the B motions: room route draw,
design-plan draw, trace legs and record wipe, gauge fill, timeline hatch, the Today/Years switch, the cable-plant bars.

## Noticed while reading (not part of B; each needs the owner's yes before anyone changes it)

- `BuildingSvg.astro`: the active layer is drawn in `--signal` red, and the light cone uses `--t568-orange` (rules 7 and 6).
- `DesignDemo.astro`: cameras use `--signal` red and cable routes use `--t568-orange` (rules 7 and 6).
- `InstallDemo.astro`: the "BEFORE" tag is red and the tangled cables use T568B colours (rules 7 and 6); the plain-word
  notes ("no labels · no slack management", "dressed · labeled · tested") are in mono (rule 4).
- `src/components/process/DesignDemo.astro` and others run single animations over 900 ms today (cover 1.1 s, routes
  1.2 s); B2 brings DesignDemo under the limit.

## Cannot be done truthfully (cut or held back, with the reason)

1. **"10 years from now" as the switch label (B7).** It states how long cabling lasts. No source exists yet
   (`ai/research/cable-plant-lifespan-sources.md` is missing) and the owner's confirmation covers practices, not
   lifespans. Ships as "Years from now"; switches to "10 years" only when `lifespans` is sourced.
2. **Years, lifespans or a ratio in the cable-plant chart (B10).** Same reason. Bars ship unnumbered, marked
   "Not to scale"; the three device bars are an illustration, not a count.
3. **Placing B10 under the "28 years in business" figure.** Next to the 28, a cable-lifespan chart reads as "our 1998
   installs are still in service", which nobody has confirmed. Moved to the About story sheet, beside the existing
   "stays reliable … for years" sentence.
4. **A "Most installers" column (B9).** The owner confirmed what Armak does, not what other installers do, and item 11
   (his own words) is unanswered. The left column describes the enough-for-today option and names nobody. A competitor
   column needs its own explicit owner yes plus item 11.
5. **A test date in the trace record row (B3).** Any date would be invented. The row shows Jack, Panel, Port and Result
   (PASS) under "Sample".
6. **Rack-unit counts or power/cooling figures in B8.** None are sourced; the drawing shows the space and the words
   "Room to grow" only.
7. **"On some jobs" inside the closet drawing (B8).** There is no room for a qualifier in that drawing, so a
   `'sometimes'` answer draws nothing there (B9 shows it instead).
8. **Signature marks for identical jacks, open standards and labels/as-builts in the cutaway (B7).** A building section
   has nothing honest to point at for them; they appear in B9 (and labels in B3 and B4) instead.
9. **Linking every design-plan jack to the trace demo (B2).** Only four jacks exist in the trace demo; labeling or linking
   the other eight would invent jacks. Four are linked and labeled; eight stay plain.
