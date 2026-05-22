# Agent Guidelines (AGENTS.md)

PURPOSE: This is the authoritative rulebook for AI assistants. It defines the 'how' and 'what' of the codebase.

## Project Context
- **Objective**: Armak Technologies business website providing low-voltage, networking, and security infrastructure services.
- **Stack**: HTML5, Vanilla CSS (embedded), JavaScript.

## Architecture Constraints
- **Structure**: Single-page responsive landing page (`index.html`).
- **Assets**: Images and logos stored in the root directory.
- **Markdown Persistence**: All state must be tracked in `/ai`

## Coding Conventions
- **Explicit over Implicit**: Avoid hidden logic or complex dependencies.
- **Verification First**: All changes must be verified by opening `index.html` and checking responsiveness/design.
- **Compact Context**: Keep context files task-scoped and minimal.


## How to Navigate This Workspace (Priority Flow)
To minimize token waste and maximize focus, follow this priority sequence:
1. **START HERE**: Read `PROJECT_STATE.md`. It defines the current high-level objective.
2. **Operational Rules**: Read `AGENTS.md` (this file). Adhere strictly to these constraints.
3. **Architecture**: Read `ARCHITECTURE.md` for system design details.
4. **Planning**: Use `ai/plans/` for detailed implementation strategies before coding.


