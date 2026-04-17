# AI Magic Dictionary

## Project Name
AI Magic Dictionary

## What This Project Is
AI Magic Dictionary is a Vite + React web app for AI learning, concept review, and certification-oriented study support. It is designed as a lightweight browser-based study tool for reviewing terms and concepts clearly.

## Tech Stack
- Vite 5
- React 18
- TypeScript
- Tailwind CSS
- PostCSS

## Local Development Commands
Install dependencies:

```bash
npm install
```

Start local dev server:

```bash
npm run dev
```

Run data validation script (optional):

```bash
npm run validate:mvp-data
```

## Build Command
Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Cloudflare Pages Deploy Settings
This project is configured as a standalone Vite app for Cloudflare Pages (`base: '/'` in `vite.config.ts`).

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root (leave empty unless you move the app into a subfolder)
- Node.js version: use a current LTS version

## Project Structure (Short)
```text
.
├── src/                  # React app source code
├── scripts/              # Utility scripts (for example data validation)
├── index.html            # Vite HTML entry
├── vite.config.ts        # Vite config (Cloudflare Pages-safe base path)
├── package.json          # Scripts and dependencies
├── dist/                 # Production build output (ignored by git)
├── node_modules/         # Installed dependencies (ignored by git)
└── archive/              # Local/archive files (ignored by git)
```

## Current Status Note
- Vite base path is set to `/` for standalone Cloudflare Pages deployment.
- Generated/local folders are ignored in `.gitignore`: `node_modules/`, `dist/`, `archive/`, `.DS_Store`.
- The repository is ready for normal Vite build/deploy workflow on Cloudflare Pages.
