# Next sessions (written 2026-10-31)

Where things stand (updated 2026-11-05 night): branch `intent-redesign` is at b47565f (cleanup batches 1-4, the owner's
24 answers, redesign rounds 1-3) and was pushed to GitHub as a preview on 2026-11-05 (the live `main` is untouched at
9d6993e). Preview link: https://armak-tech-git-intent-redesign-adamarmaktechs-projects.vercel.app, but Vercel's
Deployment Protection sends anonymous visitors to a Vercel login, so only the owner (logged into Vercel) can open it;
curl and PageSpeed get a 302. Direction A is saved as git tag `direction-a-final`. The "design session" prompt below is
superseded: the owner chose "critique first" and three rounds were built from `ai/CRITIQUE_2026-11-05.md`.

The approved plan for the redesign is `ai/plans/REDESIGN-PLAN-2026-10-31.md` (copy of the approved plan). Read it first in the design session.

## 1. Design session (the big one)
Paste this into a new session in E:\all-sites\armak-tech:

> Read CLAUDE.md, ai/HANDOFF.md, ai/NEXT-SESSIONS.md, ai/plans/REDESIGN-PLAN-2026-10-31.md and ai/ART_DIRECTION.md. Steps 0 and 1 of the plan are done. Do Step 2: make design images for the three directions in ART_DIRECTION.md using the Figma connector (tell me the credit cost first), run the reverse squint test on them, and send me one PDF to pick from. Do not touch the site code until I pick. Plain English, short.

## 2. Cleanup session (any time, independent)
> Read CLAUDE.md, ai/HANDOFF.md and ai/CODE_REVIEW_2026-10-31.md. Show me Batch 1 and Batch 2 of the cleanup plan as exact path lists and wait for my yes on each list before changing anything. Skip Batch 5 (the redesign does those). Work on branch intent-redesign, one commit per batch, no push.

Note: if the design session is building at the same time, cleanup should only touch files the redesign doesn't (Batch 1, 2, 3, 4 except global.css, tokens.css and home components).

## 3. Content session (when you have the answers)
> Read CLAUDE.md, ai/HANDOFF.md and ai/FATHER-CHECKLIST.md. Help me fill in the case study project, the CSLB license number and product photos. Ask me short yes/no questions.
