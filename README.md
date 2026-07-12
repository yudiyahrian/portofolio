# Misaki Portfolio — 8-Bit Retro Developer

A production-ready developer portfolio with a retro 8-bit arcade aesthetic built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎮 **Retro 8-bit design** — pixel borders, animations, CRT overlay, floating particles
- 📱 **Fully responsive** — mobile-first design, hamburger menu with slide-out nav
- 🌙 **Dark/Light mode** — system preference detection with manual toggle
- ⚡ **Performance** — Server Components by default, static generation, optimized images
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation, WCAG AA
- 🔍 **SEO** — Metadata API, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt
- 🎨 **Animations** — Framer Motion page transitions, scroll reveals, hover effects

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Code highlighting**: react-syntax-highlighter
- **Theme**: next-themes

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/misaki-dev/portfolio.git
cd misaki-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── blog/[slug]/
│   ├── contact/
│   ├── experience/
│   ├── projects/[slug]/
│   ├── resume/
│   ├── skills/
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── blog/               # Blog-specific components
│   ├── effects/            # Visual effects (particles, CRT)
│   ├── layout/             # Navigation, Footer
│   ├── providers/          # Context providers
│   ├── sections/           # Page sections (Hero, Projects, etc.)
│   └── ui/                 # Reusable UI components
├── data/                   # Content data files
│   ├── achievements.ts
│   ├── blog.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── site.ts
│   └── skills.ts
├── lib/                    # Utility functions
│   └── utils.ts
└── types/                  # TypeScript type definitions
    └── index.ts
```

## 🎨 Customization

### Update Personal Info
Edit `src/data/site.ts` to update your name, email, social links, and stats.

### Add Projects
Edit `src/data/projects.ts` to add your projects. Follow the existing `Project` type structure.

### Add Blog Posts
Edit `src/data/blog.ts` to add blog posts. Posts support markdown-like syntax with code blocks.

### Update Experience
Edit `src/data/experience.ts` to update your work history.

### Update Skills
Edit `src/data/skills.ts` to update your technical skills and proficiency levels.

### Change Colors
The color palette is defined in `tailwind.config.ts`. The main accent color is `#3B82F6` (blue).

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com for auto-deployments
```

The `vercel.json` config is already set up with security headers and caching.

### Environment Variables

No environment variables are required for the base portfolio. For contact form functionality, you'd add:

```env
# Optional: for contact form API route
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
```

## 📊 Performance

The project targets Lighthouse 90+ scores:
- **Performance**: Static generation + optimized images
- **Accessibility**: Semantic HTML + ARIA labels
- **Best Practices**: Security headers + HTTPS
- **SEO**: Full metadata, sitemap, robots.txt

## 📝 License

MIT License — feel free to use this as a template for your own portfolio.
