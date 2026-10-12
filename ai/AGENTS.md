# Agent Guidelines (AGENTS.md)

PURPOSE: This is the authoritative rulebook for AI assistants. It defines the 'how' and 'what' of the codebase.

## Project Context
- **Objective**: Armak Technologies business website providing low-voltage, networking, and security infrastructure services.
- **Stack**: Astro 7 (static), vanilla CSS with design tokens, TypeScript. GSAP + Lenis for motion.

## Architecture Constraints
- **Structure**: Multi-page static site; see `ARCHITECTURE.md`.
- **Assets**: Images in `src/assets/` (optimized by Astro); static files in `public/`.
- **Design system**: Use tokens and `components/ui/*`; review new components on `/styleguide/`.
- **Facts**: Business facts come from `src/data/site.ts` only. Never invent projects, testimonials,
  certifications or client names — use clearly marked placeholders until Armak supplies them.
- **Markdown Persistence**: All state must be tracked in `/ai`

## Coding Conventions
- **Explicit over Implicit**: Avoid hidden logic or complex dependencies.
- **Verification First**: Run `npm run check` and `npm run build`, then review in `npm run dev` at 375px, 768px and 1440px.
- **Compact Context**: Keep context files task-scoped and minimal.


## How to Navigate This Workspace (Priority Flow)
To minimize token waste and maximize focus, follow this priority sequence:
1. **START HERE**: Read `PROJECT_STATE.md`. It defines the current high-level objective.
2. **Operational Rules**: Read `AGENTS.md` (this file). Adhere strictly to these constraints.
3. **Architecture**: Read `ARCHITECTURE.md` for system design details.
4. **Planning**: Use `ai/plans/` for detailed implementation strategies before coding.


