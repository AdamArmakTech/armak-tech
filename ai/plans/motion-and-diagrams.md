# Motion and diagram features: approved list, order of work, gating

Written 2026-10-30 15:20 so nothing is lost across a context reset. Owner approvals quoted below.

## Owner decisions (2026-10-30)
- Ten extra animations: owner chose **"All ten (Recommended)"**.
- Ten diagram features: owner said **"All of them, also what is 7-10"** (7–10 depend on facts the owner confirms himself; see gating).
- Direction A ("the closeout package") is the look. Pages end light. Paperwork animations already built (commit 11921ed).
- /contact/ keeps no dark band (commit 401b891).

## Order of work
1. Wait for the checking run `wf_2dfb48fa-ed2` (find → verify → fix → build, up to 3 rounds, then regression + screenshots + proofreader). Its fixes sit uncommitted in 16 files until reviewed and committed.
2. One combined build run: the ten animations + the ten diagram features + the two rule fixes, **grouped by file so each file has one owner**. Sonnet builders, Opus checkers (refuters) and one Opus proofreader. Rough size: about 20 builders, 15–20 checkers, 1 proofreader, 2–3 hours.
3. `npx astro check` 0 errors, `npm run build`, `reports/redesign/cta-handoff.test.mjs`, phone screenshots in parts (≤7000 CSS px per image), then push `intent-redesign` so the preview link updates. Production only on the word "publish".

## A. Ten animations (approved "All ten")
Rule 10 of ai/DESIGN.md must be updated to name these. Limits: ≤900 ms, transform/opacity/clip-path/stroke only, reduced-motion and no-JS end in the final state.
1. **Press feedback** on buttons and chips (scale/ink shift on :active, 120–160 ms). Files: `src/components/ui/Button.astro`, `CableTest.astro` (`.ct__run`, `.ct__replay`), `src/components/process/DemoFrame.astro` (`.demo__replay`), `src/styles/global.css` (`.chip`).
2. **Closet slider follows the finger** directly, no lag or easing while dragging. File: `src/components/process/InstallDemo.astro` (`setSplit`).
3. **Glossary popover grows from the word** (transform-origin at the link). File: `src/components/glossary/TermPopover.astro`.
4. **Swipe down to dismiss** the glossary sheet on phones. File: `src/pages/glossary.astro` (`gl-drawer`, `closeDrawer`).
5. **Direction-aware form steps** (step 2 slides in from the right, back slides from the left) and the step number ticks. Files: `src/components/forms/ContactForm.astro` (`showStep`), `src/components/home/Process.astro` (`tickNumber`).
6. **Unfold** for FAQ answers and the cable test "What's this?" (height via grid-template-rows or clip, 240 ms). Files: `src/components/services/FaqList.astro`, `CableTest.astro` (`.ct__explain`).
7. **Menus drop from the header** (translateY −8px → 0 with fade). File: `src/components/layout/Header.astro` (`setOpen`).
8. **Trace port lights when the route arrives** (not before). File: `src/components/process/TraceDemo.astro` (`light()`).
9. **Thank-you slip enters and exits** with a short stagger; the plan-page quiz result too. Files: `ContactForm.astro` (success swap), `src/pages/plan.astro` (quiz result).
10. **Sliding tab highlight** behind the active tab (Process steps, explorer tabs, cable test mode). Files: `Process.astro`, `BuildingExplorer.astro`, `CableTest.astro` (`.ct__mode`). Do this one last.

Two rule fixes in the same run:
- Stop the endless `bx-flow` and `bx-pulse` loops in `src/components/home/BuildingSvg.astro` (rule 10: no endless motion).
- Hover arrow nudges only under `(hover: hover)` so they never stick on touch.

## B. Ten diagram features (approved "All of them")
Every feature must say which DESIGN.md rule it serves. Copy in plain English. No Armak claim that is not already on the site or confirmed by the owner (he makes the decisions, 2026-10-30).

Can be built now (no new facts):
1. **Cutaway: cable path to the closet.** Hover or select a room and its cable route draws back to the wiring closet; drawing-style callouts with leader lines ("4 drops · 1 access point"). Files: `BuildingSvg.astro`, `BuildingExplorer.astro`.
2. **Design step draws itself.** Walls, then jacks snapping to the grid, then the counts totaling in the margin. Clicking a jack opens the same jack in the trace demo. Files: `src/components/process/DesignDemo.astro`, `OfficePlan.astro`, `TraceDemo.astro`.
3. **Trace runs through the plan** (desk → ceiling → closet) instead of a straight line; when it lands, one row of the handover record writes itself (jack, panel, port, test date), marked "sample". File: `TraceDemo.astro`.
4. **Closet slider callouts** appear on the "after" side as you drag: labeled both ends, dressed bundles, numbered ports. Only claims already on the site. File: `InstallDemo.astro`.
5. **Cable test gauges.** A length bar and a margin meter fill as the report prints. Sample values, labeled sample. File: `CableTest.astro`.
6. **Job timeline** behind the five process steps, with the after-hours cutover shaded (makes "Cutover-ready" visible). File: `Process.astro`.

Built now. The owner confirmed all ten practices on 2026-10-30 (see "Owner answers" at the end), so these show by default. Still data-driven (gated on a `signature` object in `src/data/content.ts`, each item `confirmed: null | 'yes' | 'sometimes' | 'no'`; `null` = not shown):
7. **"Today / 10 years from now" switch** on the cutaway. Generic version is true for any building and can show now: devices come and go, desks move, the cabling behind them stays. The signature choices (spare fiber strands, empty conduit with pull strings, two drops per access point, Cat 6A by default, pre-placed ceiling jacks) light up only when confirmed. No numbers for device lifetimes unless sourced.
8. **Rack headroom** drawn and labeled in the closet "after" view. Shown only if `signature.rackHeadroom` is confirmed (checklist A5).
9. **"Most installers / Armak" sheet.** Two columns, ticks only on confirmed rows; the whole sheet stays hidden while no row is confirmed. New component in the Process section. Data from `signature`.
10. **One cable plant, several device generations.** A small timeline chart under the 28-years number: one long bar for the cabling, shorter repeating bars for devices. Numbers only with a cited source (see `ai/research/cable-plant-lifespan-sources.md`) or the owner's words; otherwise bars without numbers. File: `Numbers.astro` (or About).

Facts these wait on: the owner's own answers to the ten yes/sometimes/no questions in `ai/FATHER-CHECKLIST.md` section A (the owner decides; the file name is historical).

## Where the "extra steps" already show (for reference)
Home "How every job runs" (five steps with demos; Certify = tested and documented, you get the reports), "Principles" (Built to standard, From closet to campus, Cutover-ready, After the install), the hero test report and credentials, service Scope sheets and "How we deliver", Plan page tools. "Built for the future" appears only in the headline and one cabling-check line until section A comes back.

## Owner answers (2026-10-30, in chat; he makes the decisions)
All ten practices confirmed as Armak defaults: Cat 6A for new drops; two drops per Wi-Fi access point; spare fiber strands in every backbone; empty conduit with pull strings; rack, power and cooling headroom; zone cabling (consolidation points) in open offices; ceiling-grid jacks pre-placed; identical jacks with the role set at the switch; open standards, no lock-in; labels both ends (TIA-606) plus handover drawings. Item 11 (his own words on what most installers skip): not answered yet.
Record in `src/data/content.ts` as `signature.<item>.confirmed = 'yes'` with `confirmedBy: 'owner', confirmedOn: '2026-10-30'`. Features 7-10 are unblocked.

## Decisions from the research file (2026-10-30, ai/research/cable-plant-lifespan-sources.md)
- Feature 7 label: "10 years from now" is allowed, with a footnote: BICSI 005-2016 says to design backbone cabling for at least 10 years past commissioning (sourced in the research file). Set `lifespans.cabling = { years: 10, basis: "BICSI 005-2016 design horizon", sourceUrl }`.
- Feature 10 chart: use Wi-Fi Alliance certification launch dates as the one basis, labeled as such: Wi-Fi 5 2013, Wi-Fi 6 2019, Wi-Fi 6E 2021, Wi-Fi 7 2024, over one cabling bar "designed for 10+ years". Device support: Cisco 5 years of hardware support after end of sale, Axis 6 years (both sourced). Do NOT print any "3 to 5 year refresh cycle" (no maker publishes one).
- Warranty line (CommScope 25-year, Panduit 15/20/25-year system warranties) needs an authorized-partner installer. Print nothing about warranties until the owner answers: "Is Armak an authorized CommScope or Panduit partner that can register these system warranties?"
- Not verified, do not print: TIA-568 "useful life over ten years" wording; any Ubiquiti support term.

## Owner answers, later on 2026-10-30
- Authorized CommScope or Panduit partner for system warranties: owner said "Yes it is". Which brand(s) is still to be confirmed; print no warranty line until the brand is named.
- His own words for the sheet: he answered "everything" (nothing to add beyond the ten items). No quote goes on the sheet.
- Brand follow-up: owner said "All of them" = authorized partner for BOTH CommScope and Panduit (2026-10-30). Allowed warranty copy, once, on the About story sheet next to the cable-plant chart: "Installed by an authorized partner, CommScope and Panduit cabling can be registered for manufacturer system warranties of up to 25 years." Footnote the two manufacturer sources from the research file. No tier names, no promise that every job is registered.

## Owner answers to the six confirmations (2026-10-30)
1. 24/7 support is for contracted clients only: yes (site already says this).
2. BICSI-certified technicians: "say yes and revisit" (owner will supply details later). Keep on site; REVISIT.
3. Bonded and insured: "say yes and revisit". Keep on site; REVISIT.
4. Projects count: "that's an exact number" (946). Pending one confirm: show "946" without the "+"?
5. Clients get the cable test reports: yes (site already says this).
6. Free site assessment: undecided, owner wants to weigh it. Site currently makes no "free" claim anywhere.
- Decision on 6 (owner, 2026-10-30): site assessment is paid, and the fee is credited toward the project if the client hires Armak. Add one plain line near the assessment CTA on /contact/ and in the Assess step: "The assessment fee is credited toward your project." No amount shown unless the owner gives one.
- REVISED decision on 6 (owner, 2026-10-30, replaces the line above): two tiers.
  (a) Free rough quote: no site visit, a loose number from what the client sends (description, plans, photos).
  (b) Paid on-site assessment: a technician walks the site and gives an accurate estimate; the fee is credited toward the project if they hire Armak.
  Site copy: explain both on /contact/ and in the Assess step; the form lets the visitor pick which one. Pending owner OK on the exact wording.
