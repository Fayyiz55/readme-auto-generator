# README Auto-Generator

A modern, frontend-only web application that generates beautiful GitHub README markdown files from user input. Built with **React + Vite**, styled with **Tailwind CSS**, and fully deployable on **GitHub Pages**.

---

## Features

- Split editor/preview layout
- Live markdown preview with **React Markdown**
- Multiple README templates: Default, Simple, Detailed, SaaS/Product, API Project
- Dark / light mode toggle
- Copy to clipboard & Download `.md` file
- Optional **AI generation** using OpenAI API (user-provided key, stored locally)
- Fully responsive UI
- Zero backend — works entirely in the browser

---

## Tech Stack

- **React 18** (with Vite)
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** icons
- **React Markdown** + **remark-gfm**

---

## Project Structure

```
project1 - README Auto-Generator/
├── src/
│   ├── components/
│   │   ├── Editor.tsx           # Form inputs for README data
│   │   ├── Preview.tsx          # Live markdown preview
│   │   ├── Toolbar.tsx          # Copy / Download / AI buttons
│   │   └── AISettingBar.tsx     # OpenAI key input & prompt
│   ├── context/
│   │   └── ThemeContext.tsx      # Dark/light theme provider
│   ├── utils/
│   │   ├── storage.ts            # LocalStorage helpers
│   │   └── templates.ts          # Markdown generators & utils
│   ├── types.ts                  # TypeScript types
│   ├── App.tsx                   # Main application layout
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind + custom styles
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages auto-deploy
├── index.html
├── vite.config.ts                # Vite config with base path
├── tailwind.config.ts            # Tailwind configuration
├── postcss.config.mjs            # PostCSS with Tailwind plugin
├── tsconfig.app.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
cd "project1 - README Auto-Generator"
pnpm install
```

### Development

```bash
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
pnpm build
```

The static site will be output to the `dist/` folder.

---

## Deployment to GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The `.github/workflows/deploy.yml` action will trigger on every push to `main`.

### Option 2: Manual via `gh-pages`

```bash
pnpm deploy
```

> Make sure to set the correct repository remote first.

---

## AI Feature

To enable AI content generation:

1. Enter your **OpenAI API Key** in the top AI Assist bar.
2. The key is stored **only in your browser's localStorage**.
3. Click the **AI Generate** button to auto-fill README fields.

---

## License

MIT
