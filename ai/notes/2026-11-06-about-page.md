# About page rebuild — 2026-11-06

Session: about-page (worktree `about-page-1c7980`, branch `claude/about-page-1c7980`, cut from `intent-redesign` e2e67f2).
File changed: `src/pages/about.astro` only (plus this note).

## What the owner said (from his phone, 2026-11-06)
"We have the same information repeated 4 times on the same page, and the rest of that page is dead space."
His four screenshots: the story heading "Since 1998"; the hero line "Est. 1998, Glendale HQ"; the stat
"28 years in business."; the facts card (Founded 1998 / Headquarters Glendale / Cities served 24 / Counties 7).
Earlier the same day: "I LIKE THIS OLD way more than the new way" about the story rows with a small red uppercase
label above a bold title and a short body, a hairline between rows (LEGACY / OUR STANDARD / SCOPE).

## Where the facts were (before) and where they are now
Before, the founding era appeared six times: the title ("since 1998"), the lead ("For 28 years"), the spec line
("Est. 1998"), the story heading ("28 years in business."), the facts card ("Founded 1998") and the story row title
("Since 1998"). The headquarters appeared twice (spec line, facts card). The counts once (facts card).

Now, each fact has one home:
- Founding year: the page title, "Low-voltage installs since 1998." Nothing else on the page says 1998 or 28 years
  (the browser-tab title and the meta description keep the year; they are not on the page).
- Headquarters and the counts: the "Where we work" intro, "24 cities across 7 Southern California counties, served
  from our Glendale headquarters", directly above the real list of cities by county. Glendale carries a small red HQ
  mark in that list (the one place red means "here", rule 7 round 3).
- Removed: the spec line, the facts card, the "28 years in business." heading, "For 28 years" in the lead, the
  "Since 1998" row title (the title above already says it; the Legacy row is now "The same trade from day one").

## The page, top to bottom
1. Hero: breadcrumb, title "Low-voltage installs since 1998.", lead (what Armak does, no numbers), and on the right
   (under the lead on phones) "On every job": the three owner-confirmed promises from `credentials` in content.ts
   (written plan and price, cable test reports delivered, 24/7 support for contracted clients). A "Licensed, CSLB
   no." row appears there only once `site.license` is set.
2. Who we are: the three stacked rows the owner likes. Red uppercase label (`--signal`, 14px, sans, tracked), bold
   `t-h3` title, body in `--text`, a `--hairline` between rows, one column on phones. Legacy / Our standard / Scope.
3. What we install: the six systems from site.ts as rows (name links to the service page, plus its `short` line).
   Two columns from 640px. "All services" link.
4. Where we work: seven county rows, each county with its cities, from site.ts. "See the map" links to the home
   page's map (`/#service-area`).
5. How we run a job: the five steps from content.ts as rows (title, what happens). "Watch each step run" links to
   the home page's steps (`/#process`). No step numbers (rule 3).
6. Cabling planned for the long run: the existing sourced cable-plant chart (`CablePlant`), now with a heading and
   a one-paragraph intro instead of sitting loose in the story section.
7. The dark Next-step band (`PageCta`, unchanged): the one red button on the page.
Hidden slots (milestones, licence row, team) render nothing at all when `SHOW_PLACEHOLDERS` is false, so the layout
closes up; flip the flag to preview them.

## Layout
- Phones: one column; every block is heading, intro, link, then rows; nothing scrolls sideways (scrollWidth equals
  the viewport at 375, 390 and 1440). Headings fit two lines at 375px (measured: h1 2 lines, every h2 1 or 2 lines).
- Desktop (1024px and up): one grammar for every block, the heading column on the left (4 of 12 columns, sticky
  while its rows scroll) and the rows on the right (8 columns). The sticky stock photo is gone: it was the same
  cable-bundle stock picture as the homepage and the structured-cabling page, so it did not earn its place (rule 2).
- Neighbouring blocks share one `--space-section` gap (the `.about` grid), not two paddings.
- Breakpoints used: 640 and 1024 only (DESIGN.md tokens).

## Motion
`data-split` on every block heading (the site's signature line reveal, rule 10 round 3) and `data-reveal` on the
rows with a 50 to 60 ms stagger per row (the existing fade-rise; no new motion type). Measured: 31 reveal blocks, all
revealed after one scroll through; 6 split headings, all split; final state shown under reduced motion.

## DESIGN.md rule each change serves
- One home per fact, no decorative repeats: the owner rule at the top of DESIGN.md (every design aspect intentional
  and tied to the site's information) and the 2026-11-05 critique's "say the founding year once per page".
- Red uppercase row labels: the owner's 2026-11-06 decision, which overrides rule 7 for these labels and the round-1
  "no labels above headings" decision for the story rows only. Everywhere else: no labels above headings.
- Hairlines only between rows: rule 5 (lines separate list rows; blocks are separated by space, no top rules).
- No facts card, no white sheet in the hero, no outlined boxes: rule 5 round 1 (tone steps, no boxes) and the
  owner's "no floating cards". The chart keeps its white sheet (an existing surface).
- Red: rule 7 round 3. One red filled button (the Next-step band), the HQ mark, link hover. Nothing else red
  except the owner's row labels.
- Mono: rule 4. No mono on the page outside the chart's readouts.
- Codes: rule 3. No step numbers, no service codes.
- Type and reading: rule 9. Body and row text in `--text`, metadata in `--steel`, headings within two lines at 375.
- Photo: rule 2 (a slot shows the product image or nothing; no repeated stock scene).
- Motion: rule 10 (heading line reveal and the fade-rise reveal only; the chart's own draw-once stays).
- Page end: the paused rule 8 as the live look has it (dark Next-step band, unchanged).

## Checks
- `npx astro check`: 0 errors, 0 warnings. `npm run build`: passes (see the commit).
- Browser (Playwright, dev server on port 4323): console clean at 390 and 1440, no element wider than the
  viewport, fonts loaded.
- Before/after PDF (phone width, whole page): `E:\all-sites\armak-tech\ai\exports\about-2026-11-06.pdf`
  (page 1 before, page 2 after; made with Playwright's PDF printer at 390px with reduced motion so every block
  shows; the Edge headless printer only prints at paper width, which is a tablet layout, so it was not used).
- Phone page height: 8242px after vs 5051px before. The page is longer because it now holds content where it had
  gaps and repeats; no block is empty.

## Left out, or for the owner to decide
- The stock photo is gone from About (see Layout).
- "Since 1998" left the Legacy row (the title above says it once). If the owner wants the row title back as "Since
  1998", the page title must change instead, so the year still appears once.
- The Wi-Fi chart stays, as its own block at the end. Say if it should go, or move to /plan/.
- The three "On every job" lines also appear on the home page and the services index. They repeat across pages,
  not within this one.
- Nothing new was invented: no clients, no team, no numbers beyond what site.ts and content.ts hold.

## Worktree notes for the next session
- The app cut this worktree from `main` (9d6993e); the branch was fast-forwarded onto `intent-redesign` (e2e67f2)
  before any work, so it merges into `intent-redesign` cleanly.
- `node_modules` was installed in the worktree with `npm ci` (a junction to the main checkout's copy made the dev
  server 404 on the Geist font files through `/@fs/`).
- Port 4321 belonged to the main checkout's dev server, so this worktree's `armak-dev` ran on 4323.
