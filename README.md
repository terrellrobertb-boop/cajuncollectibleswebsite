# Cajun Collectibles

The official website for **Cajun Collectibles** — a Louisiana-based brand for sports cards, retro video games, comic books, and vintage toys.

> *Where the Past Comes Alive, One Memory at a Time.*
> *The Hunt. The Find. The Story.*

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-first theme via `@theme` in `app/globals.css`
- [Alfa Slab One](https://fonts.google.com/specimen/Alfa+Slab+One) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via `next/font`
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) for the contact form
- [Resend](https://resend.com) for transactional email
- [lucide-react](https://lucide.dev) for icons

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in as needed:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). When unset, contact submissions are logged but not delivered. |
| `CONTACT_TO_EMAIL` | Inbox that receives contact-form messages (e.g. your Google Workspace address). |
| `CONTACT_FROM_EMAIL` | Optional. Verified sender address. Defaults to Resend's onboarding sender until your domain is verified. |

## Project structure

```
app/
  (marketing)/         Marketing route group (Home, Adventure, YouTube, Contact)
  api/contact/         Contact form handler (Resend)
  layout.tsx           Root layout (fonts, metadata)
  globals.css          Tailwind theme + brand tokens
  icon.tsx             Dynamic favicon
  opengraph-image.tsx  Social share preview image
  robots.ts            SEO robots.txt
  sitemap.ts           SEO sitemap.xml
components/
  brand/               Logo, mascot, social icons (YouTube, Instagram, Whatnot)
  layout/              Header, Footer
  sections/            Hero, FeaturedCategories, MeetGumbeaux, AboutPreview, WhatWeCollect, LatestAdventure, LatestContent, ContactForm
  ui/                  Button, Container
content/               Typed content data (categories, adventures, site config)
lib/                   Utilities (env validation, cn)
public/brand/          Logo and brand artwork
```

## Brand tokens

Defined in `app/globals.css` via Tailwind v4's `@theme` directive:

| Token | Hex | Use |
| --- | --- | --- |
| `bayou` | `#0D5C63` | Primary background (header, hero, content) |
| `bayou-light` | `#1F8A93` | Hero subhead accent |
| `cream` | `#F3EAD2` | Section backgrounds, body text on dark |
| `cream-warm` | `#ECE0BF` | Card/section variations |
| `gold` | `#E0B341` | Tagline, active nav, accents |
| `orange` | `#C75E2A` | Primary CTAs |
| `swamp` | `#5A6E3A` | Supporting (mascot greens, secondary) |
| `charcoal` | `#1F1F1F` | Body text, high-contrast elements |

## Deployment (Cloudflare Pages)

1. Push the repo to GitHub.
2. In the Cloudflare dashboard, create a new **Pages** project and connect the GitHub repo.
3. Build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages@latest`
   - **Build output directory**: `.vercel/output/static`
4. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` as production environment variables.
5. In GoDaddy DNS, add CNAME records pointing the apex and `www` at the Pages project.
6. Cloudflare auto-provisions SSL.

After the initial setup, every `git push` to `main` triggers a production deploy. Branches and PRs get their own preview URLs at `*.pages.dev`.

## Brand asset library

All brand artwork is centralized in a single typed registry at [`content/assets.ts`](content/assets.ts). Every image the site uses (logo variants, Gumbeaux poses, category icons, bayou background, adventure thumbnails) has an entry with a path, alt text, and art notes describing what the asset should be.

### Adding or updating artwork

1. Open `content/assets.ts` and find the asset's entry to confirm the exact path it expects (e.g. `/brand/gumbeaux-magnifier.png`).
2. Save the final artwork to that path under `public/`.
3. Reload — the site automatically detects the file and swaps out the placeholder. No code change required.

### Checking what's still pending

```bash
npm run assets:status
```

Prints a list of every brand asset with its path, art notes, and a check or circle indicating whether the artwork is present in `public/`.

### Components that consume the registry

- `<BrandImage asset="..." />` ([`components/brand/BrandImage.tsx`](components/brand/BrandImage.tsx)) — server component for full mascot poses and logos. Falls back to the primary logo if the file is missing.
- `<CategoryIcon asset="..." fallbackIcon={...} accent="..." />` ([`components/brand/CategoryIcon.tsx`](components/brand/CategoryIcon.tsx)) — uses illustrated artwork if delivered, otherwise renders a Lucide icon in a colored badge.
- `<CypressBackground />` ([`components/brand/CypressBackground.tsx`](components/brand/CypressBackground.tsx)) — uses the bayou silhouette artwork if delivered, otherwise renders an in-code SVG fallback.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run screenshots` | Capture desktop + mobile screenshots of all pages to `.screenshots/` |
| `npm run assets:status` | Print which brand assets are delivered vs still placeholder |

---

Made with care in Louisiana.
