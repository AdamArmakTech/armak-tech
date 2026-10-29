# Handoff — armak.tech redesign (written 2026-10-29)

Read this first in a new session. It holds everything that lived only in the previous conversation.
Then read `ai/PROJECT_STATE.md` (status + to-dos), `ai/plans/site-audit.md` (audit findings) and `ai/AGENTS.md` (rules).

## Where things are
- **Live site:** https://armak.tech — built by Vercel from GitHub **AdamArmakTech/armak-tech**, branch **`main`**.
  Every push to `main` goes live in ~2 min. Other branches get preview URLs. Vercel project: `armak-tech`
  (team adamarmaktechs-projects). Owner logs into Vercel with an email, not GitHub.
- **Branches:** `main` = live; `redesign` = kept identical to main; `old-site` = untouched backup of the
  pre-redesign site (commit 757cf43; its Vercel deployment can also be rolled back to). `feat/reconfigure-structure`
  is Carlitos's old branch from May (unused).
- **Local folder:** `C:\Users\Aram\Documents\all-sites\armak-tech`. Pushing uses `gh` credentials:
  `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push https://github.com/AdamArmakTech/armak-tech.git HEAD:refs/heads/main`
  (the machine's SSH key is not registered on GitHub). Push `redesign` the same way to keep it in sync.
- **Carlitos (carlitoswillis)** has write access and pushes directly to `main` (last: Oct 14 — security headers,
  CSP, sticky mobile CTA, copy pass). Always `git fetch` and merge `origin/main` before pushing.
  His own repo `carlitoswillis/armak.tech` is the May original and is NOT connected to the site.
- **Secrets:** contact form key `WEB3FORMSAPIKEY` lives in local `.env` (gitignored) and in Vercel env vars. Never print it.
  Never submit the contact form in testing — it emails sales@armak.tech.
- **Dev servers** (`.claude/launch.json`): `armak-dev` (port 4321) and `armak-preview` (4322, production build).
  Node ≥ 22.12 required (Astro 7). `npx astro check` → 0 errors and `npm run build` must pass before any push.

## What the owner (Aram) wants — standing instructions
1. **Plain language.** He isn't a developer. No jargon ("branch", "commit", "merge", "CSP") without saying what it means.
   When he says "I don't understand," simplify, don't elaborate.
2. **Facts come from Armak only.** Never invent projects, testimonials, certifications, prices, response times, client
   names. Placeholders stay hidden on the live site. His father (founder, in the trade since 1998) is the source of
   truth; turn technical questions into short yes/no checklists he can hand to his father.
3. **No AI-sounding writing.** No slogans, no "not just X", no "no guesswork", no stacked em-dashes, no "actually",
   no filler. The site's copy was cleaned on Oct 13; keep it that way. No AI-looking stock photos.
4. **Marketing angle to build in (not yet on the site):** "We engineer with the future in mind." Armak's engineering
   method is built into how the company operates, so installs adapt to future technology even when choices look
   unusual today. Needs 2–3 real examples from his father before it goes on the site. Checklist for the father
   (yes/sometimes/no): Cat 6A over Cat 6; two drops per AP; spare fiber strands; empty conduit with pull strings;
   rack/power/cooling headroom; zone cabling (consolidation points); pre-placed ceiling-grid jacks; identical jacks
   with roles set at the switch; open standards / no vendor lock-in; TIA-606 labels + as-builts; "what do you do that
   most installers skip?" Site idea: a "Today / 10 years from now" toggle on the homepage building explorer.
5. **Multi-agent work:** he wants a manager coordinating parallel agents, with a proofreading pass before anything
   publishes. Usage limits have cut agents off mid-task several times — relaunch with "which files already have
   partial edits" and never commit/push half-done work. He also wants work to resume automatically after a limit
   resets (a cron watchdog every 20 min worked; it needs the app open and the computer awake).
6. Guided CTAs (Oct 21) were his request: the site felt like a "rabbit hole"; keep one red button per screen and a
   consistent Next-step block; CTAs should carry context into the form.

## Owner actions still open (only Aram/Armak can do these)
- Vercel → Settings → Domains → add `www.armak.tech` as a redirect to `armak.tech` (www shows a security error today).
- Review/approve the draft privacy page (/privacy/).
- Answer: 946+ vs 1,000+ projects; 24/7 for everyone or contracted clients only; keep Hikvision (FCC Covered List)
  and Cat 8 as headline offerings?; which industries are really served; confirm BICSI, licensed/bonded/insured.
- Supply: street address + ZIP, license number, certifications, 3 real projects, testimonials, team, real photos,
  vector logo, social profiles.

## The next job he asked for (not started — he stopped it to secure context first)
Run the "vibe-coded site safety" checklist with **25 agents**: 4 groups × (4 worker agents + 1 group manager) = 20,
plus 5 master agents who proofread each group's work before anything publishes. One item per worker, one by one:
1 privacy policy (exists; proofread) · 2 terms of service page · 3 refund policy (likely N/A for a contractor —
confirm; a "no online sales" note may suffice) · 4 cookie policy · 5 cookie consent banner (only if cookies exist —
the site sets none) · 6 form consents · 7 no unnecessary data · 8 audit third-party scripts/SDKs (Web3Forms, OpenFreeMap,
Vercel only) · 9 remove dark patterns · 10 no hidden fees · 11 remove fake reviews (none exist) · 12 remove unsupported
claims · 13 alt text · 14 color contrast · 15 keyboard navigation · 16 business details (address/license pending from
Armak) · 17 age gate / kids' data (site is B2B; privacy page says not for under-13s) · 18 unsubscribe link in emails
(no marketing emails exist) · 19 font/image licenses (fonts OFL via fontsource; photos credited in
src/assets/photos/CREDITS.md; partner logos are trademarks — nominative use) · 20 data-deletion request path (in
privacy page). Also the "20 reasons your app looks vibecoded" list: check gradients, fade-in-on-scroll, Lucide
icons everywhere, 3-icon rows, badge above headline, em-dashes, buzzword copy, inconsistent spacing.
Many items are already done or N/A — each worker should verify, fix only what's real, and report "already OK" honestly.
Ground rules for every agent: own files only, no commit/push, `npx astro check` clean, own browser tab, plain copy.

## Earlier ideas not yet built (from the CTA brainstorm)
"Send us a photo of your closet", "Already have an RFP? Send it", 15-minute call booking (needs a Cal.com account),
"Save our number" contact card, "Send this page to your IT person", existing-customer MAC/issue request form,
per-industry starter pages, "We reply within one business day" (needs Armak's commitment).
