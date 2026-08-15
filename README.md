# Conversion House — Website

A minimal, high-conversion single-page site for Conversion House (web design, e-commerce, and branding for small businesses), built with Next.js (App Router) + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Fonts

This build uses a system-font stack (no external font fetch) so it builds anywhere, including offline sandboxes.
To restore the original Inter + JetBrains Mono webfonts once you have normal internet access on your build machine, replace the top of `app/layout.tsx` with:

```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-utility", subsets: ["latin"], weight: ["400","500"] });
```

and add `${inter.variable} ${mono.variable}` to the `<body>` className. Then in `app/globals.css`, swap the `font-family` values in `body` and `.font-mono-label` back to `var(--font-inter)` / `var(--font-mono-utility)`.

## Structure

- `app/page.tsx` — assembles all sections
- `components/` — Header, Hero, CompareVisual (drag-to-compare before/after), LogoStrip, Services, Process, Testimonials, Pricing, About, FAQ, FinalCTA, Footer
- `app/globals.css` — design tokens (color, spacing, motion) as CSS variables

## To customize

- **Colors**: edit CSS variables at the top of `app/globals.css` (`--accent` is the brand green)
- **Copy**: edit the arrays/text at the top of each component in `components/`
- **Contact links**: update the email and WhatsApp number in `components/FinalCTA.tsx`
- **Pricing**: edit the `PLANS` array in `components/Pricing.tsx`
