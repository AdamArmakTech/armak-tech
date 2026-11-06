# Project State

## Status — the redesign is LIVE on armak.tech (since 2026-10-12)
- `main` = live site (Vercel builds every push to `main` to production; other branches get previews).
- `redesign` = same as `main` (kept in sync).
- `old-site` = the previous Vite + EJS site, untouched backup (commit 757cf43). Its Vercel deployment
  is also still in the dashboard for one-click rollback.
- Plan / design rationale: `ai/plans/redesign.md` ("Precision Infrastructure", light editorial, Astro).

## Owner answers 2026-11-05 (audit questions 1-21 and the Batch 6 decisions)
Asked and answered in chat on 2026-11-05, four yes/no questions at a time. The work landed the same day on branch
`intent-redesign` (commits 59c7773, 084e0dc, 7c3a448, dc768b8, NOT pushed); see the top "Done" bullet.
- Licence (CSLB), bonded, insured, BICSI-certified: NOT SURE (all four). "Licensed · Bonded · Insured" and
  "BICSI-certified technicians" come off the site until the owner confirms them. When "Licensed" returns, the CSLB
  number must be shown with it.
- Keep "946+ projects delivered": yes. All five building types (healthcare, education, apartments, public sector,
  industrial) are real past work: yes. Clients get the cable test reports: yes. Every job is priced in a written
  proposal after a site walk: yes.
- Brands: keep all except Hikvision (off the partner strip; the logo file stays until the owner approves deleting it).
- Contact form: phone stays required; add the free hCaptcha checkbox (not Web3Forms Pro). Web3Forms is on the free
  plan and someone reads the account email. Form emails are kept as business records (no deletion period).
- Email: the sales@ inbox is Microsoft 365 bought through GoDaddy. The domain's MX records point to Proofpoint's
  filter (`mx1/2/3-usg2.ppe-hosted.com`, nslookup 2026-11-05), so incoming mail passes through Proofpoint first.
- /styleguide/ comes off the live site (dev server only). Street address: no, city only. Vercel Speed Insights: no.
  Lawyer review of /terms/ and vendor agreements: dropped from the list. Privacy page: approved that evening as it
  reads at ad9466b (after three rounds of changes, see the top "Done" bullet).
- Batch 6: keep the live map (F35); keep GSAP and Lenis (F28); `?start=` (F11) was already gone, nothing to do.
- Three small fixes approved: readable dimmed rows in the homepage site-walk demo, a 15-second limit on the form's
  Send, an "Open-source notices" page.
- Still for the owner: (1) check the CSLB licence, bond, insurance and BICSI status and say which claims may go
  back; (2) turn on hCaptcha for the form in the Web3Forms dashboard (app.web3forms.com) so the check is enforced
  on their side too (the site shows the box either way); (3) done: /privacy/ approved 2026-11-05 evening (ad9466b).

## Done
- **Owner answers applied — 2026-11-05 (branch `intent-redesign`, commits 59c7773, 084e0dc, 7c3a448, dc768b8, NOT pushed).**
  Run as 5 Sonnet workers (own files each) + Opus proofreader (verdict FIX: one "must", applied; the "should" notes
  applied too). 59c7773: "Licensed · Bonded · Insured" and "BICSI-certified technicians" are off the homepage, About
  and Services (owner not sure); the three-item list now reads "A written plan and price for every job · Cable test
  reports delivered to you · 24/7 support for contracted clients"; About heading "Written plans, test reports and
  support."; Hikvision off the partner strip (13 logos, the last one spans the leftover cells;
  `src/assets/partners/hikvision.png` is still on disk, unused, until the owner approves deleting it); a service page
  with four logos shows a 2 x 2 block on tablets. 084e0dc: `/styleguide/` answers "204 No Content" in a production
  build, so no file is written (the dev server still serves it); sitemap filter kept, robots line removed; the CSP
  allows hcaptcha.com and *.hcaptcha.com (script, frame, style, connect). An `injectRoute` dev-only route was tried
  first and crashed `astro dev`: the app starts servers from `C:\Users\Aram\Documents\all-sites\armak-tech` (the
  link) while Node resolves files to `E:\`, so Astro built a cross-drive path. 7c3a448: contact form hCaptcha
  checkbox (Web3Forms' published free-plan site key, loaded only when step 2 shows, compact size when the box has
  under 303px of room, refuses to send until ticked, resets after a failed send, `g-recaptcha-response` not
  forwarded, noscript line with the phone); 15-second send limit via `AbortSignal.timeout` (older browsers send
  without a limit); privacy page names hCaptcha, the Proofpoint filter and the Microsoft 365 mailbox (GoDaddy),
  says form emails are kept as business records, states the one browser-storage exception, effective 5 November
  2026 (APPROVED by the owner that evening as it reads at ad9466b, after the changes noted below; PDFs went to his
  phone from `ai/exports/privacy-page-2026-11-05.pdf`, folder ignored by git). dc768b8: `/open-source/` notices page (copyright lines and licence texts imported from
  node_modules with `?raw`; the GSAP entry says its licence is not open source), footer link; AssessDemo rows the
  demo has not reached are set in steel (5.9:1 on paper) instead of 55% opacity (2.3:1). Checks: astro check 0
  errors; build 18 pages (styleguide: "file not created, response body was empty"); every page compared with a
  clean build of f8e75fa (only the intended words, links and the new page differ); production preview in the
  browser: hCaptcha renders with no console or CSP errors at desktop and 320px, the empty-box guard blocks sending
  (tested with the form pointed at a dead address; no request left the page), the dev server serves /styleguide/,
  the preview returns the 404 page for it. Not testable by Claude: a real send with a ticked box (Claude may not
  complete captchas) and the 15-second timeout path; both reviewed in code by the proofreader. Owner answered the
  proofreader's question the same evening: form emails are kept as business records and NOT deleted on request
  (first "yes, delete on request", then "nevermind keep them"), so "ask us to delete it" came off /privacy/
  ("Your choices" now offers a copy or a correction). Later the owner asked whether the page had to be so specific;
  the law (CalOPPA, Bus. & Prof. Code 22575(b)(1)) asks for categories of third parties, and three contractors'
  policies plus Termly's template name kinds only, so "Who else handles it" now lists kinds of services (hosting,
  form delivery, email and spam filter, human check, map) with a "when the law requires it" line; the company
  names stay in the file's header comment. Then "you can't condense this?": the page went from eight sections
  (405 words) to five (273 words), same facts, same legal items (what is collected, kinds of recipients, how to
  ask for a copy or correction, Do Not Track, children, changes, effective date). Open: (1) the owner must turn on hCaptcha in
  the Web3Forms dashboard so the check is enforced on their side; (2) hCaptcha shows "localhost detected" on the
  local preview only; tick the box once on the Vercel preview URL after the next publish.
- **Code cleanup, Batches 3 and 4 — 2026-10-31 and 2026-11-05 (branch `intent-redesign`, commits 06ca766 and 2267b24, NOT pushed).**
  Batch 3 (F38): the two unused old logo files are gone; `vercel.json` redirects their old addresses to `/logo.png`
  (the redirect only runs on Vercel, so check it after the next publish). Batch 4, owner answered two questions
  on 2026-11-05 (red buttons land on the form: yes; package updates: yes): `seo.ts` reads the hours with
  `parseHours()` and exports `businessProvider` for the service pages; `JsonLd.astro` replaces the four hand-written
  structured-data lines; `mountOpenStatus()` in `hours.ts` is the one "Open now" timer (header + hero);
  `prefersReducedMotion()` in `demo.ts` replaces 16 hand-written checks (the four process demos decide once per
  demo so a mid-page setting change never leaves one blank); `CTA_LABEL` + `contactHref()` on every button, and
  the header, footer, phone bar, services index, About and style-guide buttons now open `/contact/#form` like the
  rest (plain "Contact" links unchanged); `site.supportHours/supportScope`, service page titles in
  `services-detail.ts`, About uses `site.hq.city`; stable ids in CableTest/InstallDemo; form phone link from
  `site.phoneHref`; map colours from the CSS tokens; packages updated within their majors (astro 7.4.7,
  maplibre-gl 6.16.0, @lucide/astro 1.69.0, @astrojs/check 0.9.12, gsap 3.15.1, lenis 1.3.27), sharp listed as a
  dev dependency, `.env.example` added (name only). Not needed after all: F23 (one print helper left since
  1b3fd7b) and the contact@ part of F45 (already gone). Run as 8 Sonnet workers in two groups + Opus proofreader
  (go; its 7 notes applied). Checks: astro check 0 errors, build 18 pages, every page compared before and after
  (same words, same JSON-LD, only the approved links changed), browser checks incl. the reduced-motion setting,
  0 console errors. Left from the review: Batch 6 (owner decisions: live map vs drawn map, GSAP/Lenis,
  `/styleguide/` public or not, the `?start=` option; all decided 2026-11-05, see the bullet above) and Batch 5 (with the redesign).
- **Code cleanup, Batches 1 and 2 — 2026-10-31 (branch `intent-redesign`, commits 216ab1a and cebf891, NOT pushed).**
  From the plan in `ai/CODE_REVIEW_2026-10-31.md`; owner approved each path list. Batch 1: dead code removed
  (F1-F7, F9, F10, F31, F32), no visible change. Batch 2: `legacy/` (29 files), tracked `.vite` cache and
  `ai/ai-context.sh` removed; README, ARCHITECTURE, HANDOFF and the prepare-logos comment updated (F29, F30, F39, F40).
  The old site stays on the GitHub `old-site` branch (757cf43, checked 2026-10-31). Checks: astro check 0 errors,
  build 18 pages, browser check clean. Left: Batch 3 (old logo files, needs path-list approval), Batch 4 (one source
  for facts/links; F17 needs owner OK), Batch 6 (owner decisions). Batch 5 waits for the redesign. The unused
  `"legacy"` exclude in `tsconfig.json` can go with Batch 4.
- **Seven UI details — 2026-10-30 (commit 699ae0e).** Open/closed status by the phone (hours.ts, from site.hours,
  Los Angeles time); estimator numbers carried into the contact form (`?note=` in cta.ts + ContactForm prefill with
  Clear); hover/tap definitions on glossary links (TermPopover.astro); "Do you cover my city?" search over the
  service-area map (no coverage claims beyond the 24 cities); building-type chooser + room hover in the explorer
  (industry→systems mapping moved to content.ts); printable scope sheet on service pages. All verified in a clean
  browser tab: no console errors, 44px targets, existing ?about/?mode/?intent intact.
- **Four additions — 2026-10-30 (same branch, commits cf49bea, b76288b).** (1) Glossary links inside service
  pages: `src/lib/glossaryLinks.ts` underlines up to 4 trade words per capability/FAQ answer (longest match first,
  common words demoted, JSON-LD stays plain). (2) Restrained motion per DESIGN.md rule 10: map dots land one by one,
  scope-sheet rows reveal, step number ticks, explorer layer strokes draw in; all once, reduced-motion safe.
  (3) "Trace a cable" demo under the Install step (TraceDemo.astro): tap a jack, the route lights to its labeled port.
  (4) "Which cable?" table on /plan/ (CableCompare.astro): Cat 6 / Cat 6A / OM4 / OS2 with figures tied to named
  standards; cards below 900px. Owner's checklist for the remaining ideas: `ai/FATHER-CHECKLIST.md`.
- **Intentional design refresh — 2026-10-29/30 (branch `intent-redesign`, 8 local commits d52a464..c9d3ab3, NOT pushed).**
  Rulebook: `ai/DESIGN.md` (ten rules; CLAUDE.md points at it). Done: tokens (spacing scale `--sp-*`, `--text`,
  smaller display/h1/h2, section rhythm 64–112px, four breakpoints 420/640/900/1024), section openers without
  index labels, sans breadcrumbs/labels/footer/menu, ink header button, every page ends in a dark Next-step band
  into the footer (contact page excepted: the form is the action; privacy/terms/404 use the footer's own CTA),
  no T568B stripe outside the cable test, red only on the one action + FAIL. Homepage: headline → one red button →
  two plain routes → cable test card (no stock photo); order Hero → Partners → Process → Explorer (click-only, with
  "All services" foot) → Numbers → Industries → Service area → Contact band; duplicate services grid removed.
  Service pages: h1 = service name + headline line, scope sheet sans, stock photo captioned "Illustrative photo,
  not an Armak job site.", dark band last. About: no stock photo, facts aside. Plan: worksheets + dark band.
  Heights: home 11,721→8,217px desktop, 16,634→11,954px phone; every page shorter except /plan/ at 375 (+195px).
  Checks: astro check 0 errors; 16 pages × 4 widths screenshotted before/after in `reports/redesign/`;
  Playwright pass clean (0 console errors, 0 broken links, no sideways scroll); CTA handoff test 15/15;
  proofreader pass 2 items all addressed except owner calls below. Owner decisions taken: keep "Built for the
  future.", keep 946+, keep smooth scroll/heading reveals, product photos not stock (rights pending, see Q12–14).
  Owner decisions 2026-10-30: /contact/ keeps no dark band (form is the action); HQ map dot stays red; the
  networking service is named "Networking & Wi-Fi" everywhere (site.ts). Still open: "publish" to push
  `intent-redesign` → main.
  Approved 2026-10-30 afternoon: the ten extra animations ("All ten") and the ten diagram features ("All of them"); list, order of work and gating in `ai/plans/motion-and-diagrams.md`. Features 7-10 show only facts the owner confirms himself (he makes the decisions, 2026-10-30); the questions are in `ai/FATHER-CHECKLIST.md` section A.
  Owner confirmed all ten signature practices in chat (2026-10-30, about 15:30): Cat 6A default, two drops per access point, spare fiber strands, empty conduit + pull string, rack/power headroom, zone cabling, ceiling-grid jacks, identical jacks (role at the switch), open standards, labels both ends + handover drawings. Features 7-10 are unblocked.
  Warranty partner status: owner says yes (2026-10-30, both CommScope and Panduit, named by the owner the same day; one warranty sentence allowed, see ai/plans/motion-and-diagrams.md). Own-words line for the sheet: none ("everything").
- **Mobile usability pass — 2026-10-29 evening (local commit e875cc0, NOT pushed).** From a Vercel Web Design
  Guidelines review + Playwright pass over all 15 pages (clean: 0 console errors, 0 broken links, no sideways
  scroll). Fixed: 44px call icon in the header below 1200px; menu button reads "Close menu" when open; form send
  error is role=alert, scrolled into view and focused; tap targets on hero/footer links, "Change", terms/privacy;
  --fs-label 12→13px; red focus ring on form fields; phone numbers never wrap (.tel); 10–13px content text raised
  to 13–14px; buttons wrap below 400px. Proofreader: GO after a missing-space fix in the hero.
  Taste critique (report only, 8 items) is in the session transcript; owner picks what to do next.
- [x] Design system, homepage, 6 service pages + overview, About, Industries, Contact, 404 (Astro 7)
- [x] Glossary: /glossary/ — 140 plain-English terms with Q&A (drawer), search, A–Z, JSON-LD; in the main menu
- [x] "How every job runs" stepper: live demo per step (Assess, Design, Install, Certify cable test, Support)
- [x] SEO basics: business JSON-LD (src/data/seo.ts), og-image + favicons (scripts/make-brand-images.mjs), robots.txt, sitemap
- [x] Launch prep: About placeholders hidden (`SHOW_PLACEHOLDERS` in about.astro), Projects area hidden
      until a real project exists (`showProjects` in content.ts), internal dev pages removed
- [x] Tagline changed to "Built for the future." (hero + share image) — 2026-10-12
- [x] AI-slop cleanup — 2026-10-13: AI-looking original photos replaced/removed (old public/ images gone),
      stock phrases rewritten ("no guesswork, no surprises", "Global-grade excellence", "Zero shortcuts", …),
      most em-dashes cut from page copy, decorative "Fig." tags removed. Facts unchanged.
- [x] Security headers — 2026-10-14: CSP via Astro `security.csp` (meta tag, inline script/style hashes generated each build; `frame-ancestors` stays in vercel.json), HSTS (no preload), nosniff, Referrer/Permissions-Policy, no framing, immutable /_astro cache; glossary bad-hash guard; styleguide inline handler removed
- [x] Bug pass — 2026-10-14: install demo replay no longer sticks on "before", stale cable-test marks guarded, mobile menu keeps focus inside (background inert, Esc returns to toggle), service JSON-LD phone from site.ts, styleguide cable-test link fixed
- [x] Copy pass — 2026-10-14: "free" dropped from menu assessment line, duplicate pillar/step text split, About credential matches site.ts support wording, About CTA no longer repeats Contact lead, services/glossary em-dash pauses and stock phrases cut, duplicate glossary analogies removed, glossary label "Analogy", 404 caption built from live routes. Open for owner: confirm BICSI.
- [x] CTA pass — 2026-10-14: phone-only sticky assessment/call bar (CtaDock; after the hero CTAs, hides over closing CTAs, contact form, footer, open menu, focused fields; off on /contact/), ink prompts after the homepage stepper and service delivery steps, glossary drawer CTA, quiet link per Industries row, FAQ call/contact line; shown on /styleguide/ (SG-08)

## Done 2026-10-14/15 (multi-agent round, stopped by user + usage limits, partial work published)
- [x] Demo phone polish: Design 633px, Install 634px, Support 625px, cable test 990px at 375px (was 700–1450); readable SVG labels
- [x] Site audit written: ai/plans/site-audit.md (3 MUST, 11 SHOULD, 11 NICE + questions for Armak)
- [x] Privacy policy page /privacy/ (draft — Armak should review) + links in footer and under the contact form
- [x] Partly done from the audit: --pass darkened + --field-line token, mobile menu inert + Escape focus, 404 caption,
      glossary/em-dash + "actually" cleanup (partial), About timeline hidden, some speed work (inlined CSS, hero tweaks)

- [x] Guided CTAs — 2026-10-21: hero sorts visitors by intent (quote / planning / something broken), standard NextStep block
      (src/components/ui/NextStep.astro) at the end of every page, CTAs carry context into the form (src/lib/cta.ts →
      ?about / ?mode=quick / ?intent=support), Next ↓ guide links between homepage sections, explorer "Ask about X",
      glossary "Ask about this term", new /plan/ page (site-walk checklist, rough estimator, cabling check, sample report)

- [x] Safety checklist run — 2026-10-29 (25 agents, all 5 masters GO; commit d0afa3c; log in ai/plans/safety-run.md):
      /terms/ page added; /privacy/ verified against the code; two unsourced promises removed; 24/7 label and industries
      heading softened; contrast tokens fixed (--field-line on fields, --placeholder, --signal #d0101a, --pass #167640);
      alt/aria on all graphics; explorer showed all six panels stacked (live bug) → one at a time; stepper/explorer pause
      on focus/hover and resume; mega-menu Shift+Tab; form error live regions + project-type required marker; /plan/
      375px overflow fixed; em-dashes out of visible copy; vague buttons/question headings rewritten; 30 decorative
      icons removed; scroll fade-ins ~107 → ~14; hero card overlap fixed; JSON-LD hours derived from site.ts.

## Still to do (see ai/plans/site-audit.md for exact fixes)
- [x] MUST 1 — done 2026-10-30: www.armak.tech added to the Vercel project as a 308 permanent redirect to armak.tech (owner said yes in chat); certificate issued, https://www.armak.tech/ now lands on https://armak.tech/ (HTTP 200).
- [ ] License number on the site (CSLB). Owner "not sure" 2026-11-05 (parked 2026-10-30; a public CSLB search for "Armak" found no license). "Licensed · Bonded · Insured" is off the site since 2026-11-05 until confirmed.
- [ ] BICSI-certified techs and bonded/insured: owner "not sure" 2026-11-05; the claims are off the site until he confirms them.
- [x] MUST 2 — confirmed by owner 2026-10-30: 24/7 support is for contracted clients only (matches the site).
- [ ] SHOULD (left): real /projects/ redirect in vercel.json; Hero quick links (add Services)
- [ ] Finish speed pass (measure LCP/bytes, font subsets, cache headers) and verify nothing changed visually
- [ ] Decide whether to delete legacy/ (redundant with the old-site branch)

## Marketing direction to build in (from the owner)
"We engineer with the future in mind" — see the user's memory note; needs real examples from Armak first.

## Needed from Armak (blocking some hidden sections)
- Social profiles (for Google business data). Street address: owner said no, city only (2026-11-05).
- License number + classification (`site.license` in `src/data/site.ts`) → unhides the license row on About
- Certifications list (BICSI: owner not sure 2026-11-05; the claim is hidden until confirmed)
- 3 real projects with scope numbers (`projects` in `src/data/content.ts`, `placeholder: false`) → unhides Projects
- 2–3 testimonials with permission, client-logo permissions
- Milestones since 1998, team names/roles/photos (industries answered 2026-11-05: all five building types are real work)
- Real job-site photos (all photos are interim stock; never caption them as Armak work)
- Vector (SVG) logo if one exists
- Confirm service-page capabilities "Racks, patching & cable management" and "Firewalls / site-to-site VPN";
  TIA-606 labeling; cable tester brand; any voice/UC vendor partners

## Owner questions from the 2026-10-29 safety run (yes/no where possible)
1. CSLB license number? California generally requires it in advertising; `site.license` is still null. → 2026-11-05: not sure; claim hidden.
2. Are the technicians BICSI-certified today? Is the business licensed, bonded and insured? → 2026-11-05: not sure on all four; claims hidden.
3. Healthcare, education, multifamily, public sector, industrial: real past work, or only "planned for"? → 2026-11-05: real past work in all five.
4. Card/mobile access, conference rooms, signage, distributed audio: offered?
5. Show 946+ projects, 1,000+ (old site), or an exact count? → 2026-11-05: keep 946+.
6. Do clients get the cable test reports? Is pricing always a written proposal after a site walk? → 2026-11-05: yes and yes.
7. All 14 partner brands really installed/supported? (Hikvision is restricted for some government work.) → 2026-11-05: all except Hikvision.
8. Keep phone as a required form field? → 2026-11-05: yes.
9. Web3Forms: restrict the access key to armak.tech in their dashboard; how long do they keep submissions? → 2026-11-05: free plan (key restriction is a Pro feature; owner chose the hCaptcha box instead); retention still unknown.
10. Lawyer: review terms "as is"/liability wording; venue clause yes/no and which county. → 2026-11-05: owner dropped this item.
11. Which email provider hosts the sales inbox (it handles form data too)? → 2026-11-05: Microsoft 365 via GoDaddy, Proofpoint filter in front.

## Backlog
- [ ] Automated verification/linting beyond `astro check`

## Owner questions added 2026-10-29 (evening, design refresh)
12. **Product photos (owner wants Ubiquiti-style product shots).** Only Crestron's published terms let an
    *authorized dealer* reuse its photos; 4 Crestron images (5000px) are saved under
    `E:\Claude Installs\Asset Libraries\Product photos - manufacturer press kits\`. Is Armak a Crestron
    Authorized Dealer? (yes/no)
13. Cisco and Meraki allow partner use but need a free partner login (Cisco Brand Exchange; Meraki Partner
    Portal). Who at Armak can log in and download the Catalyst 9000 / current MS-MR-MX images?
14. For Ubiquiti, Axis, Fortinet, Netgear, Hikvision, Honeywell, Aruba/HPE, Bosch, LTS, CommScope and
    Panduit: ask the sales rep for a dealer image pack (the exact contacts/URLs are in that folder's README).
    Until images with rights arrive, service pages keep the interim stock photos, captioned as illustrative.
15. Design rules now live in `ai/DESIGN.md`. Decisions taken 2026-10-29: keep "Built for the future.",
    keep the 946+ figure showing, keep smooth scroll and heading animations, product photos not stock.
