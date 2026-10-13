# Quintence Studio ~ From Pipeline to Launch

> **Boutique data & digital engineering studio.** We architect resilient ETL pipelines, executive BI dashboards, workflow automation, bespoke data visualisations, and modern web products for founders and ops leads at growing businesses.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version Required |
|------|-----------------|
| Node.js | 20+ |
| pnpm | 12+ |

### 1. Install Dependencies

```bash
pnpm install
```

If you encounter `ERR_PNPM_IGNORED_BUILDS`, approve native build scripts:

```bash
pnpm approve-builds --all
pnpm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see `.env.example` for all required vars).

### 3. Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. Other Commands

```bash
pnpm lint       # ESLint 9 flat config
pnpm format     # Prettier formatting
pnpm build      # Production bundle (type-checks + compile)
```

---

## 📂 Project Structure

```
quintence/
├── app/
│   ├── (marketing)/           # Public-facing marketing pages
│   │   ├── page.tsx           # / ~ Home page
│   │   ├── services/          # /services + /services/[slug]
│   │   ├── work/              # /work + /work/[slug]
│   │   ├── about/             # /about
│   │   ├── insights/          # /insights + /insights/[slug]
│   │   └── contact/           # /contact
│   ├── (legal)/               # Legal route group
│   │   ├── privacy/           # /privacy
│   │   └── terms/             # /terms
│   ├── styleguide/            # /styleguide ~ Design token showcase
│   ├── api/contact/           # POST /api/contact ~ Lead capture endpoint
│   ├── layout.tsx             # Root layout: fonts, Header, Footer, JSON-LD
│   ├── globals.css            # Design tokens and Tailwind CSS v4 base
│   ├── not-found.tsx          # Custom 404
│   ├── sitemap.ts             # Dynamic XML sitemap
│   └── robots.ts              # Crawl directives
├── components/
│   ├── ui/                    # shadcn/ui primitives (button, card, badge, input, etc.)
│   ├── layout/                # Header, Footer, MobileNav
│   ├── sections/              # Hero, ServicesGrid, CaseStudyCard, ProcessTimeline, StatsBar, Testimonial, CTA
│   └── forms/                 # ContactForm (react-hook-form + zod)
├── content/
│   ├── services/              # One .mdx per service (5 total)
│   ├── case-studies/          # .mdx with typed frontmatter
│   └── insights/              # Blog articles .mdx
├── lib/
│   ├── config.ts              # Central site config (nav, stats, process, socials)
│   ├── mdx.ts                 # Typed MDX content loaders (CMS-swap-ready abstraction)
│   └── validators.ts          # Zod schemas for contact form and API
├── public/                    # Static assets (favicon, logo, og-image)
├── scripts/                   # Asset generation helpers
├── types/
│   └── index.ts               # Shared TypeScript interfaces
├── components.json            # shadcn/ui config
├── next.config.ts             # Next.js + MDX config
├── tsconfig.json              # Strict TypeScript (ES2022, bundler resolution)
├── eslint.config.mjs          # ESLint 9 flat config
├── postcss.config.mjs         # Tailwind CSS v4 via @tailwindcss/postcss
├── .env.example               # Environment variable template
└── .prettierrc                # Prettier config (with tailwindcss plugin)
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui + Radix UI |
| Icons | lucide-react |
| Animation | Framer Motion (prefers-reduced-motion aware) |
| Content | MDX via `@next/mdx` + `next-mdx-remote` |
| Forms | react-hook-form + zod |
| Email (Phase 2) | Resend |
| SEO | Next.js Metadata API + JSON-LD |
| Analytics | Vercel Analytics |
| Package Manager | pnpm |

---

## 📄 Content Management

All content lives as version-controlled MDX files in `content/`:

### Adding a Case Study

Create `content/case-studies/your-client.mdx`:

```mdx
---
title: "Your Case Study Title"
slug: "your-client"
client: "Client Company"
sector: "Fintech / Logistics / etc."
timeframe: "X Weeks"
featured: false
stack: ["Snowflake", "dbt Core", "Next.js"]
challenge: "Single paragraph describing the problem..."
results:
  - label: "Key Metric"
    value: "99.9%"
    description: "What it means"
summary: "One-line summary for cards."
---

## Full Article Body Here...
```

Then it automatically appears at `/work/your-client` with static generation.

### Adding a Service

Create `content/services/your-service.mdx` with `order: 6` frontmatter to control display order.

### Adding an Insight Article

Create `content/insights/your-article.mdx` with `publishedAt: "YYYY-MM-DD"` to control sort order.

---

## 🔌 Contact Form / Resend Delivery

`/api/contact` validates against the shared `contactSchema`, drops honeypot bots
with a silent 200, then sends a staff notification (Reply-To = sender) plus an
inquirer auto-reply via Resend + React Email templates.

1. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` to `.env.local`
   (see `.env.example` for comments)
2. **Sandbox testing (no verified domain):** set
   `CONTACT_FROM_EMAIL=onboarding@resend.dev` and use your Resend account owner
   address as both sender test target and `CONTACT_TO_EMAIL`. Sandbox senders can
   only email the account owner.
3. **Production sending:** verify a domain at resend.com/domains (Phase 6 task),
   then set `CONTACT_FROM_EMAIL` to an address on it (e.g. `inquiries@yourdomain`).
4. Missing key/addresses → API returns 503 and logs server-side (fail loud).

No database, no lead storage ~ submissions exist only as emails.

---

## 🌐 Deployment (Vercel)

```bash
# Deploy from CLI
pnpm dlx vercel deploy
```

Or connect the GitHub repository to a Vercel project with the root set to this directory.

**Required Vercel Environment Variables** (dashboard → project → Settings → Environment Variables; production + preview):
- `NEXT_PUBLIC_SITE_URL` ~ Production domain, no trailing slash (e.g. `https://quintence.help`). Local dev falls back to the same value; override in `.env.local` only if testing canonicals locally.
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` ~ Gmail SMTP sender + App Password (Google Account → Security → 2-Step Verification → App passwords). Never commit.
- `CONTACT_TO_EMAIL` ~ Inbox that receives inquiry notifications.

Local `.env.local` mirrors the same keys (see `.env.example`).

---

## 🛠 Operations ~ content without touching code

### Add a case study
Create `content/case-studies/my-project.mdx`. Required frontmatter (zod-validated ~ bad values fail the build naming the file):
`title`, `slug`, `client`, `sector`, `year` (number), `services` (service slugs), `stack`, `summary`, `anonymized` (boolean), `metrics` (**exactly 3** `{value, label}`), optional `featured: true` (only one), optional `draft: true` (hides everywhere). Body: `## Challenge`, `## Solution`, `## Results`.

### Add an insight post
Create `content/insights/my-post.mdx` with `title`, `slug`, `description`, `publishedAt` (ISO date). Reading time is computed (words / 200). `draft: true` hides it. It appears in `/insights`, `feed.xml`, and the sitemap automatically.

### Add a service
Create `content/services/my-service.mdx` with `title`, `slug`, `description`, `icon` (Database | BarChart3 | Workflow | LineChart | Code2), `order` (number), `lede`, `deliverables` (**exactly 5**), `fit` (**exactly 3**), `stack`. Keep slugs stable ~ renaming breaks URLs (add a redirect in `next.config.ts`).

### Update home stats
Edit the locked `STATS` array in `components/sections/StatsBar.tsx`. Rule: commitments and structural facts only ~ never invented history.

### Spam runbook (contact form)
1. Current defense: honeypot field + zod validation, no persistence. Normal state: occasional bot hits dropped silently (server logs `[contact] honeypot hit`).
2. Symptoms of real spam: notification emails arriving with junk content (honeypot bypassed).
3. 30-minute upgrade: add Upstash Redis + `@upstash/ratelimit` (sliding window, 5 req/IP/hour on `/api/contact` → 429). Documented post-launch task ~ stateless serverless needs external state.
4. Strict CSP is also a documented post-launch task (report-only config noted below).

### Content-Security-Policy (post-launch)
No enforced CSP at launch (breakage risk with inline JSON-LD + Vercel Analytics). Report-only starter when ready:
`Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' va.vercel-scripts.com; report-uri /api/csp-report`
Tighten `script-src` (nonce the JSON-LD, drop `unsafe-inline`) before enforcing.

---

## 🏗 Phase Roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| **Phase 1** | Architecture, scaffold, MDX pipeline, stub API, base UI | ✅ Complete |
| **Phase 2** | Full page designs, animations, Resend integration, richer case studies | 🔜 Next |
| **Phase 3** | Headless CMS swap (Sanity/Contentful), performance optimisation, Lighthouse audit | 📋 Planned |

---

## 🔑 Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 15 | App Router SSR/SSG, ecosystem depth, Quintence can dogfood its own web-product stack |
| Content | MDX + frontmatter | Zero CMS cost; `lib/mdx.ts` abstraction makes Sanity swap a one-file change |
| Styling | Tailwind CSS v4 | Native CSS variables, @theme layer, zero config, JIT |
| Animation | Framer Motion | Respects `prefers-reduced-motion`; purposeful reveals only |
| Email | Resend (stubbed) | Domain-verified transactional email with edge compatibility |
| Analytics | Vercel Analytics | Zero-config, privacy-first, no external script required |
| Dark-First Theme | Instrument panel / engineering aesthetic | Matches Quintence's data engineering positioning |

---

## 📧 Contact

**Studio:** hello@quintence.help  
**Location:** Gurugram ~ Noida, IN & Remote Worldwide  
**Website:** [quintence.help](https://quintence.help)
