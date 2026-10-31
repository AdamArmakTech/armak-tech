# Code review: armak.tech (branch `intent-redesign`, HEAD 794120f), 2026-10-31

Review only. No project files were changed. See "What I ran" at the end, including the `git status --short` check.

---

## 1. Summary

**Overall health is good.** The site builds cleanly. The type checker (`npx astro check`, a tool that finds code mistakes before the site is built) reports 0 errors, 0 warnings and 0 hints across 88 files. The build produces 18 pages. Every package listed in `package.json` is actually used. There is very little truly dead code.

The main problems are:

- **Copy-paste repetition.** The same block or rule is written two to four times instead of once.
- **A few very long files**, over 900 lines each.
- **One heavy feature, the interactive map**, which downloads about 1.6 MB of code.
- **Some leftovers from the old site and from "Direction A"** (the design the owner rejected on 2026-10-31).

**How much could be removed:**

- **Confirmed dead code:** about 110 lines across 10 files. Visitors would see no difference. The only point is a simpler codebase.
- **Old-site leftovers:** the `legacy/` folder (28 files, 235 KB) plus two tracked tool-cache files. These are never shipped to visitors.
- **Unused public images:** two logo files (295 KB) sit on the live server but no page uses them.
- **Bigger, optional cuts:** these need an owner decision. Replacing the live map with the built-in drawn map would save about 1.6 MB of downloads on 3 pages. Dropping one animation library (GSAP) would save about 120 KB.

**The 3 most valuable cleanups:**

1. **Write business facts and links in one place** (findings F15, F16, F17, F45). Several facts and links are written out by hand in more than one file: the business identity used by search engines, the opening-hours reader, contact-form links, a second email address and "24/7". Copies like these drift apart without anyone noticing. Fixing them is low risk and mostly takes minutes.
2. **Delete the confirmed dead code in Batch 1** (F1 to F10, F31, F32). Nothing visible changes, and the next person reading the code has less to wade through.
3. **Decide about the live map** (F35). It is the single heaviest thing on the site. The component already contains a lighter drawn version that shows when the live map can't load.

---

## 2. Findings table

Confidence: **Confirmed** means proven by searching or by tool output. **Likely** means strong evidence but not proof.
Effort: Small is under 30 minutes. Medium is a few hours. Large is a day or more.
**(R)** means the redesign will touch this file anyway, so the cleanup can wait.

| # | Cat | Location | What it is | Confidence | Severity | Effort |
|---|---|---|---|---|---|---|
| F1 | 1 | `src/scripts/sheets.ts` (whole file) | Direction A "sheet lift" script; nothing loads it | Confirmed | Low | Small |
| F2 | 1 | `src/data/content.ts:5-7, 179-191` | `testimonials`, `Testimonial`, `placeholderCount()` unused; comment claims a build log that doesn't exist | Confirmed | Low | Small |
| F3 | 1 | `src/lib/cta.ts:36` | `estimatorHref` never used | Confirmed | Low | Small |
| F4 | 1 | `src/lib/glossaryLinks.ts:175-180` | Leftover second way of using `linkGlossaryTerms` (default export) | Confirmed | Low | Small |
| F5 | 1 | `glossary/index.ts:40`, `services-detail.ts:22`, `content.ts:208`, `seo.ts:26` | Things marked as shared with other files but only used inside their own file | Confirmed | Low | Small |
| F6 | 1 | `src/scripts/motion.ts:5, 30-35` | `[data-reveal-stagger]` handler; no element uses it | Confirmed | Low | Small |
| F7 | 1 | `src/styles/global.css:168-170, 188-197, 209-211` | Unused classes `.t-accent`, `.grid-12`, `.rule`, `.surface-white` | Confirmed | Low | Small |
| F8 | 1 | `src/styles/tokens.css:63-64` | Spacing values `--sp-7` to `--sp-10` never used (R) | Confirmed | Low | Small |
| F9 | 1 | `src/pages/projects/index.astro:17, 33-41, 65-84, 91-97` | `hasPlaceholders = false` constant and the block it can never show | Confirmed | Low | Small |
| F10 | 1 | `PageHero.astro:7, 18-19, 28-29`; `ServiceCta.astro:10` | Settings (`code`, `tone`) the components accept but never use | Confirmed | Low | Small |
| F11 | 1 | `ContactForm.astro:631, 889-892` | `?start=quote/onsite` link option that no internal link uses | Likely | Low | Small |
| F12 | 1 | `src/layouts/Base.astro:16-19, 30-31, 40-42` | `ogImage` / `ogImageAlt` settings never passed (keep) | Confirmed | Low | none |
| F13 | 1 | `src/pages/styleguide.astro` | Internal page, published at armak.tech/styleguide/, nothing links to it | Confirmed | Low | Small |
| F14 | 1 | `projects/[slug].astro:34,58,66,99,110,131-132`; `FeaturedProjects.astro:35`; `ProjectCard.astro:32` | Placeholder branches that can never run (keep for now) | Confirmed | Low | none |
| F15 | 2 | `services/[slug].astro:35-48` vs `seo.ts:25, 73-91` | Business identity for search engines rebuilt by hand; `businessId` exported but unused | Confirmed | Medium | Small |
| F16 | 2 | `seo.ts:30-66` vs `lib/hours.ts:17-33` | Two different readers for the same opening-hours text | Confirmed | Medium | Small |
| F17 | 2 | about 15 places (see detail) | Contact links typed by hand instead of using `contactHref()`; button label written about 13 times | Confirmed | Medium | Medium |
| F18 | 2 | `contact.astro:33-53, 90-185` vs `ContactSection.astro:23-43, 64-129` | Same contact-details block and its styles written twice (R) | Confirmed | Medium | Small |
| F19 | 2 | `Hero.astro:93-110` vs `Header.astro:251-264` | Two copies of the "Open now" timer, both running on the homepage | Confirmed | Low | Small |
| F20 | 2 | `Base.astro:45,78`; `glossary.astro:48`; `services/index.astro:32`; `services/[slug].astro:107` | Search-engine data block and its safety escaping repeated 4 times | Confirmed | Low | Small |
| F21 | 2 | `pages/PageCta.astro` vs `services/ServiceCta.astro` | Two nearly identical closing "Next step" blocks (R) | Confirmed | Low | Small |
| F22 | 2 | `ServiceHero.astro:22-28, 137-173` vs `PageHero.astro:39-47, 79-112` | Breadcrumb markup and styles written twice (R) | Confirmed | Low | Small |
| F23 | 2 | `ServiceHero.astro:111-129` vs `plan.astro:226-234` | Two different ways to "print just this part" | Confirmed | Low | Small |
| F24 | 2/8 | 16 places (see detail) | Reduced-motion check rewritten each time, handled inconsistently | Confirmed | Low | Small |
| F25 | 2 | `Hero.astro:81,88`; `services/index.astro:51,56`; `ServicesGrid.astro:31,43`; `about.astro:85`; `services/[slug].astro:111` | Two wordings of the stock-photo caption; hero alt text copied (R) | Confirmed | Low | Small |
| F26 | 3 | `components/**` | No unused components; three wait for real projects | Confirmed | Low | none |
| F27 | 4 | `CableTest.astro` (1357 lines), `ServiceArea.astro` (986), `ContactForm.astro` (971), `BuildingExplorer.astro` (959), `BuildingSvg.astro` (888) | Very long single files (R) | Confirmed | Medium | Large |
| F28 | 4/6 | `src/scripts/motion.ts:107-147, 157` | GSAP (about 120 KB) for one heading effect; Lenis smooth scroll adds wiring in other files | Likely | Medium | Medium |
| F29 | 5 | `legacy/` (28 files, 235 KB) | The pre-Astro site, never built | Confirmed | Low | Small |
| F30 | 5 | `.vite/deps/_metadata.json`, `.vite/deps/package.json` | Tool cache from the old site, tracked in git since 2026-05-31 | Confirmed | Low | Small |
| F31 | 5 | `public/robots.txt:4`; `astro.config.mjs:42` | References to `/dev/` pages deleted 2026-10-12 | Confirmed | Low | Small |
| F32 | 5 | `.gitignore:20-21` | Ignore rule for an `index.html.legacy` file that doesn't exist | Confirmed | Low | Small |
| F33 | 5 | (search result) | Direction A cleanup is complete apart from F1 | Confirmed | Low | none |
| F34 | 6 | `astro.config.mjs` | No database, no server code: fully static site | Confirmed | none | none |
| F35 | 6 | `ServiceArea.astro:563-871` | Live map downloads about 1.6 MB plus map data from openfreemap.org, on 3 pages | Confirmed | Medium | Medium |
| F36 | 6 | `vercel.json`, fonts, `public/logo.png` | Caching and fonts fine; 243 KB logo used only for search engines | Confirmed | Low | Small |
| F37 | 6 | `dist/_astro/*.png` | Original logo PNGs copied into the build but never used by a page | Likely | Low | none |
| F38 | 7 | `public/armak-logo-color.png` (235 KB), `public/armak-logo.png` (60 KB) | Only the old site used them | Likely | Low | Small |
| F39 | 7 | `ai/ai-context.sh` | Helper script that looks for docs in the wrong folder; broken | Confirmed | Low | Small |
| F40 | 7 | `ai/ARCHITECTURE.md`, `ai/HANDOFF.md:10-14`, `README.md`, `scripts/prepare-logos.mjs:2` | Out-of-date documentation | Confirmed | Low | Small |
| F41 | 7 | `.playwright-cli/`, `.playwright-mcp/` (about 9 MB) | Local test screenshots (not in git) | Confirmed | Low | Small |
| F42 | 8 | `package.json` | Outdated packages (see detail) | Confirmed | Low | Small |
| F43 | 8 | `scripts/*.mjs:10/21` | Scripts use `sharp`, which isn't listed in `package.json` | Confirmed | Low | Small |
| F44 | 8 | (missing) `.env.example` | No template for the one required setting | Confirmed | Low | Small |
| F45 | 8 | `content.ts:361`, `Numbers.astro:24`, `about.astro:23`, `services/[slug].astro:96-103`, `styleguide.astro:124,147` | Facts and titles written into components instead of the data files | Confirmed | Medium | Small |
| F46 | 8 | about 20 places (see detail) | Screen-width breakpoints outside the approved set (R) | Confirmed | Low | Medium |
| F47 | 8 | `CableTest.astro:25`, `InstallDemo.astro:16` | Random IDs make every build different | Confirmed | Low | Small |
| F48 | 8 | `Base.astro:33` | Footer call-to-action is on by default, but 13 of 17 pages switch it off | Confirmed | Low | Small |
| F49 | 8 | `ContactForm.astro:641`, `ServiceArea.astro:571-573`, `ServiceHero.astro:88-129` | Fragile small workarounds (see detail) | Confirmed | Low | Small |

---

## 3. Findings in detail

A few terms used below:

- **Import:** one file loading code from another.
- **Export:** code a file offers for other files to import.
- **Bundle:** the combined JavaScript file the build produces for browsers.
- **Commit:** one saved change in git, the project's history.
- **Revert:** a new commit that undoes an earlier one exactly.

### Category 1: Dead code

**F1. `src/scripts/sheets.ts`: Direction A "sheets lift" script** (Confirmed · Low · Small)
- **Evidence:**
  - Searched `src/` for `sheets`, `data-sheet` and `is-lifted`. The only hits are inside the file itself.
  - Nothing imports it.
  - The tool knip (it finds unused files and code) lists it as an unused file.
  - It targets `.home .coupon`, and a search finds no `coupon` class anywhere.
  - Git shows it was added in 11921ed (2026-10-30, Direction A), and the revert in 794120f didn't remove it.
- **Why unnecessary:** It belongs to the rejected design.
- **Impact of removing:** 26 lines, 1 file. 0 KB shipped, because it is already not part of the build.
- **Risks:** None. There is no dynamic import, and nothing builds its name from text.
- **Test:** Build, then open the homepage.

**F2. `src/data/content.ts:179-191`: `testimonials`, `Testimonial`, `placeholderCount()`** (Confirmed · Low · Small)
- **Evidence:**
  - knip lists all three as unused exports.
  - A search of `src/` finds them only in this file.
  - The comment at lines 5-7 says `placeholderCount()` "is logged at build". No code calls it.
  - The comment at line 179 says the testimonials section "hides itself", but there is no testimonials section.
- **Impact:** About 13 lines, plus correcting the misleading comment.
- **Risks:** `ai/ARCHITECTURE.md` mentions testimonials (see F40). When real testimonials arrive, someone will build the section and its data together.
- **Test:** `astro check` and the build.

**F3. `src/lib/cta.ts:36`: `estimatorHref`** (Confirmed · Low · Small)
- **Evidence:** knip lists it, and a search finds one hit, its own definition.
- **Risks:** The `/plan/#estimator` anchor (a jump point on the page) still works. Only the unused shortcut goes.

**F4. `src/lib/glossaryLinks.ts:175-180`: the default export of `linkGlossaryTerms`** (Confirmed · Low · Small)
- **Evidence:**
  - knip reports "Duplicate exports: linkGlossaryTerms|default".
  - The only user is `Capabilities.astro:3`, and it uses the named version.
  - The comment calls it "Kept for backwards compatibility", but nothing older uses it.
- **Impact:** 1 to 2 lines. Delete only the `export default` line and keep the function.

**F5. Things marked as exported but only used in their own file** (Confirmed · Low · Small)
- **Locations:**
  - `letterOf` at `glossary/index.ts:40`
  - `Standard` at `services-detail.ts:22`
  - `Answer` at `content.ts:208`
  - `websiteId` at `seo.ts:26`
- **Evidence:** knip, plus a search showing no imports elsewhere.
- **Fix:** Remove only the word `export`. The code itself is still needed.
- **Note:** `businessId` (`seo.ts:25`) is also unused elsewhere. It should be *used*, not removed (see F15).

**F6. `src/scripts/motion.ts:5, 30-35`: the stagger handler** (Confirmed · Low · Small)
- **Evidence:** Searched `src/` for `data-reveal-stagger`. Zero elements use it; the only hits are inside motion.ts.
- **Impact:** About 7 lines in the bundle loaded on every page. The size saving is tiny.
- **Test:** Fade-in animations still play on the homepage.

**F7. Unused CSS classes in `src/styles/global.css`** (Confirmed · Low · Small)
- **Which:** `.t-accent` (168-170), `.grid-12` (188-192), `.rule` (194-197), `.surface-white` (209-211).
- **Evidence:**
  - Searched every `.astro` and `.ts` file for these exact words.
  - The only hits are comments, for example "rule 7".
  - No class name is built from text pieces anywhere that could produce them.
- **Impact:** About 18 lines of CSS that every page carries, because CSS is put inside each page.
- **Risks:** None found. **(R)** global.css will change in the redesign, but removing these is safe at any time.

**F8. `src/styles/tokens.css:63-64`: `--sp-7`, `--sp-8`, `--sp-9`, `--sp-10`** (Confirmed · Low · Small · R)
- **Evidence:** Counted `var(--sp-N)` uses: `--sp-1` to `--sp-6` are used, `--sp-7` to `--sp-10` have 0 uses.
- **Why wait:** DESIGN.md lists the full scale, so the redesign may start using them. Decide during the redesign.

**F9. `src/pages/projects/index.astro`: the `hasPlaceholders` block** (Confirmed · Low · Small)
- **Evidence:** Line 17 sets `const hasPlaceholders = false;`. It never changes, so the note at lines 33-41 and its styles (65-84 and 91-97) can never appear.
- **Impact:** About 37 lines.
- **Risks:** None. The page currently just sends visitors to the homepage anyway (line 15).

**F10. Settings components accept but never use** (Confirmed · Low · Small)
- **Where:**
  - `PageHero.astro` accepts `code` and `tone` "for compatibility" (lines 7, 18-19, 28-29).
  - `ServiceCta.astro:10` accepts `code`.
- **Evidence:** A search for `<PageHero` and `<ServiceCta` with `code=` or `tone=` finds no callers. Only `<PageCta` passes `code`, and that component does use it.
- **Impact:** 5 lines, and a clearer interface.

**F11. `ContactForm.astro:889-892`: the `?start=quote|onsite` option** (Likely · Low · Small)
- **Evidence:**
  - A search for `start=` finds only comments in this file.
  - `contactHref()` in `cta.ts` can't produce this option.
- **Why only "Likely":** A link in an email, an ad or the owner's notes could use it. Code can't see those.
- **Choice:** Add `start` to `contactHref()` so CTAs can use it, or remove it. Ask the owner if any outside link uses it.

**F12. `Base.astro`: the `ogImage` / `ogImageAlt` settings** (Confirmed unused · Low · no action)
- **Evidence:** No page passes them.
- **Recommendation:** Keep. They are the simple way to give a future page its own social-share image.

**F13. `/styleguide/` is published but nothing links to it** (Confirmed · Low · Small)
- **Evidence:**
  - It is built (`dist/styleguide/index.html`).
  - It is marked "don't index" (`noindex`), blocked in `robots.txt:5` and left out of the sitemap.
  - A search for links to `/styleguide` finds none.
- **Why it matters:** Anyone can open armak.tech/styleguide/. It repeats facts by hand ("24/7", see F45) and uses a different stock photo than the live pages.
- **Choice for the owner:** Keep it (useful during the redesign), or stop building it in production.

**F14. Placeholder branches in the hidden Projects area** (Confirmed · Low · leave)
- **Evidence:**
  - Project pages are only built from `publishedProjects`, which drops every `placeholder: true` project (`content.ts:198`).
  - So every `p.placeholder &&` branch is unreachable: in `projects/[slug].astro` (lines 34, 58, 66, 99, 110, 131-132), `FeaturedProjects.astro:35` and `ProjectCard.astro:32`.
- **Recommendation:** Leave these until real projects arrive, then simplify. The whole area is intentionally dormant (see F26).

**Route audit (every page in `src/pages` and what links to it).** All public pages are linked. Verified by searching for each address:

| Page | Linked from |
|---|---|
| `/about/` | `Hero.astro`, `Footer.astro`, the nav list in `site.ts` |
| `/industries/` | same as `/about/` |
| `/glossary/` | same as `/about/`, plus `plan.astro`, `CableTest`, `CableCompare` and glossary links inside text |
| `/plan/` | `Hero.astro`, and `cta.ts` (used by `NextStep`) |
| `/contact/` | many places |
| `/services/` and the 6 service pages | header menu, footer, explorer, other pages |
| `/privacy/`, `/terms/` | footer, contact form, terms page |
| `/projects/` | hidden; links appear only when `showProjects` is true; built as a redirect to `/` |
| `/styleguide/` | nothing (F13) |
| `404` | served automatically for missing pages |

### Category 2: Duplicate logic

**F15. Business identity for search engines is built twice** (Confirmed · Medium · Small)
- **Background:** JSON-LD is hidden structured data that tells Google who the business is.
- **Where:**
  - `services/[slug].astro:35-48` rebuilds the business by hand: `'@id': \`${site.url}/#business\``, phone, email, address.
  - `seo.ts:25` already exports exactly that ID as `businessId` (unused, per knip), and `seo.ts:73-91` holds the same details.
- **Why it matters:** If the address is added later (there's a TODO at `seo.ts:85`), someone has to remember to add it in both places. Otherwise Google sees two different versions of the business.
- **Fix:** Import `businessId` (and possibly a shared `provider` object) from `seo.ts`.
- **Test:** Compare the JSON-LD in a service page's source before and after, or run Google's Rich Results test on a preview link.

**F16. Two readers for the opening hours** (Confirmed · Medium · Small)
- **Where:** `seo.ts:37-66` (`openingHours`, for Google) and `lib/hours.ts:17-33` (`parseHours`, for "Open now"). They use different patterns.
- **The risk:**
  - The seo version requires `"Mon–Fri · 8 AM – 6 PM"` exactly, with the `·`.
  - The hours.ts version is looser.
  - If someone rewords `site.hours`, one could keep working while the other silently stops. Google's hours would then vanish (only a build warning is printed) while "Open now" keeps showing, or the other way round.
- **Fix:** Have `seo.ts` call `parseHours()` and convert its result.
- **Test:** The build prints no `[seo]` warning. The header "Open now" line still shows.

**F17. Contact links typed by hand; the main button text written about 13 times** (Confirmed · Medium · Medium)
- **Background:** `contactHref()` in `cta.ts` exists so every contact link carries context and lands on the form.
- **Links that bypass it:**
  - `glossary.astro:124` and `:172` (build `?mode=quick` by hand)
  - `plan.astro:161` (`?about=estimate`)
- **Links that use a plain `/contact/`:**
  - `Header.astro:58, 87, 108, 111`
  - `Footer.astro:24, 50`
  - `CtaDock.astro:25`
  - `services/index.astro:44`
  - `about.astro:225`
  - `Hero.astro:44`
- **The visible effect:** Some buttons scroll to the form (`/contact/#form`), others open the top of the page. The text "Request a site assessment" is typed in about 13 places.
- **Fix:** Use `contactHref()` everywhere, and keep the label in one constant in `cta.ts`. The words don't change; the owner fixed the copy.
- **Risks:** Switching plain `/contact/` links to `/contact/#form` *changes where those buttons land*. Ask the owner before doing it.
- **Test:** Click each changed button on phone and desktop. Don't submit the form.

**F18. The contact-details block is written twice** (Confirmed · Medium · Small · R)
- **Where:**
  - `contact.astro:33-53` and its CSS at 90-185
  - `ContactSection.astro:23-43` and its CSS at 64-129
- **What's duplicated:** "Prefer to talk?", phone, email, and the Hours / Support / HQ rows. About 20 markup lines and about 75 CSS lines are identical.
- **Fix:** One `ContactDetails.astro` component.
- **Why wait:** The redesign will restyle both. Merge them first, then restyle once.

**F19. Two "Open now" timers** (Confirmed · Low · Small)
- **Where:** `Hero.astro:93-110` and `Header.astro:251-264` each parse the hours and run their own every-minute timer. On the homepage both run.
- **Fix:** One shared helper in `lib/hours.ts`, for example `mountOpenStatus(el, format)`.

**F20. The search-engine data block is repeated 4 times** (Confirmed · Low · Small)
- **Where:** The same `<script type="application/ld+json" … JSON.stringify(x).replace(/</g,'\\u003c')>` appears at `Base.astro:45/78`, `glossary.astro:48`, `services/index.astro:32` and `services/[slug].astro:107`.
- **Why it matters:** The `.replace` is a safety step. If a new page forgets it, the page could break.
- **Fix:** A tiny `JsonLd.astro` component.

**F21. `PageCta.astro` vs `ServiceCta.astro`** (Confirmed · Low · Small · R)
- **Evidence:** The same structure: Label "Next step", heading, lead text, `NextStep`, the same 12-column grid at 1024px.
- **Differences:** Dark panel with a stripe vs light panel, and one 420px font tweak.
- **Fix:** One component with a `tone` setting, done during the redesign.

**F22. Breadcrumbs written twice** (Confirmed · Low · Small · R)
- **Where:** `ServiceHero.astro:22-28` with CSS at 137-173, and `PageHero.astro:39-47` with CSS at 79-112.
- **Difference:** They make the 44px tap area in two different ways.

**F23. Two "print just this part" systems** (Confirmed · Low · Small)
- **Where:**
  - `ServiceHero.astro:111-129` uses a `body.print-sheet` class plus `beforeprint`/`afterprint` events.
  - `plan.astro:226-234` uses an `html.print-checklist` class plus `afterprint`.
- **Fix:** One helper, `printOnly(className)`.
- **Test:** Print preview of a service page's scope sheet and of the /plan/ checklist.

**F24. The reduced-motion check is rewritten 16 times, inconsistently** (Confirmed · Low · Small)
- **Background:** "Reduced motion" is the phone or computer setting that asks websites not to animate.
- **Where it's checked:**
  - `motion.ts:22`
  - `demo.ts:13` (which exports a shared copy)
  - `ContactForm.astro:665` and again at `:800`
  - `Header.astro:134`
  - `BuildingSvg.astro:741`
  - `CableTest.astro:266`
  - `glossary.astro:201`
  - `Process.astro:124`
  - `plan.astro:283`
  - `ServiceArea.astro:585`
  - `ServiceHero.astro:90`
  - `sheets.ts:10` (dead, F1)
- **The inconsistency:** Some places read the setting once at page load. Others react if the visitor changes it while the page is open.
- **Fix:** Use the one in `demo.ts` everywhere, and pick one behaviour.

**F25. Two stock-photo caption wordings; hero alt text copied** (Confirmed · Low · Small · R)
- **"Illustrative photo":** `Hero.astro:88`, `services/index.astro:56`, `ServicesGrid.astro:31, 43`.
- **"Illustrative photo, not an Armak job site.":** `about.astro:85`, `services/[slug].astro:111`.
- **Copied alt text** (the description for screen readers): `Hero.astro:81` and `services/index.astro:51`.
- **Fix:** Keep the caption in one constant. DESIGN.md rule 2 makes this caption mandatory, so a single source helps.

### Category 3: Unused UI components

**F26. No unused components** (Confirmed · Low · no action)
- **Evidence:**
  - The full import list shows every file in `src/components/` is imported by at least one page or component.
  - Every Button style (`primary`, `ink`, `outline`, `outline-inverse`, `link`) is used outside the styleguide.
- **Dormant on purpose:**
  - `ProjectCard.astro`, `FeaturedProjects.astro` and the two `projects/` pages turn on automatically once a real project has `placeholder: false`.
  - `PlaceholderNote.astro` is used by the hidden About slots (`about.astro:57`, `SHOW_PLACEHOLDERS = false`) and the project pages.
- **Recommendation:** Keep all of them. They wait for content only Armak can supply.

### Category 4: Overly complex implementations

**F27. Very long single files** (Confirmed · Medium · Large · R)

| File | Total lines | How it splits |
|---|---|---|
| `CableTest.astro` | 1357 | about 950 of them CSS |
| `ServiceArea.astro` | 986 | about 420 of them script |
| `ContactForm.astro` | 971 | about 355 of them script |
| `BuildingExplorer.astro` | 959 | — |
| `BuildingSvg.astro` | 888 | — |

- **Also over 600 lines:** `glossary.astro`, `Process.astro`, `DesignDemo.astro`, `plan.astro` and `Header.astro`.
- **Why it matters:** Long files are slow to change safely, and the scripts inside them can't be tested on their own.
- **Recommendation:** During the redesign, move each big script into `src/scripts/<name>.ts`, as `demo.ts` already does. Keep only markup and styles in the component. No visible change.
- **Risk:** The site's security policy (CSP) only allows bundled scripts. That is fine, because moved scripts stay bundled.
- **Test:** Every interactive piece: cable test, explorer, map and city search, form steps, glossary drawer, demos.

**F28. GSAP and Lenis for small effects** (Likely · Medium · Medium)
- **GSAP:** `motion.ts:107-147` downloads GSAP (70 KB), ScrollTrigger (43 KB) and SplitText (7 KB), about 120 KB uncompressed, for one effect. That effect is headings sliding in line by line, on 7 elements (`data-split`).
- **The hero already does without it:** The hero headline uses a CSS-only entrance on purpose (`Hero.astro:47`).
- **Lenis:** Lenis (smooth scrolling, `motion.ts:157`) adds wiring in other files: `Header.astro:180-187` must pause it, the mobile menu needs `data-lenis-prevent`, and `glossary.astro` works around it too.
- **Why "Likely":** Whether the effect is worth it is a design call. DESIGN.md rule 10 keeps "all approved motion".
- **Suggestion for the redesign:** Ask the owner whether CSS-only heading entrances (like the hero) and normal browser scrolling are acceptable. That would remove two of the eight packages.

### Category 5: Legacy code

**F29. `legacy/`: the previous Vite + EJS site** (Confirmed · Low · Small)
- **Evidence:**
  - 28 files, 235 KB.
  - Added as a reference in a99bb1a (2026-10-12).
  - `tsconfig.json:4` excludes it, so it is never built.
  - knip lists its 14 JS files as unused.
  - Nothing imports from it.
- **Impact:** The repository gets lighter; visitors see no change.
- **Risks:**
  - `ai/HANDOFF.md:10-11` says an `old-site` branch backs up the old site at 757cf43. No local `old-site` branch exists, and the remote branch list came back empty.
  - Commit 757cf43 is still in history, so nothing is lost. Before deleting, confirm the branch exists on GitHub or add a tag such as `old-site-backup` on 757cf43. A tag is a permanent name for one point in history.
- **Also update:** `README.md` and `ai/ARCHITECTURE.md`, which both mention `legacy/`.

**F30. `.vite/deps/` is tracked in git** (Confirmed · Low · Small)
- **Evidence:** `git ls-files` lists `.vite/deps/_metadata.json` and `.vite/deps/package.json`. Git log shows them from 757cf43 (2026-05-31, the old Vite site).
- **Why unnecessary:** They are an auto-generated tool cache, and Astro doesn't use them.
- **Fix:** Delete them from git and add `.vite` to `.gitignore`.

**F31. References to deleted `/dev/` pages** (Confirmed · Low · Small)
- **Evidence:** Commit 446f1d5 (2026-10-12) deleted `src/pages/dev/explorer|map-contact|photos|sections.astro`. Two references remain:
  - `public/robots.txt:4` (`Disallow: /dev/`)
  - the sitemap filter at `astro.config.mjs:42`
- **Risks:** None. There is nothing at `/dev/` to protect.

**F32. `.gitignore:20-21` rule for `index.html.legacy`** (Confirmed · Low · Small)
- **Evidence:** No such file exists. It dates from the old site.

**F33. Direction A cleanup** (Confirmed · Low · no action beyond F1)
- **What I searched:** All of `src/` for Direction A words (coupon, receipt, slip, stamp, blueprint, sheet, is-lifted, `.home .`).
- **What's left:** Only `sheets.ts` (F1).
- **Kept on purpose, not leftovers:**
  - the PASS stamp (`CableTest.astro:1003-1067`)
  - the blueprint trace (`BuildingSvg.astro:546, 796`)
  - the thank-you slide-in (`ContactForm.astro:567-583`)
  - These are approved motions the owner kept on 2026-10-31 (DESIGN.md last section).
- **New features from Direction A, all still used:** `CablePlant.astro`, `JobTimeline.astro`, `RoomForLater.astro`.

### Category 6: Network and API calls

**F34. No database and no server code** (Confirmed)
- **Evidence:** `astro.config.mjs` has no server adapter and no server output mode. Every page is plain HTML built ahead of time.
- **Third-party services:** Exactly two: Web3Forms (the form) and OpenFreeMap (the map). This matches the security rules in `astro.config.mjs:24-27`.
- **Not present:** analytics, tracking or advertising scripts.

**F35. The live map is the heaviest thing on the site** (Confirmed sizes · Medium · Medium · owner decision)
- **What it downloads:** When the map nears the screen, `ServiceArea.astro` loads the MapLibre map code (about 1.6 MB uncompressed in total):
  - `maplibre-gl` 1,075 KB
  - its worker 508 KB
  - its CSS 83 KB
  - plus the map style, map tiles, fonts and icons from `tiles.openfreemap.org`
- **Where:** The homepage, /about/ and /contact/.
- **What's already good:** It waits until the map is 300px from the screen (`ServiceArea.astro:862-870`) and stops after 15 seconds. Visitors who never scroll that far download none of it.
- **The simpler option:** The component already has a drawn map of the same cities (it shows when the live map fails). Showing only that version would remove about 420 lines of script, one package, one outside service and two security-policy entries.
- **Risks:** You lose zooming and real streets. The city search still works on the drawn version (`ServiceArea.astro:916`).
- **Test:** Map area on phone and desktop on all 3 pages; the city search.

**F36. Caching, fonts and form calls are fine** (Confirmed · Low)
- **Caching:** `vercel.json:41-48` caches built files for a year. Each file name has a version code that changes when the file changes, so this is safe.
- **Fonts:** Geist and Geist Mono are hosted on the site itself. Browsers fetch only the subsets they need: Latin is about 29 KB plus 23 KB. The Cyrillic and Vietnamese files exist but aren't downloaded.
- **Form:** Web3Forms is contacted only when someone presses Send (`ContactForm.astro:844`).
- **One small improvement:** `public/logo.png` is 243 KB. It is used only as the logo in the search-engine data (`seo.ts:80`). A version of about 20 KB would do, and `scripts/make-brand-images.mjs` can regenerate it.

**F37. Unused original PNGs copied into `dist/`** (Likely · Low · no action)
- **What happens:** The build copies `armak-logo-hd.png` (241 KB), `armak-logo-inverse.png` (256 KB) and the 14 partner-logo PNGs into `dist/_astro/`.
- **Evidence they're unused:** A search of the built pages finds no reference to them. Only the optimized `.webp` versions are used.
- **Why it doesn't matter:** Visitors never download them. It only adds deploy size, and it looks like normal Astro behaviour.

### Category 7: Abandoned or disconnected files

**F38. `public/armak-logo-color.png` (235 KB) and `public/armak-logo.png` (60 KB)** (Likely · Low · Small)
- **Evidence:**
  - Zero references in `src/`, `public/`, `scripts/` or the config files.
  - The only users are the old site's files: `legacy/src/index.html:17, 23, 26-27`, `nav.ejs:5`, `footer.ejs:6`, `hero.ejs:133,138`.
- **Why only "Likely" safe:** The old site used `https://armak.tech/armak-logo.png` as its social-share image. Old LinkedIn or Facebook previews, email signatures or directory listings may still point there.
- **Safe path:** Add a redirect in `vercel.json` from both addresses to `/logo.png`, then delete the files.
- **Test:** After a preview deploy, open both old addresses.

**F39. `ai/ai-context.sh`** (Confirmed · Low · Small)
- **Evidence:**
  - From May 22.
  - It looks for `AGENTS.md`, `ARCHITECTURE.md` and `PROJECT_STATE.md` in the main folder, but they live in `ai/`. It would print "not found" warnings.
  - It writes `ai/CONTEXT_BUNDLE.md`, which doesn't exist, so it hasn't been run.
- **Fix:** Delete it, or fix the paths.

**F40. Out-of-date documentation** (Confirmed · Low · Small)
- **`ai/ARCHITECTURE.md`:**
  - Lists `TestCard` among the UI parts; it is now `CableTest`.
  - Lists `grid-12`, which is unused (F7).
  - Mentions testimonials (F2).
  - Says "five step demos"; there are four plus the trace demo.
- **`ai/HANDOFF.md`:**
  - Line 13 gives the local folder as `C:\Users\Aram\Documents\all-sites\armak-tech`; this copy is at `E:\all-sites\armak-tech`.
  - Lines 10-11 mention the `old-site` branch, which isn't present locally (F29).
- **`scripts/prepare-logos.mjs:2`:** Says the source logos are "in /public"; the code reads `scripts/logo-sources/`.
- **`README.md`:** Mentions `legacy/`. Update it once F29 is done.

**F41. Local test leftovers** (Confirmed · Low · Small)
- **What:** `.playwright-cli/` (5 empty files) and `.playwright-mcp/` (about 9 MB of screenshots and page snapshots from Oct 29-31).
- **Status:** Not in git (they're excluded in `.git/info/exclude`). They are only on this computer.
- **Action:** The owner can delete them any time.

**Searched and found nothing:** I searched the tracked files for backup or copy files (`bak`, `copy`, `old`, `backup`, `~`). The only hit was `PlaceholderNote.astro`, a false match on "old" (in "Placeholder").

**Kept on purpose:**
- `scripts/make-brand-images.mjs` and `scripts/prepare-logos.mjs` are run by hand to rebuild icons and partner logos. `seo.ts:16` and `content.ts:31` refer to them.
- `scripts/logo-sources/` (2.0 MB) holds their input images.

### Category 8: Technical debt

**F42. Outdated packages** (Confirmed · Low · Small)

`npm outdated`:

| Package | Have | Latest | Note |
|---|---|---|---|
| astro | 7.3.8 | 7.4.4 | minor update, safe within 7.x |
| maplibre-gl | 6.13.0 | 6.16.0 | minor update (or removed, F35) |
| @lucide/astro | 1.55.0 | 1.66.0 | minor update |
| lenis | 1.3.26 | 1.3.27 | small fix |
| @astrojs/check | 0.9.10 | 0.9.12 | small fix |
| typescript | 6.0.3 | 7.0.2 | **major version.** Hold until `@astrojs/check` officially supports it |

**F43. The scripts use `sharp` without listing it** (Confirmed · Low · Small)
- **Evidence:** `scripts/prepare-logos.mjs:10` and `make-brand-images.mjs:21` import `sharp`. It isn't in `package.json`; it only works because Astro installs it as a sub-dependency.
- **Risk:** A future Astro update could drop it, and the scripts would then fail.
- **Fix:** Add it under the development-only packages (`devDependencies`).

**F44. No `.env.example`** (Confirmed · Low · Small)
- **Background:** `.env` is the private settings file; an example file is a safe template of it.
- **What's missing:** The only required setting, `WEB3FORMSAPIKEY`, is documented only in the README and HANDOFF. A template with the name and no value helps the next setup.
- **For the owner's information:** Web3Forms is designed so its access key ends up in the page's HTML (`ContactForm.astro:36`), where anyone viewing the page source can read it. That is how the service works, not a leak. Keeping it out of chat and docs is still good practice.

**F45. Facts written into components instead of the data files** (Confirmed · Medium · Small)
- **The rule:** `site.ts:3` says "Never hardcode years, phone numbers or addresses in components".
- **Exceptions found:**
  - `content.ts:361` hard-codes **contact@armak.tech**, a second email not in `site.ts`. The site's email there is sales@.
  - `Numbers.astro:24` and `styleguide.astro:124, 147` hard-code "24/7" / "For contracted clients", though `site.support` holds this.
  - `about.astro:23` writes "Glendale HQ" instead of using `site.hq.city`.
  - `services/[slug].astro:96-103` keeps the six page titles inside the page. They belong in `services-detail.ts`, next to `metaDescription`.
- **Why it matters:** When a fact changes, some copies get missed.
- **Test:** The text shown on each page stays word-for-word the same.

**F46. Breakpoints outside the approved set** (Confirmed · Low · Medium · R)
- **Background:** A breakpoint is a screen width where the layout changes. DESIGN.md allows 420, 640, 900 and 1024 px only.
- **700px:** `Capabilities.astro:71`, `PhotoBand.astro:66`, `ServicesGrid.astro:95, 106`.
- **760px:** `services/index.astro:316`.
- **1000px:** `Hero.astro:385`, `contact.astro:187`, `ContactSection.astro:131`, `BuildingExplorer.astro:709, 747, 943`, `DeliverySteps.astro:99`, `PhotoBand.astro:89`, `services/index.astro:169`.
- **1100px:** `Capabilities.astro:97`, `OtherServices.astro:122`, `PartnerLogos.astro:114`, `PartnerStrip.astro:91`, `ServicesGrid.astro:106, 129`, `services/index.astro:332`.
- **Note:** Many of these came back with the live site's look, so the owner's 2026-10-31 decision may cover them. Settle this in the redesign.

**F47. Random IDs make every build different** (Confirmed · Low · Small)
- **Where:** `CableTest.astro:25` and `InstallDemo.astro:16` create IDs with `Math.random()` at build time.
- **Effect:** The HTML changes on every build even when nothing was edited. Before/after comparisons get noisy, and this would hide a real change in the "compare dist" test suggested in the plan below.
- **Fix:** Use a counter, or an ID made from the component's settings.

**F48. The footer call-to-action default is backwards** (Confirmed · Low · Small)
- **Evidence:** `Base.astro:33` defaults `footerCta = true`, but 13 of the 17 page files pass `footerCta={false}`. It shows only on 404, privacy, terms and styleguide.
- **Fix:** Flip the default so new pages don't need to remember to turn it off.

**F49. Small fragile workarounds** (Confirmed · Low · Small)
- **Phone link:** `ContactForm.astro:641` rebuilds the phone link from the displayed number (`tel:+1` plus its digits) instead of using `site.phoneHref`. `ServiceArea.astro:879` does it the right way, using a data attribute. If the phone format ever changes, the form's link could break.
- **Map colors:** `ServiceArea.astro:571-573` writes the brand colors into the code by hand, "because MapLibre cannot read CSS variables". The same file reads CSS variables at lines 888-892, so it could do the same here.
- **Older code style:** `ServiceHero.astro:88-129` uses an older JavaScript style (`var`, wrapped functions) unlike every other script. **(R)**

**Not recommended for removal:**
- the hidden About slots (`SHOW_PLACEHOLDERS`)
- the dormant Projects area
- the record fields in `content.ts` (`signature.confirmedBy`/`confirmedOn`, `wifiGenerations[].date`, `lifespans.*.basis`, `lifespans.devices`). They trace each fact to its source and are documented as intentional.

---

## 4. Cleanup plan

Rules for every batch:

- The owner approves the exact path list before anything is deleted.
- One commit per batch, so undoing a batch is one `git revert <commit>`.
- Work on a branch and check the Vercel preview link. A branch is a separate line of work that doesn't touch the live site.
- Never submit the contact form.

**Standard tests for every batch:**

1. `npx astro check` shows 0 errors, and `npm run build` shows "18 page(s) built".
2. Open every page on the preview link: `/`, `/about/`, `/contact/`, `/glossary/`, `/industries/`, `/plan/`, `/privacy/`, `/terms/`, `/services/`, all 6 service pages, a made-up address for the 404 page, and `/projects/` (it should send you to the homepage).
3. Check each page on a phone (375px wide) and a desktop (1440px wide).
4. Contact form: it appears, step 1 to step 2 works, and the Back button works. Don't press Send.
5. The map loads on `/`, `/about/` and `/contact/`, and the city search answers.
6. The cable test, building explorer, process demos and glossary popovers still work.

### Batch 1: Confirmed dead code, no references, no visible change (about 30 minutes)

**Files and lines:**
- Delete `src/scripts/sheets.ts` (F1).
- `src/data/content.ts`: delete 179-191 and fix the comment at 5-7 (F2). Remove `export` from 208 (F5).
- `src/lib/cta.ts:36` (F3).
- `src/lib/glossaryLinks.ts:175-180`: remove the `export default` line and its comment (F4).
- Remove the word `export` at `src/data/glossary/index.ts:40`, `src/data/services-detail.ts:22` and `src/data/seo.ts:26` (F5).
- `src/scripts/motion.ts`: lines 5 and 30-35 (F6).
- `src/styles/global.css`: 168-170, 188-197, 209-211 (F7).
- `src/pages/projects/index.astro`: 17, 33-41, 65-84, 91-97 (F9).
- `src/components/pages/PageHero.astro`: 7, 18-19, 28-29. `src/components/services/ServiceCta.astro:10` (F10).
- `public/robots.txt:4`, and the `/dev/` part of `astro.config.mjs:42` (F31).
- `.gitignore:20-21` (F32).

**Extra test:** Compare a copy of `dist/` from before and after. Only the inlined CSS and the main script should differ. The random IDs from F47 will also differ, so ignore those.

### Batch 2: Old-site leftovers that are never shipped (about 30 minutes)

- **First:** Confirm the `old-site` branch exists on GitHub, or tag 757cf43 as `old-site-backup`.
- Delete `legacy/` (F29).
- Remove `.vite/deps/_metadata.json` and `.vite/deps/package.json` from git, and add `.vite` to `.gitignore` (F30).
- Delete or fix `ai/ai-context.sh` (F39).
- Update `ai/ARCHITECTURE.md`, `README.md`, `ai/HANDOFF.md:10-14` and the comment at `scripts/prepare-logos.mjs:2` (F40).
- **Test:** The standard tests. Nothing visible should change.

### Batch 3: Public files that outside links might use (about 30 minutes)

- In `vercel.json`, add redirects from `/armak-logo.png` and `/armak-logo-color.png` to `/logo.png`. Then delete both files from `public/` (F38).
- Optionally, regenerate a smaller `public/logo.png` (F36).
- **Test:** On the preview link, open both old addresses; each should show the logo. Then run the standard tests.

### Batch 4: One source for facts and links (a few hours, in files the redesign won't restyle)

- **F15:** Use `businessId` and the shared business details in `services/[slug].astro`.
- **F16:** Make `seo.ts` use `parseHours()`.
- **F20:** A `JsonLd.astro` component for the 4 search-engine data blocks.
- **F19:** One shared "Open now" helper.
- **F23:** One print helper.
- **F24:** One reduced-motion helper.
- **F45:** Move contact@armak.tech, the "24/7" text, the HQ city and the service page titles into `site.ts` / `services-detail.ts`.
- **F47:** Stable IDs.
- **F49:** Phone link from `site.phoneHref`.
- **F43:** List `sharp` under development packages.
- **F44:** Add `.env.example` with the name only.
- **F42:** Package updates, except TypeScript 7.
- **F17:** Use `contactHref()` and one label constant. **Ask the owner first:** some buttons would start landing on the form instead of the top of the contact page.
- **Extra tests:**
  - Compare the search-engine data in the page source of `/` and one service page before and after; it should be the same.
  - Check that "Open now" appears in the header and the hero.
  - Print preview of the scope sheet and the checklist.
  - Click each CTA button.

### Batch 5: Wait for the redesign (do it while those files are open anyway)

- **F18:** A `ContactDetails` component.
- **F21:** Merge PageCta and ServiceCta.
- **F22:** One breadcrumb.
- **F25:** One caption constant.
- **F8:** Unused spacing values.
- **F46:** Breakpoints.
- **F27:** Move long scripts into `src/scripts/`.
- **F48:** Flip the footer CTA default.
- **F49:** Rewrite the older-style ServiceHero script.

### Batch 6: Owner decisions (bigger changes, each one its own commit)

- **F35:** Live map vs drawn map only. Saves about 1.6 MB on 3 pages and removes one outside service.
- **F28:** CSS-only heading entrances instead of GSAP, and normal scrolling instead of Lenis.
- **F13:** Keep `/styleguide/` public, or stop building it in production.
- **F11:** Keep and connect `?start=` to the CTAs, or remove it.

---

## What I ran, and what I skipped

**Commands run:**
- `npx astro check`: 0 errors, 0 warnings, 0 hints (88 files).
- `npm run build`: passed, 18 pages. It writes only `dist/` and `.astro/`, both ignored by git.
- `npm outdated`.
- `npx -y knip`: this downloaded knip into the npm cache, which is outside the project.
- I did not run `depcheck`. knip already covers unused packages and reported none.

**Final check:** `git status --short` printed nothing. Nothing in the project changed. HEAD is still 794120f on `intent-redesign`.

**Skipped:**
- `node_modules/`, `.astro/`, `.git/` internals, `package-lock.json`
- `dist/`: only read for build-output evidence
- `.vercel/`: not present
- `reports/`, `research_notes/`, `ai/plans/`, `ai/research/`
- the contents of `.playwright-cli/` and `.playwright-mcp/`: listed only
- `.claude/`
- the wording inside the glossary data files (`src/data/glossary/a-c.ts` to `s-z.ts`, about 200 KB of copy): I checked only how they are structured and imported
- `.env`: never opened