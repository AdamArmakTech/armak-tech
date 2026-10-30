# Project State

## Status — the redesign is LIVE on armak.tech (since 2026-10-12)
- `main` = live site (Vercel builds every push to `main` to production; other branches get previews).
- `redesign` = same as `main` (kept in sync).
- `old-site` = the previous Vite + EJS site, untouched backup (commit 757cf43). Its Vercel deployment
  is also still in the dashboard for one-click rollback.
- Plan / design rationale: `ai/plans/redesign.md` ("Precision Infrastructure", light editorial, Astro).

## Done
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
- [ ] MUST 1: www.armak.tech has no TLS cert → Vercel → Settings → Domains → add www.armak.tech as redirect to armak.tech (owner action)
- [ ] MUST 2: 24/7 — site now says "24/7 support for contracted clients" everywhere; confirm with Armak
- [ ] SHOULD (left): real /projects/ redirect in vercel.json; Hero quick links (add Services)
- [ ] Finish speed pass (measure LCP/bytes, font subsets, cache headers) and verify nothing changed visually
- [ ] Decide whether to delete legacy/ (redundant with the old-site branch)

## Marketing direction to build in (from the owner)
"We engineer with the future in mind" — see the user's memory note; needs real examples from Armak first.

## Needed from Armak (blocking some hidden sections)
- Street address + ZIP, social profiles (for Google business data)
- License number + classification (`site.license` in `src/data/site.ts`) → unhides the license row on About
- Certifications list (BICSI is claimed on the old site — confirm)
- 3 real projects with scope numbers (`projects` in `src/data/content.ts`, `placeholder: false`) → unhides Projects
- 2–3 testimonials with permission, client-logo permissions
- Which industries they actually serve, milestones since 1998, team names/roles/photos
- Real job-site photos (all photos are interim stock; never caption them as Armak work)
- Vector (SVG) logo if one exists
- Confirm service-page capabilities "Racks, patching & cable management" and "Firewalls / site-to-site VPN";
  TIA-606 labeling; cable tester brand; any voice/UC vendor partners

## Owner questions from the 2026-10-29 safety run (yes/no where possible)
1. CSLB license number? California generally requires it in advertising; `site.license` is still null.
2. Are the technicians BICSI-certified today? Is the business licensed, bonded and insured?
3. Healthcare, education, multifamily, public sector, industrial: real past work, or only "planned for"?
4. Card/mobile access, conference rooms, signage, distributed audio: offered?
5. Show 946+ projects, 1,000+ (old site), or an exact count?
6. Do clients get the cable test reports? Is pricing always a written proposal after a site walk?
7. All 14 partner brands really installed/supported? (Hikvision is restricted for some government work.)
8. Keep phone as a required form field?
9. Web3Forms: restrict the access key to armak.tech in their dashboard; how long do they keep submissions?
10. Lawyer: review terms "as is"/liability wording; venue clause yes/no and which county.
11. Which email provider hosts the sales inbox (it handles form data too)?

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
