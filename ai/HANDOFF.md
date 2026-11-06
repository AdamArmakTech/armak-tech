# Handoff — armak.tech redesign (written 2026-10-29)

Read this first in a new session. It holds everything that lived only in the previous conversation.
Then read `ai/PROJECT_STATE.md` (status + to-dos), `ai/AUDIT_2026-11-05.md` (the 5 November check of the site against
the owner's legal, security and speed lists: 8 to-dos, 15 questions; what is still open from it is in the owner actions
below), `ai/plans/site-audit.md` (the October audit) and `ai/AGENTS.md` (rules).

## Where things are
- **Live site:** https://armak.tech — built by Vercel from GitHub **AdamArmakTech/armak-tech**, branch **`main`**.
  Every push to `main` goes live in ~2 min. Other branches get preview URLs. Vercel project: `armak-tech`
  (team adamarmaktechs-projects). Owner logs into Vercel with an email, not GitHub.
- **Branches:** `main` = live; `redesign` = kept identical to main; `old-site` = untouched backup of the
  pre-redesign site (commit 757cf43, on GitHub; checked 2026-10-31; its Vercel deployment can also be rolled back to).
  It exists only on GitHub, not as a local branch. `feat/reconfigure-structure`
  is Carlitos's old branch from May (unused).
- **Local folder:** `E:\all-sites\armak-tech` (`C:\Users\Aram\Documents\all-sites` points there). Pushing uses `gh` credentials:
  `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push https://github.com/AdamArmakTech/armak-tech.git HEAD:refs/heads/main`
  (the machine's SSH key is not registered on GitHub). Push `redesign` the same way to keep it in sync.
- **Carlitos (carlitoswillis)** has write access and pushes directly to `main` (last: Oct 14 — security headers,
  CSP, sticky mobile CTA, copy pass). Always `git fetch` and merge `origin/main` before pushing.
  His own repo `carlitoswillis/armak.tech` is the May original and is NOT connected to the site.
- **Secrets:** contact form key `WEB3FORMSAPIKEY` lives in local `.env` (gitignored) and in Vercel env vars. Never print it.
  Never submit the contact form in testing — it emails sales@armak.tech.
- **Dev servers** (`.claude/launch.json`): `armak-dev` (port 4321) and `armak-preview` (4322, production build).
  Node ≥ 22.12 required (Astro 7). `npx astro check` → 0 errors and `npm run build` must pass before any push.
  The app starts these servers from `C:\Users\Aram\Documents\all-sites\armak-tech` (the link to E:) while Node
  resolves files to `E:\`, so anything in Astro that compares the two paths breaks (an `injectRoute` dev-only page
  crashed `astro dev` on 2026-11-05; the style guide now answers 204 in production instead, see its frontmatter).

## What the owner (Aram) wants — standing instructions
1. **Plain language.** He isn't a developer. No jargon ("branch", "commit", "merge", "CSP") without saying what it means.
   When he says "I don't understand," simplify, don't elaborate.
2. **Facts come from Armak only.** Never invent projects, testimonials, certifications, prices, response times, client
   names. Placeholders stay hidden on the live site. The owner makes all the decisions and answers fact questions himself (owner, 2026-10-30); his father founded the
   company (in the trade since 1998) but is not the gate. Put technical questions to the owner as short yes/no lists.
3. **No AI-sounding writing.** No slogans, no "not just X", no "no guesswork", no stacked em-dashes, no "actually",
   no filler. The site's copy was cleaned on Oct 13; keep it that way. No AI-looking stock photos.
4. **Marketing angle to build in (not yet on the site):** "We engineer with the future in mind." Armak's engineering
   method is built into how the company operates, so installs adapt to future technology even when choices look
   unusual today. Needs 2–3 real examples from the owner before it goes on the site. Checklist for the owner
   (yes/sometimes/no): Cat 6A over Cat 6; two drops per AP; spare fiber strands; empty conduit with pull strings;
   rack/power/cooling headroom; zone cabling (consolidation points); pre-placed ceiling-grid jacks; identical jacks
   with roles set at the switch; open standards / no vendor lock-in; TIA-606 labels + as-builts; "what do you do that
   most installers skip?" Site idea: a "Today / 10 years from now" toggle on the homepage building explorer.
5. **Multi-agent work:** he wants a manager coordinating parallel agents, with a proofreading pass before anything
   publishes. Usage limits have cut agents off mid-task several times — relaunch with "which files already have
   partial edits" and never commit/push half-done work. Work resumes automatically after a limit resets: the
   `autoContinueAtUsageLimit` setting is on (since Oct 29). No cron watchdog; the app must stay open and the computer awake.
6. Guided CTAs (Oct 21) were his request: the site felt like a "rabbit hole"; keep one red button per screen and a
   consistent Next-step block; CTAs should carry context into the form.

## Owner actions still open (only Aram/Armak can do these)
- ~~Vercel → Settings → Domains → add `www.armak.tech` as a redirect to `armak.tech`.~~ Done: www.armak.tech
  redirects to armak.tech (308), checked 2026-11-05 by the audit session and again with curl.
- ~~Review/approve the draft privacy page (/privacy/).~~ APPROVED by the owner on 2026-11-05 (evening) as it reads at
  commit ad9466b. How it got there: he said "not yet" earlier that day, when it gained the
  hCaptcha, Proofpoint and Microsoft 365 lines (see PROJECT_STATE "Owner answers 2026-11-05"); a PDF of it went to
  his phone. Owner 2026-11-05: form emails are kept as business records and NOT deleted on request (he first said
  yes, then "keep them"), so "ask us to delete it" came off /privacy/; copies and corrections can still be asked for.
  The sharing section names kinds of services, not companies (owner, after research into the law and other
  contractors' policies, 2026-11-05); the real names are in the file's header comment. The page was then condensed
  to five sections, 273 words (owner: "you can't condense this?").
- Check the CSLB licence, bond, insurance and BICSI status (owner NOT SURE on 2026-11-05, so those claims are off
  the site until he confirms them; when "Licensed" returns, the CSLB number goes with it).
- Turn on hCaptcha for the form in the Web3Forms dashboard (app.web3forms.com): the site shows the box, Web3Forms
  only requires it once that setting is on.
- Product pictures: decided 2026-11-06 afternoon (generic devices, no logos; drawn illustrations are in). If the
  owner wants computer-rendered pictures instead, the Figma image tool needs a permission rule in the app for
  `mcp__figma__create_new_file` and `mcp__figma__generate_image` (the auto-mode check blocked it). Nothing else is
  needed from the makers now.
- Preview: `https://armak-tech-git-intent-redesign-adamarmaktechs-projects.vercel.app` shows the redesign branch as of
  072cbdd (pushed 2026-11-06 night on "Update the preview"); it asks for the Vercel login first (Deployment
  Protection). Say "publish" to put it live: merge `intent-redesign` into `main` (fast-forward), push `main`, then
  open https://armak.tech and check it.
- Approve deleting `src/components/services/PhotoBand.astro` and the `servicePhotos` block in
  `src/data/services-detail.ts` (no page uses either since the About page switched to the drawings, 2026-11-06).
- The three session worktrees are merged into `intent-redesign` (about-page b9459cf, site-reveals d1486f0,
  demo-motion 55fe780) and can go when the owner says so: `E:/all-sites/armak-tech/.claude/worktrees/about-page-1c7980`,
  `.../site-reveals-9929c9`, `.../demo-motion-eec65d` (remove with `git worktree remove <path>`, then
  `git branch -d` the three `claude/...` branches). Nothing in them is unmerged. The same goes for the three
  design-direction worktrees of 2026-10-30 under `E:/Claude Installs/Research/armak-directions/A`, `B` and `C`
  (branches `direction-b` and `direction-c`; A was reverted on 2026-10-31): explorations, nothing wanted.
- The install drawing's legend uses the TIA-606 colour meanings (blue horizontal drops, green network gear, orange
  carrier hand-off, white backbone). Confirm these match how Armak codes its cables; otherwise say the right words.
- Approve deleting the unused `src/components/process/JobTimeline.astro` (taken off the page 2026-11-06, 1734eeb).
- Answered 2026-11-05: keep 946+; Hikvision removed; all five building types are real work; clients get the test
  reports; every job gets a written proposal after a site walk; 24/7 is for contracted clients (2026-10-30).
  Still open: Cat 8 as a headline offering?
- Supply: license number (if any), certifications, 3 real projects, testimonials, team, real photos, vector logo,
  social profiles. Street address: owner said no, city only (2026-11-05).

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

**Model per role (the owner cares about token cost):** the 16 workers run on **Sonnet** (mechanical checks and
fixes); the 4 group managers and 5 master proofreaders run on **Opus** (judgment: wording, legal pages, honesty of
claims); the main session (planning, merging, publishing) is whatever the owner picked, Fable 5.1 at the time of
writing. Never run a mechanical worker on an expensive model. Launch in batches of 5–6 so a usage limit doesn't cut
off a whole wave; relaunch only unfinished pieces.

## Earlier ideas not yet built (from the CTA brainstorm)
"Send us a photo of your closet", "Already have an RFP? Send it", 15-minute call booking (needs a Cal.com account),
"Save our number" contact card, "Send this page to your IT person", existing-customer MAC/issue request form,
per-industry starter pages, "We reply within one business day" (needs Armak's commitment).
