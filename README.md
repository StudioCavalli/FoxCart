<div align="center">

<br>

```
  ███████╗ ██████╗ ██╗  ██╗ ██████╗ █████╗ ███████╗███████╗
  ██╔════╝██╔═══██╗╚██╗██╔╝██╔════╝██╔══██╗██╔════╝██╔════╝
  █████╗  ██║   ██║ ╚███╔╝ ██║     ███████║███████╗█████╗  
  ██╔══╝  ██║   ██║ ██╔██╗ ██║     ██╔══██║╚════██║██╔══╝  
  ██║     ╚██████╔╝██╔╝ ██╗╚██████╗██║  ██║███████║███████╗
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
```

### Site vitrine & e-commerce

<br>

[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![Payload](https://img.shields.io/badge/Payload_CMS-3-000?style=flat-square)](https://payloadcms.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-000?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-000?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Stripe](https://img.shields.io/badge/Stripe-payments-000?style=flat-square&logo=stripe)](https://stripe.com)

</div>

<br>

---

<br>

## `01` Stack

```
FRAMEWORK       Next.js 16          App Router, RSC, Server Actions, Turbopack
CMS             Payload CMS 3       Embedded, full TypeScript, Lexical editor
UI              shadcn/ui           + Tailwind CSS v4, glassmorphism, dark-first
DATABASE        PostgreSQL 16       Neon serverless (Docker locally)
PAYMENTS        Stripe              CB, Apple Pay, Google Pay, SEPA
SHIPPING        Packlink PRO        Multi-carrier, best price, real dimensions
PRINT           Gelato              Cards, flyers (drop-shipping)
BOOKS           Lulu Direct         Books, magazines (print-on-demand)
SOURCING        Alibaba             Signage, banners, roll-ups
EMAIL           Resend              Transactional (dark theme templates)
CACHE           Redis 7             Upstash (Docker locally)
I18N            next-intl v4        FR / EN, locale prefix routing
LINT            Biome               Lint + format, a11y rules
TESTS           Vitest              29 unit tests
```

<br>

## `02` Quick Start

> Requires [Docker Desktop](https://docs.docker.com/get-docker/) running

```bash
git clone https://github.com/StudioCavalli/FoxCart.git
cd FoxCart
./install.sh        # macOS / Linux
install.bat         # Windows
```

| Service | URL |
|:--------|:----|
| Site | [`localhost:3000/fr`](http://localhost:3000/fr) |
| Admin CMS | [`localhost:3000/admin`](http://localhost:3000/admin) |
| Mailpit | [`localhost:8025`](http://localhost:8025) |

<br>

## `03` Architecture

```
                    ┌─────────────────────────────┐
                    │        Vercel CDN            │
                    │        region: cdg1          │
                    └──────────┬──────────────────┘
                               │
              ┌────────────────┴────────────────┐
              │       Next.js 16 (App Router)    │
              │                                  │
              │   Frontend        Payload CMS    │
              │   RSC + i18n      Admin + API    │
              └───────┬──────────────┬──────────┘
                      │              │
              ┌───────┴──────────────┴──────────┐
              │        PostgreSQL (Neon)          │
              └──────────────────────────────────┘
                               │
          ┌────────┬───────────┼───────────┬─────────┐
          │        │           │           │         │
       Stripe   Packlink    Gelato      Lulu    Alibaba
      payments  shipping    print      books    signage
```

<br>

## `04` Project Structure

```
app/
├── (frontend)/[locale]/        Public site (i18n routed)
│   ├── page.tsx                Home
│   ├── services/               Catalog + detail + pricing
│   ├── shop/                   Products + detail + categories
│   ├── checkout/               4-step tunnel + Stripe
│   ├── account/                Dashboard, orders, addresses, settings
│   ├── quote/                  Multi-step quote form
│   ├── contact/                Form + OpenStreetMap
│   ├── about/ blog/ lab/       Content pages
│   └── legal/                  CGV, privacy, mentions, returns
├── (payload)/admin/            Payload CMS admin UI
└── api/                        Stripe webhooks, Packlink, search, auth

cms/                            14 collections, 3 globals
lib/                            Stripe, Packlink, Gelato, Lulu, Alibaba, Resend
components/                     Glass, layout, visual, shop, UI (19 shadcn)
```

<br>

## `05` Design System

```
PRIMARY / ACCENT     #FF6B00      ████████████████
ACCENT HOVER         #FF8533      ████████████████
BACKGROUND           #0A0A0A      ████████████████
SURFACE              #141414      ████████████████
FOREGROUND           #F4F4F4      ████████████████
BORDER               #262626      ████████████████
MUTED                #A0A0A0      ████████████████
```

> Dark-first with FoxCase orange accent.
> Brutalist DNA from FoxStudio — industrial grid, monumental typography.
> Glassmorphism on cards, mono uppercase labels, squared buttons.

**Fonts** &mdash; Geist Sans (display + body) &middot; Geist Mono (metadata, labels)

<br>

## `06` Scripts

```bash
# Docker
pnpm docker:up              Start all containers
pnpm docker:down            Stop
pnpm docker:reset           Wipe DB + restart

# Dev
pnpm dev                    Next.js (Turbopack)
pnpm build                  Production build

# Quality
pnpm check                  Biome lint + format
pnpm typecheck              TypeScript strict
pnpm test                   29 unit tests

# CMS
pnpm payload:seed           Seed demo data (or POST /api/seed)

# Integrations
pnpm stripe:sync            Sync products to Stripe
```

<br>

## `07` Documentation

| Doc | Description |
|:----|:------------|
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel, Neon, Stripe, Packlink, Gelato, Lulu, Resend |
| [`docs/ADMIN-GUIDE.md`](docs/ADMIN-GUIDE.md) | CMS: products, services, orders, blog, globals |
| [`CAHIER-DES-CHARGES-TECHNIQUE.md`](CAHIER-DES-CHARGES-TECHNIQUE.md) | Full technical specifications |
| [`MILESTONES.md`](MILESTONES.md) | All milestones and issues (65/65 closed) |

<br>

## `08` Legal

```
MONSIEUR CHRISTOPHER CAVALLI
Nom commercial : FoxCase
SIRET 834 802 407 00033
45 Boulevard de la Croisette, 06400 Cannes
```

<br>

---

<div align="center">

<br>

**FoxCase** &middot; Agence digitale &middot; Cannes

[foxcase.fr](https://foxcase.fr) &middot; [studio.foxcase.fr](https://studio.foxcase.fr)

<sub>FoxStudio est le laboratoire R&D de FoxCase</sub>

<br>

</div>
