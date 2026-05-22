# Architecture

PURPOSE: Technical system design and data flow of the Armak Technologies website.

## Overview
A modular, high-performance static website built with Vite and EJS for component-based development without the overhead of a full frontend framework.

## System Components

### 1. Source Layer (`/src`)
- **`index.html`**: The main template that orchestrates components using EJS includes.
- **`components/`**: Modular HTML fragments (Hero, Nav, Services, etc.) written in EJS.
- **`css/main.css`**: Global styles and utility classes.
- **`js/main.js`**: Core interactivity logic, parallax effects, and particle systems.

### 2. Asset Layer (`/public`)
- Contains all static assets like images, logos, and webp files. These are served from the root path in the final build.

### 3. Build & Tooling
- **Vite**: Handles the development server, hot module replacement, and asset bundling.
- **Vite-Plugin-EJS**: Enables component-based templates within the static HTML structure.

## Data Flow
1. **Development**: `npm run dev` starts a local server that resolves EJS includes on-the-fly.
2. **Build**: `npm run build` bundles CSS/JS and compiles EJS components into a single `dist/index.html`.
3. **Deployment**: The contents of the `dist/` folder are deployed to any static hosting provider.

## AI Workspace Substrate
This repository uses an AI-assisted engineering substrate located in `/ai`
- **Cognition Layer**: State and tasks are tracked in `/ai/PROJECT_STATE.md`.
- **Rules**: Agent constraints are defined in `AGENTS.md`.
- **Flow**: Human Pilot -> AI Implementation -> `npm run build` verification.
