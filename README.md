# Portfolio

A modern, responsive developer portfolio built with Next.js 16, featuring smooth animations, a blog section with Markdown support, and a clean design powered by Tailwind CSS and Radix UI.

## ✨ Features

- **Hero Section** — Eye-catching introduction with animated elements and a split-pane layout on desktop
- **About Section** — Professional summary and background with key metrics
- **Experience Timeline** — Career history with company details and quantified highlights
- **Skills Showcase** — Categorized technical skills
- **Flagship Projects** — Deep-dive cards for Aegis and Stardust with linkable documentation
- **Projects Gallery** — Side projects with live demos and GitHub links
- **Blog** — Markdown-powered blog with frontmatter
- **Contact Section** — Direct email, LinkedIn, GitHub, and resume
- **Custom 404 and error pages**
- **SEO** — Sitemap, robots.txt, JSON-LD `Person` schema, Open Graph
- **Accessibility** — Skip-to-content link, `prefers-reduced-motion` support
- **Vercel Analytics** — Built-in
- **Responsive Navigation** — Scroll-aware top nav with proper mobile drawer

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, RSC, static generation)
- **Language**: TypeScript (strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **UI**: Radix UI primitives via custom shadcn-style components
- **Animations**: [Framer Motion](https://www.framer.com/motion) (gated by `prefers-reduced-motion`)
- **Markdown**: [gray-matter](https://github.com/jonschlinkert/gray-matter) for frontmatter
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Typography**: Geist + Geist Mono (via `next/font`)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/thelonewolf123/portfolio-v2.git
cd portfolio-v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Production build

The build script also builds every Docusaurus sub-project under `docs-projects/`, which are served at `/docs/<project>/`. The first build will take a few minutes.

```bash
npm run build
```

If you do not need the Docusaurus sites locally, you can run `next build` directly.

### Adding a new Docusaurus project

Drop a new project into `docs-projects/<name>/` with `baseUrl: "/docs/<name>/"` in its `docusaurus.config.ts`, then run `npm run build:docs`. It will be auto-routed, auto-included in the sitemap, and ready to serve — no portfolio code changes required.

## 📁 Project Structure

```
├── app/                       # Next.js App Router
│   ├── blog/                  # Blog index + dynamic [slug] routing
│   ├── docs/                  # /docs page + [...slug] route serving Docusaurus builds
│   ├── not-found.tsx          # Custom 404
│   ├── error.tsx              # Error boundary
│   ├── loading.tsx            # Skeleton loading state
│   ├── sitemap.ts             # Auto-generated sitemap
│   ├── robots.ts              # robots.txt
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── internal/              # Domain components (nav, footer, cards, etc.)
│   ├── sections/              # Page sections (hero, about, experience, etc.)
│   └── ui/                    # Reusable primitives (sheet, spotlight, etc.)
├── content/
│   └── blogs/                 # Markdown blog posts with frontmatter
├── data/
│   └── portfolio.json         # Portfolio content (experience, projects, skills)
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
├── scripts/                    # Build helpers (favicon generation, doc builds)
├── docs-projects/             # Docusaurus sub-projects (auto-discovered)
│   ├── aegis/                 # Served at /docs/aegis/
│   └── stardust/              # Served at /docs/stardust/
└── public/                    # Static assets
```

## ✏️ Customization

### Update Portfolio Content

Edit `data/portfolio.json` to update experience, skills, projects, and blog references.

### Add Blog Posts

Create new `.md` files in `content/blogs/` with frontmatter:

```markdown
---
title: "Your Blog Title"
description: "Brief description for SEO and previews"
date: "2026-01-15"
author: "Harish Kumar"
tags: ["Engineering", "Architecture"]
image: "/optional-cover.png"
---

Your content here...
```

## 📦 Scripts

| Command              | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `npm run dev`        | Start development server                                       |
| `npm run build:docs` | Build every Docusaurus sub-project under `docs-projects/`     |
| `npm run build`      | Build docs then build the Next.js app for production          |
| `npm run start`      | Start production server                                        |
| `npm run lint`       | Run ESLint                                                     |

## 🌐 Deployment

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 📄 License

This project is open source and available under the MIT License.
