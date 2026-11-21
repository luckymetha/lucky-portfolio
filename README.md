# Lucky Metha Purnomo — Portfolio Web App

Modern minimalist, dual-theme (Dark & Light), bilingual (**ID / EN**) portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Highlights

- **Selected Production Work (`#work`)**: Interactive category filtering and rich case-study modals for 7 flagship products (BOOSTRA, dRetail Accounting Backoffice, dRetail Official Website, ELC Indonesia, Sistem Informasi Klinik Dr. Kosim Syarif, SiNovel, PWA Combiphar R&D) with **Visual Preview** and **Live Interactive Embed** modes.
- **Experiments & Labs (`#labs`)**: Showcases cross-domain engineering craftsmanship including Pixel-Perfect Slicing (Undangan Digital), MetaTrader 5 MQL5 (XAUUSD SMC Probability Monitor), Three.js 3D WebGL (Chrono Pusaka 3D), Vue 3 EdTech (Pesta Porsi Hewan), and Python Pygame (Pusaka Nusantara 2D RPG).
- **Dual Theme + Bilingual**: Instant Dark/Light toggle (`next-themes`) and Indonesian/English switcher (`ID / EN`) persisted in `localStorage`.
- **Printable ATS Resume (`/resume`)**: Dedicated `/resume` route optimized for `@media print` (Print / Save as PDF).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3005](http://localhost:3005).

## Personalizing Links & Photo

1. Open `src/data/portfolio-data.ts` and fill in `linkedinUrl` and `githubUrl` inside `PROFILE`.
2. Replace `public/images/profile.jpg` anytime if you want to update your profile portrait.

## Deploy to Vercel

Push this folder to a GitHub repository and import it directly in [Vercel](https://vercel.com) — zero extra configuration required.
