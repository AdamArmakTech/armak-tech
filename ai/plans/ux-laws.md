# UX laws audit and fix plan

Written 2026-10-31. Read-only audit: nothing on the site was changed. Read `ai/DESIGN.md`,
`ai/plans/motion-and-diagrams.md` and `ai/plans/diagram-specs.md` first; this plan does not repeat or replace them.

## How this was checked
- Site built from commit `39ff72f` in the side copy (`E:/Claude Installs/Research/armak-directions/A`) and opened in
  Edge through Playwright at 390x844 (phone) and 1440x900 (desktop).
- Pages: `/`, `/services/`, `/services/structured-cabling/`, `/about/`, `/industries/`, `/plan/`, `/contact/`, `/glossary/`.
- Measured: size of every link and button, how many red buttons are on screen at each scroll position, how fast
  each control reacts (time from click to the first change on the page), animation lengths, where things sit (y = px
  from the top of the page). The contact form was never sent; only its "Continue" step was clicked.
- The team building the motion and diagram features has changed some of these files since `39ff72f`
  (31 files in the working copy). Where a finding touches one of their files, it says so. Their owner for that file
  should do the fix, so nobody edits the same file twice.

## Mix-ups in the meeting list
- "Use sensible defaults" is not the Law of Similarity. Similarity is about things that look alike being read as one
  group. Sensible defaults fit best under Tesler's Law (the site takes on the work), with Postel's Law next to it.
- "Minimize target distance" is not its own law. It is half of Fitts's Law (time to hit a target depends on its
  size and its distance). It is merged into Fitts's below.
- Postel's Law was listed twice. It is covered once.
- Some laws in the list have weak evidence. Zeigarnik: later studies could not repeat the memory effect.
  Von Restorff: real-world strength is debated. Miller's "7 plus or minus 2" is an average, not a limit. Pareto's
  80/20 is a rough rule. They are used below as reminders, not as hard rules.

## Sources (fetched 2026-10-31)
| Law | Laws of UX (Jon Yablonski) | Second source |
|---|---|---|
| Hick's | https://lawsofux.com/hicks-law/ | https://en.wikipedia.org/wiki/Hick%27s_law |
| Fitts's (incl. target distance) | https://lawsofux.com/fittss-law/ | https://www.nngroup.com/articles/fitts-law/ |
| Jakob's | https://lawsofux.com/jakobs-law/ | https://www.nngroup.com/articles/end-of-web-design/ |
| Proximity | https://lawsofux.com/law-of-proximity/ | https://www.nngroup.com/articles/gestalt-proximity/ |
| Miller's | https://lawsofux.com/millers-law/ | https://www.nngroup.com/articles/working-memory-external-memory/ |
| Doherty Threshold | https://lawsofux.com/doherty-threshold/ | https://www.nngroup.com/articles/response-times-3-important-limits/ |
| Von Restorff | https://lawsofux.com/von-restorff-effect/ | https://en.wikipedia.org/wiki/Von_Restorff_effect |
| Serial Position | https://lawsofux.com/serial-position-effect/ | https://en.wikipedia.org/wiki/Serial_position_effect |
| Peak-End | https://lawsofux.com/peak-end-rule/ | https://www.nngroup.com/articles/peak-end-rule/ |
| Zeigarnik | https://lawsofux.com/zeigarnik-effect/ | https://en.wikipedia.org/wiki/Zeigarnik_effect |
| Prägnanz | https://lawsofux.com/law-of-pr%C3%A4gnanz/ | https://en.wikipedia.org/wiki/Principles_of_grouping |
| Similarity | https://lawsofux.com/law-of-similarity/ | https://en.wikipedia.org/wiki/Principles_of_grouping |
| Uniform Connectedness | https://lawsofux.com/law-of-uniform-connectedness/ | https://www.nngroup.com/articles/common-region/ |
| Tesler's | https://lawsofux.com/teslers-law/ | https://en.wikipedia.org/wiki/Law_of_conservation_of_complexity |
| Postel's | https://lawsofux.com/postels-law/ | https://en.wikipedia.org/wiki/Robustness_principle |
| Parkinson's | https://lawsofux.com/parkinsons-law/ | https://en.wikipedia.org/wiki/Parkinson%27s_law |
| Occam's Razor | https://lawsofux.com/occams-razor/ | https://en.wikipedia.org/wiki/Occam%27s_razor |
| Pareto | https://lawsofux.com/pareto-principle/ | https://en.wikipedia.org/wiki/Pareto_principle |

Nielsen Norman Group had no working page for several laws (their links returned "not found"), so Wikipedia is the
second source there. The Doherty number: Doherty and Thadani, IBM Systems Journal, 1982, feedback within 400 ms.

Sizes below: S = under an hour, M = a few hours, L = a day or more. "Overlap" names the running build's owner.

---

## 1. Hick's Law (more choices, slower decisions)
- **For this site:** at each point, the visitor should see one obvious next step and only a few others.
- **Already follows:** never more than one red button on screen. I scrolled every page in 211 px steps at both sizes
  and the most red buttons visible at once was 1, on all 8 pages. Phone menu: 12 items, services first. Next-step
  block: 4 options, the red one first. Contact step 1: 7 choices including "Not sure yet".
- **Breaks:** home cutaway on phone (y about 4300 to 4900): 8 "I manage a" chips plus 6 system tabs, 14 controls before
  the drawing starts. Feature B7 (Today / Years from now switch) will add a 15th.
- **Fix:** put the B7 switch inside the drawing frame (on the drawing's own edge), not as a third row of controls
  above it. S. **Overlap:** `BuildingExplorer.astro` / `BuildingSvg.astro`, cutaway builder (B1, B7). A note in their
  brief only; no separate work.

## 2. Fitts's Law, including "minimize target distance"
- **For this site:** things people tap should be big enough (the site's own rule is 44 px) and close to where the
  thumb or eye already is.
- **Already follows:** the phone dock (red button 301x48 plus call button) sits at the bottom where thumbs are. It
  appears once the hero button scrolls away (from y 600 on the home page) and hides near closing panels, the form and
  the footer. Menu items 56 px tall. Process tabs 50 px. Contact chips 46 px. Send button full width (348x58), 94 px
  under the last field. Desktop nav links are 40 px tall, which is fine for a mouse.
- **Breaks (phone, 390x844):**
  - Home: "See how we test" link 137x24 (`CableTest.astro`, `.ct__how`). "See Structured Cabling & Fiber" link
    217x26 (`BuildingExplorer.astro`, `.explorer__link`). Demo replay buttons 36x36 (`DemoFrame.astro`, `.demo__replay`).
  - /plan/: four "what's a drop?" style links 17 px tall (`plan.astro`, `.est__term`). Cable names in "Which cable?"
    23 px tall (`CableCompare.astro`, `.cc__name`). Five "What's this?" toggles in the sample report, 73x21
    (`CableTest.astro`, `.ct__explain summary`). Cable test mode switch 99x38 (`CableTest.astro`, `.ct__mode`).
  - /glossary/: about 990 term links, each 39 px tall (`glossary.astro`).
  - Every page: logo link 108x36 (`Header.astro`); footer "About" 41x46 and "Terms" 42x46 (`Footer.astro`).
- **Fix:** grow the tap area to 44 px without changing how anything looks (extra padding with a matching negative
  margin, or an invisible `::after` layer). S for each file.
  **Overlap:** `CableTest.astro` (cable test builder, fold into A6 and A10), `DemoFrame.astro` (A1 owner),
  `BuildingExplorer.astro` (cutaway builder), `Header.astro` (A7 owner), `glossary.astro` (A4 owner), `plan.astro`
  (A9 owner). Free files: `CableCompare.astro`, `Footer.astro`.
- Target distance: see Proximity (the estimator's results sit 521 px from the first box you type in).

## 3. Jakob's Law (people expect your site to work like other sites)
- **For this site:** keep the usual places: logo home at top left, menu at top, phone and main button top right.
- **Already follows:** all of the above, plus breadcrumbs, a menu button on phones, a footer with legal links, a
  search box in the glossary, FAQ answers that open in place, a two-step form with "Step 1 of 2".
- **Breaks:** the two links under the hero button ("Planning a project?", "Something's broken?") look like headings
  on a phone. See Similarity for the fix.
- **Fix:** none beyond that. The desktop Services menu opens on click, not hover; that is a common and safe pattern.
  Already fine.

## 4. Law of Proximity (things close together are read as a group)
- **For this site:** each input should sit next to the answer it changes, and each sentence next to the thing it
  talks about.
- **Already follows:** each section is one sheet; labels sit right above their fields; the call line sits under the
  hero button.
- **Breaks:** /plan/ estimator. The sentence "Want these numbers checked against your actual floor? Send us your plan…"
  sits between the four boxes and the results. Phone: first box at y 2169, last box ends y 2553, results start y 2690.
  While typing in "Floor area" the results are 521 px lower, under the phone keyboard, so the visitor sees nothing
  change. Desktop has the same split (boxes end y 1825, results start y 1938, sentence between).
  The sentence also offers the same next step as the "Send these numbers with my request" button under the results.
- **Fix:** move that sentence (same words) below the results, right above the "Send these numbers" button. Results
  then sit directly under the boxes. S. `plan.astro`. **Overlap:** the file is open in the running build (A9 quiz
  result); give it to that owner.

## 5. Miller's Law (people hold only a few things in mind at once)
- **For this site:** long lists are broken into small groups.
- **Already follows:** 5 steps, 6 services (A-01 to A-06), 8 industries, a 2-step form, 4 estimator boxes. The
  glossary (16,038 px long on a phone) is split by 25 letters, with a 44x44 letter bar, a search box and 10 topic chips.
- **Breaks:** none found.
- **Fix:** no change.

## 6. Doherty Threshold (answer within 400 ms)
- **For this site:** every tap should show a change at once, and nothing should keep the visitor waiting to read.
- **Already follows (measured, click to first change):** phone menu 4 ms, desktop Services menu 6 ms, form
  "Continue" 2 ms (both the error and the next step), glossary search 2 ms, FAQ 1 ms, estimator instant.
  All far under 400 ms.
- **Breaks:** two headline fade-ins still take 1.1 s, over the site's own 900 ms limit: service pages
  (`ServiceHero.astro`, `svc-title-in`) and /services/ (`pages/services/index.astro`, `svc-index-in`). The running build
  already cut the same fade in `PageHero.astro` to 0.8 s. The service-area map dots finish landing 920 to 1280 ms
  after they start (`ServiceArea.astro`, staggered dots).
- **Fix:** set the two 1.1 s fades to 0.8 s, matching `PageHero.astro`. Shorten the dot stagger so the last dot lands
  by 900 ms. S. **Overlap:** none of these three files is in the build's owner list; check with the run manager
  before starting. The endless `bx-flow` loop I saw on the home page is already in the build's rule fixes; not repeated here.

## 7. Von Restorff Effect (the one thing that looks different is remembered)
- **For this site:** red means "the next step" and green means PASS, and nothing else uses them.
- **Already follows:** the sweep found at most 1 red button on screen anywhere. The desktop header button is ink,
  so it does not compete with the red hero button. The dock hides when another red panel is on screen.
- **Breaks:** none found.
- **Fix:** no change. The diagram specs already keep new marks ink, steel or blue.

## 8. Serial Position Effect (first and last items are remembered best)
- **For this site:** put the most important link first or last.
- **Already follows:** desktop nav starts with Services and ends with the phone and the main button. Phone menu
  starts with the six services and ends with the main button and the phone. The next-step block starts with
  "Request a site assessment" and ends with the phone number. The steps run Assess to Support.
- **Fix:** no change.

## 9. Peak-End Rule (people judge by the best moment and the ending)
- **For this site:** the high point is the cable test's PASS stamp; the ending is the closing next-step sheet and,
  for people who write in, the thank-you slip.
- **Already follows:** every page ends on a light next-step sheet. The thank-you slip lists numbered next steps and
  the phone number, with no invented promises. The 404 page is a failed link test, which turns a bad moment into a
  small joke.
- **Breaks (minor):** at 1440x900 the PASS stamp on the home page sits at y 983, just under the first screen, because
  the report sheet is set low to cross the hero edge (a Direction A choice).
- **Fix:** no change. It is a deliberate design choice, and the test plays when it comes into view.

## 10. Zeigarnik Effect (unfinished tasks stay on the mind)
- **Already follows:** "Step 1 of 2" bar on the form; on phones the step tabs run off the right edge, which shows
  there is more. The evidence for this effect is weak, so it is not a reason to add progress bars elsewhere.
- **Fix:** no change.

## 11. Law of Prägnanz (people read shapes in the simplest way)
- **Already follows:** flat line drawings, plain sheets, one surface colour per band.
- **Watch:** the cutaway is getting more layers (B1 routes, B7 switch). Show one highlighted route at a time.
- **Fix:** no change; a note for the cutaway builder only.

## 12. Law of Similarity (things that look alike are read as the same kind)
- **For this site:** links must look like links; mono type must mean "a code or standard"; plain words look plain.
- **Already follows:** all buttons share one shape; codes (A-01, 01 to 05, TIA-606) are mono everywhere.
- **Breaks:**
  - Home hero, phone: "Planning a project?" and "Something's broken?" are links, but look like a white heading with
    grey text. The underline only shows on hover, and phones have no hover (`Hero.astro`, `.route`).
  - Service pages, "Standards & technology" list on the scope sheet: plain phrases are set in mono capitals next to
    real standard names, so they read like standards. Examples: "Field-tested & documented", "Remote viewing",
    "Next-gen firewall", "Commercial-grade displays" (`data/services-detail.ts`, shown by `ServiceHero.astro`).
    This also breaks DESIGN rule 4.
- **Fix:**
  - Add the same right arrow the buttons already use after each route title, in the title's colour. No new colour,
    no copy change. S. `Hero.astro`, not in the running build.
  - Mark the plain phrases in the data (for example a `plain: true` flag) and show those rows in the sans font.
    Words unchanged. S. `services-detail.ts` + `ServiceHero.astro`, not in the running build.

## 13. Law of Uniform Connectedness (things inside one frame or joined by a line belong together)
- **Already follows:** each section is one sheet; step tabs join the demo frame; scope-sheet rows share hairlines.
- **Breaks:** /plan/ estimator. The four boxes sit inside a bordered box; the results sit outside it, after a
  sentence, so they read as a separate block.
- **Fix:** the Proximity fix (move the sentence) solves this too. Nothing extra.

## 14. Tesler's Law (some work can't be removed; the site should carry it, not the visitor)
- **For this site:** this is where "use sensible defaults" belongs.
- **Already follows:** the estimator opens filled in (5000 sq ft, 20 desks, 1 floor, 2 doors) so numbers show
  before any typing. "Not sure yet" is a choice on the form. "Send these numbers with my request" carries the
  estimate into the form. Glossary words open in place. The form fills name, company, email and phone from the browser.
- **Breaks:** only the glossary search (see Postel's).
- **Fix:** no change beyond Postel's.

## 15. Postel's Law (accept what people type, in any reasonable form)
- **Already follows:** the phone field accepts any format (it counts digits). Typing "5,000" or "5000 sq ft" in the
  estimator is read as 5000. Email and phone fields bring up the right phone keyboard.
- **Breaks:** /glossary/ search misses everyday spellings. "wifi": 0 results ("wi-fi": 9 letter groups). "cat6":
  0 results ("cat 6a": 2). "fibre": 0 results. The page then shows "No terms match that search".
- **Fix:** before matching, lowercase both the search text and the terms and drop spaces, hyphens and dots; treat
  "fibre" as "fiber". S. `glossary.astro` (search script). **Overlap:** A4 owner (swipe to dismiss) has this file.

## 16. Parkinson's Law (a task fills the time you give it)
- **For this site:** asking for help should take a minute, not a sitting.
- **Already follows:** 2 steps, 5 fields (4 required), browser autofill on every contact field, the estimate
  carried over from /plan/.
- **Breaks:** /contact/ on a phone: the "Continue" button's top edge is at y 810 on an 844 px screen, so only 34 px
  of it shows on the first screen. The running build is adding the "How would you like to start?" choice (free rough
  quote or paid on-site assessment) above the chips, which will push it lower.
- **Fix:** after that change lands, check at 390x844. If the first question still does not fit the first screen,
  reduce the top and bottom space of the /contact/ hero sheet on phones only. No copy change. S. `contact.astro`.
  **Overlap:** `contact.astro` and `ContactForm.astro` are open in the running build; do this after they are committed.

## 17. Occam's Razor (the simplest version that works wins)
- **Already follows:** DESIGN.md already says nothing decorative survives.
- **Watch (owner question, not a change):** on phones the footer is 1307 px tall (about 1.5 screens), mostly the list
  of 23 cities. Home, About and Contact also show the service-area map. Repeating the cities is normal for local
  search, so keep it unless the owner wants it shorter.
- **Fix:** no change.

## 18. Pareto Principle (a few changes give most of the benefit)
- Used to pick the list below: small fixes on the pages people use to decide (home, plan, contact, glossary),
  no new parts, no new colours, no new copy.

---

## Top list (most effect for least work), grouped by file so each file has one owner

| # | File | Change | Laws | Size | Who does it |
|---|---|---|---|---|---|
| 1 | `src/pages/plan.astro` | Move "Want these numbers checked…" below the results, above the "Send these numbers" button. Make the four "what's a drop?" links 44 px tall to tap. | Proximity, Uniform Connectedness, Fitts's | S | A9 owner (file is open in the build) |
| 2 | `src/pages/glossary.astro` | Search ignores spaces, hyphens and dots, and treats "fibre" as "fiber". Term links 44 px tall on phones (now 39). | Postel's, Tesler's, Fitts's | S | A4 owner |
| 3 | `src/components/home/Hero.astro` | Add the button arrow after "Planning a project?" and "Something's broken?" so they read as links on phones. | Similarity, Jakob's | S | Free file |
| 4 | `src/components/ui/CableTest.astro` | 44 px tap areas: "See how we test" (now 24 tall), the five "What's this?" toggles (21), the mode switch (38). | Fitts's | S | Cable test builder, with A6 and A10 |
| 5 | `src/components/process/DemoFrame.astro` | Replay button 36x36 to 44x44 tap area. | Fitts's | S | A1 owner |
| 6 | `src/components/home/BuildingExplorer.astro` (+ `BuildingSvg.astro`) | "See [service]" link 26 tall to 44. Put the B7 switch inside the drawing frame, not as a third control row. | Fitts's, Hick's | S | Cutaway builder |
| 7 | `src/components/layout/Header.astro` | Logo link 36 tall to 44 tap area, no visual change. | Fitts's | S | A7 owner |
| 8 | `src/components/services/ServiceHero.astro` + `src/data/services-detail.ts` | Headline fade 1.1 s to 0.8 s. Plain phrases in the "Standards & technology" list shown in sans, not mono (words unchanged). | Doherty, Similarity | S | Free files |
| 9 | `src/pages/services/index.astro` | Headline fade 1.1 s to 0.8 s. | Doherty | S | Free file |
| 10 | `src/components/home/ServiceArea.astro` | Last map dot lands by 900 ms (now up to 1280 ms). | Doherty | S | Free file; confirm with run manager |
| 11 | `src/components/plan/CableCompare.astro` | Cable name links 23 tall to 44 tap area. | Fitts's | S | Free file |
| 12 | `src/components/layout/Footer.astro` | "About" (41 wide) and "Terms" (42 wide) to at least 44. | Fitts's | S | Free file |
| 13 | `src/pages/contact.astro` | After the quote / on-site choice lands: if "Continue" is below the first phone screen, tighten the hero sheet's space on phones. | Parkinson's, Fitts's | S | After the running build commits this file |

Every item is size S. The whole list is roughly one working day for one builder, or under two hours split across the
owners above. Items 1, 2, 4, 5, 6 and 7 go into briefs the running build's owners already have, so no file gets two editors.
Before any push: `npx astro check` (0 errors), `npm run build`, phone and desktop screenshots of each changed page.

## Laws where I recommend no change
- **Miller's:** lists are already chunked (5 steps, 6 services, 8 industries, glossary by letter with search).
- **Doherty (response speed):** every control reacts in 1 to 6 ms. Only the animation lengths in items 8 to 10 need work.
- **Von Restorff:** never more than one red button on screen on any page or size.
- **Serial Position:** the main action is first or last in every menu and block.
- **Peak-End:** strong ending on every page and after the form; PASS just under the desktop fold is a deliberate choice.
- **Zeigarnik:** the form already shows "Step 1 of 2"; the evidence is weak, so no more progress bars.
- **Prägnanz:** drawings and sheets are already simple (note to the cutaway builder only).
- **Jakob's:** the layout follows common patterns; the one gap is fixed by item 3.
- **Tesler's:** defaults, "Not sure yet" and the estimate hand-off already carry the work; only item 2 adds to it.
- **Occam's Razor:** no cut; the long phone footer is an owner question, not a fix.
