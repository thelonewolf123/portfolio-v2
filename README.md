# Portfolio

A modern, responsive developer portfolio built with Next.js 15, featuring smooth animations, a blog section with Markdown support, and a clean design powered by Tailwind CSS and Radix UI.

## ✨ Features

- **Hero Section** - Eye-catching introduction with animated elements
- **About Section** - Professional summary and background
- **Experience Timeline** - Career history with company details and highlights
- **Skills Showcase** - Categorized technical skills (Frontend, Backend & DevOps, Other)
- **Projects Gallery** - Featured projects with live demos and GitHub links
- **Blog** - Markdown-powered blog with syntax highlighting
- **Contact Section** - Get in touch call-to-action
- **Responsive Navigation** - Scroll-aware navigation with section tracking
- **Dark Theme** - Modern dark aesthetic with spotlight effects

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with Typography plugin
- **UI Components**: [Radix UI](https://www.radix-ui.com) primitives
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Markdown**: [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Typography**: [Geist Font](https://vercel.com/font)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- yarn/npm/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/thelonewolf123/portfolio-v2.git

# Navigate to the project
cd portfolio-v2

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages with dynamic [slug] routing
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── internal/          # Core components (navigation, cards, etc.)
│   ├── sections/          # Page sections (hero, about, experience, etc.)
│   └── ui/                # Reusable UI components
├── content/
│   └── blogs/             # Markdown blog posts
├── data/
│   └── portfolio.json     # Portfolio content (experience, projects, skills)
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## ✏️ Customization

### Update Portfolio Content

Edit `data/portfolio.json` to update:

- About section text
- Work experience
- Skills categories
- Featured projects

### Add Blog Posts

Create new `.md` files in `content/blogs/` with frontmatter:

```markdown
---
title: "Your Blog Title"
date: "2024-01-15"
excerpt: "Brief description of the post"
---

Your content here...
```

## 📦 Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `yarn dev`   | Start development server |
| `yarn build` | Build for production     |
| `yarn start` | Start production server  |
| `yarn lint`  | Run ESLint               |

## 🌐 Deployment

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
