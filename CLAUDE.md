# armak.tech (Armak Technologies website)

Read these first, in order:
1. `ai/HANDOFF.md` — where everything lives, owner rules, open owner actions
2. `ai/PROJECT_STATE.md` — current status and to-dos
3. `ai/AGENTS.md` — rules for agents working in this repo
4. `ai/DESIGN.md` — the ten design rules; every visual change must name the rule it serves

Key facts (details in HANDOFF):
- The site is LIVE from GitHub `main` through Vercel. Every push to `main` goes live in about 2 minutes. Only push when the owner says "publish".
- `npx astro check` (0 errors) and `npm run build` must pass before any push.
- Never invent Armak facts. Never print `WEB3FORMSAPIKEY`. Never submit the contact form (it emails sales@armak.tech).
- Dev servers are in `.claude/launch.json` (`armak-dev`, `armak-preview`). Use them to show screenshots.
- Plain language for the owner. See the user-level rules.
