# Architecture

PURPOSE: Technical system design and data flow of the Armak Technologies website.

## Overview
A modular, high-performance static website built with Vite and EJS. The JS layer uses a "Contextual Loading" strategy where logic is partitioned by component and loaded lazily.

## System Components

### 1. Source Layer (`/src`)
- **`index.html`**: Orchestrates EJS components.
- **`components/`**: Modular HTML fragments.
- **`css/main.css`**: Global styles.
- **`js/`**:
  - **`main.js`**: Central orchestrator and IntersectionObserver controller.
  - **`core/`**: Critical modules loaded immediately (Nav, Loader).
  - **`components/`**: Feature-heavy logic loaded only when the parent component is in viewport.

### 2. Asset Layer (`/public`)
- Static assets served from root.

### 3. Build & Tooling
- **Vite**: Handles HMR and automatic code-splitting for dynamic imports.

## Data Flow
1. **Critical Path**: `main.js` boots and immediately initializes `core/` modules.
2. **Lazy Path**: As the user scrolls, `main.js` detects component intersection and dynamically imports the corresponding module from `js/components/`.
3. **Runtime**: Each module exports an `init()` function that starts component-specific animations (Canvases, Particles) only when needed.

## AI Workspace Substrate
This repository uses an AI-assisted engineering substrate located in `/ai`
- **Cognition Layer**: State and tasks are tracked in `/ai/PROJECT_STATE.md`.
- **Detailed Plans**: Stored in `plans/` (e.g., `plans/js-optimization.md`).
- **Rules**: Agent constraints in `AGENTS.md`.
