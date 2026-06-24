# Manikanta — Portfolio

A world-class personal portfolio built with a modern, production-ready stack.

## Tech Stack

| Concern            | Technology                                  |
| ------------------ | ------------------------------------------- |
| Framework          | [Next.js 15](https://nextjs.org) (App Router) |
| Language           | TypeScript (strict)                         |
| Styling            | Tailwind CSS v4                             |
| UI components      | shadcn/ui + Radix primitives               |
| Animation          | Framer Motion                               |
| i18n               | next-intl (English + German)               |
| Database / CMS     | Supabase                                    |
| Images             | Cloudinary (`next-cloudinary`)             |
| Theming            | next-themes (dark / light / system)        |
| Deployment         | Vercel                                      |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local   # then fill in your values

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/                  # App Router (routes, layouts, SEO route handlers)
│   ├── [locale]/         # Locale-segmented routes (layout, page, not-found)
│   ├── globals.css       # Tailwind v4 entry + design tokens (light/dark)
│   ├── robots.ts         # Dynamic robots.txt
│   ├── sitemap.ts        # Dynamic sitemap.xml
│   └── manifest.ts       # PWA web manifest
├── components/           # Reusable UI
│   ├── ui/               # shadcn/ui primitives (e.g. button)
│   ├── theme-toggle.tsx  # Dark/light switch
│   └── language-switcher.tsx
├── sections/             # Page sections (Hero, About, …) — not built yet
├── data/                 # Static/seed data + data-access helpers
├── lib/                  # Integrations & utilities
│   ├── supabase/         # Browser + server Supabase clients
│   ├── cloudinary.ts     # Cloudinary helpers
│   └── utils.ts          # `cn()` class merge helper
├── types/                # Shared TS types + next-intl augmentation
├── hooks/                # Reusable React hooks
├── providers/            # Client provider composition (theme, …)
├── constants/            # Static config (site, navigation)
├── i18n/                 # next-intl routing/request/navigation config
├── messages/             # Translation bundles (en.json, de.json)
└── public/               # Static assets
```

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Run the production build             |
| `npm run lint`      | Lint with ESLint                     |
| `npm run typecheck` | Type-check without emitting          |
| `npm run format`    | Format with Prettier                 |

## Internationalization

Locales are defined in `i18n/routing.ts` (`en` default, `de`). Translations live
in `messages/*.json` and are fully type-checked via `types/next-intl.d.ts`.

## Deployment

Optimized for [Vercel](https://vercel.com). Add the variables from `.env.example`
to your Vercel project settings, then connect the repository.
