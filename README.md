# harishkumar.info

A modern, responsive personal portfolio built with Next.js 16 and React 19, featuring a split-pane layout, a blog with syntax-highlighted Markdown, and four Docusaurus-powered documentation sites for production-grade AI projects

## Features

- **Split-Pane Layout** — Fixed hero pane on the left (profile, contact links, project docs badges); scrollable content on the right
- **About Section** — Professional summary, key metrics (7,000+ users scaled, 4 production AI systems), and quantified impact
- **Experience Timeline** — Career history with company details and measurable highlights
- **Skills Showcase** — Categorized technical skills (Languages, Frontend, Backend, Databases, AI & ML, Cloud & DevOps, Core Strengths)
- **Flagship Projects** — Deep-dive cards for Mail Pilot, Quartermaster, Aegis, and Stardust, each with complete Docusaurus documentation served at `/docs/<project>/`
- **Projects Gallery** — Side projects (WatchWithMe, Artemis, Job Genie) with live demos, GitHub links, and stats
- **Blog** — Markdown-powered blog with frontmatter, syntax highlighting (Prism), and GFM support
- **Contact Section** — Email, LinkedIn, GitHub, resume download
- **Resume Download** — Auto-generated PDF from LaTeX source (`resume-latex/`)
- **Custom 404 & Error Pages** — App router `not-found.tsx` and `error.tsx`
- **SEO** — Sitemap, robots.txt, JSON-LD `Person` + `BlogPosting` schema, Open Graph, Twitter cards
- **Accessibility** — Skip-to-content link, `prefers-reduced-motion` support, semantic HTML
- **Vercel Analytics** — Built-in via `@vercel/analytics/next`
- **Scroll-Aware Navigation** — Auto-highlights active section, shrinks on scroll
- **Mobile Drawer** — Slide-out navigation via Radix Sheet
- **Shiny Cursor** — Gradient cursor glow that follows mouse movement
- **Open to Work Toggle** — Configurable badge via `data/constants.ts`
- **Responsive Design** — Fully responsive with mobile-first breakpoints

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, RSC, static generation)
- **Language**: TypeScript (strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), `@tailwindcss/typography`, `tw-animate-css`
- **UI**: Radix UI (`@radix-ui/react-dialog`) via shadcn-style components (`components.json`)
- **Animations**: [Framer Motion](https://www.framer.com/motion) (gated by `prefers-reduced-motion`)
- **Icons**: [Lucide React](https://lucide.dev)
- **Markdown**: `gray-matter` (frontmatter), `react-markdown` + `remark-gfm` (rendering), `rehype-prism-plus` + `prismjs` (syntax highlighting)
- **Utilities**: `class-variance-authority`, `clsx`, `tailwind-merge` (`cn()` helper)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Typography**: Geist + Geist Mono (via `next/font`)
- **Docs Sites**: [Docusaurus](https://docusaurus.io) — four project documentation sub-sites built independently and served via Next.js API route

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone <repo-url>
cd harishkumar.info
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Production build

The build script first builds every Docusaurus sub-project under `docs-projects/`, which are served at `/docs/<project>/` via a Next.js API route (`app/docs/[...slug]/route.ts`). The first build will take a few minutes.

```bash
npm run build
```

If you do not need the Docusaurus sites locally, you can run `next build` directly.

### Adding a new Docusaurus project

Drop a new project into `docs-projects/<name>/` with `baseUrl: "/docs/<name>/"` in its `docusaurus.config.ts`, then run `npm run build:docs`. It will be auto-discovered, auto-routed, auto-included in the sitemap, and ready to serve — no portfolio code changes required.

## Project Structure

```
├── app/                       # Next.js App Router
│   ├── blog/                  # Blog index + dynamic [slug] routing
│   │   ├── page.tsx           # Blog listing
│   │   └── [slug]/            # Individual blog post
│   ├── docs/                  # /docs landing + API route for Docusaurus builds
│   │   ├── page.tsx           # Docs index page
│   │   └── [...slug]/route.ts # Serves Docusaurus static files
│   ├── not-found.tsx          # Custom 404
│   ├── error.tsx              # Error boundary
│   ├── loading.tsx            # Skeleton loading state
│   ├── sitemap.ts             # Auto-generated sitemap
│   ├── robots.ts              # robots.txt
│   ├── layout.tsx             # Root layout (Geist font, analytics, JSON-LD, ShinyCursor)
│   └── page.tsx               # Home page (split-pane layout with all sections)
├── components/
│   ├── internal/              # Domain components (nav, footer, cards, markdown renderer, etc.)
│   ├── sections/              # Page sections (hero, about, experience, skills, projects, blog, contact)
│   └── ui/                    # Reusable primitives (sheet, shiny-cursor, spotlight-card)
├── content/
│   └── blogs/                 # Markdown blog posts with frontmatter
├── data/
│   ├── constants.ts           # App constants (e.g. OPEN_TO_WORK toggle)
│   └── portfolio.json         # Portfolio content (experience, projects, skills, blog references)
├── hooks/
│   └── use-scroll-tracking.ts # Scroll-aware navigation hook
├── lib/
│   ├── blog.ts                # Blog post fetching & parsing
│   ├── docs.ts                # Docusaurus project discovery & sitemap generation
│   ├── seo.ts                 # JSON-LD structured data helpers
│   └── utils.ts               # cn() utility (clsx + tailwind-merge)
├── scripts/
│   ├── build-docs.mjs         # Builds all Docusaurus sub-projects
│   └── generate-favicon.cjs   # Generates favicon assets from SVG source
├── docs-projects/             # Docusaurus sub-projects (auto-discovered)
│   ├── aegis/                 # Served at /docs/aegis/
│   ├── mail-pilot/            # Served at /docs/mail-pilot/
│   ├── quartermaster/         # Served at /docs/quartermaster/
│   └── stardust/              # Served at /docs/stardust/
├── resume-latex/              # LaTeX source for resume PDF
├── public/                    # Static assets (images, PDFs, favicons)
└── components.json            # shadcn/ui configuration
```

## Customization

### Update Portfolio Content

Edit `data/portfolio.json` to update experience, skills, projects, and blog references.

### Toggle Open to Work

Set `OPEN_TO_WORK` in `data/constants.ts` to `true` or `false` to show/hide the "Open to Work" badge in the hero section.

### Update Resume

Edit `resume-latex/index.tex` and run `npm run build:resume` to regenerate `public/Harish_resume.pdf`.

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

### Build Docs

Run `npm run build:docs` to rebuild all Docusaurus projects under `docs-projects/`.

## Scripts

| Command              | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `npm run dev`        | Start development server                                       |
| `npm run build:docs` | Build every Docusaurus sub-project under `docs-projects/`      |
| `npm run build:resume` | Generate resume PDF from LaTeX source                       |
| `npm run build`      | Build docs then build the Next.js app for production           |
| `npm run start`      | Start production server                                        |
| `npm run lint`       | Run ESLint                                                     |

## Deployment

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## License

This project is open source and available under the MIT License.
