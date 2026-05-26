<div align="center">

# FOXCART

**Site vitrine & e-commerce de [FoxCase](https://foxcase.fr)**

Next.js 16 · Payload CMS 3 · Tailwind v4 · shadcn/ui · Stripe · TypeScript

---

`services` · `e-commerce` · `glassmorphism` · `dark mode` · `i18n`

</div>

<br>

## Stack

| Layer | Tech |
|:------|:-----|
| Framework | **Next.js 16** — App Router, RSC, Server Actions, Turbopack |
| CMS | **Payload CMS 3** — embedded, full TypeScript, Lexical editor |
| UI | **shadcn/ui** + **Tailwind CSS v4** — glassmorphism, dark-first |
| Database | **PostgreSQL 16** via Neon (Docker locally) |
| Payments | **Stripe** — CB, Apple Pay, Google Pay, SEPA |
| Shipping | **Packlink PRO** — multi-carrier, best price |
| Print | **Gelato** (cards, flyers) · **Lulu Direct** (books) |
| Sourcing | **Alibaba** (signage, banners, roll-ups) |
| Email | **Resend** + React Email (Mailpit locally) |
| Cache | **Redis 7** via Upstash (Docker locally) |
| i18n | **next-intl v4** — FR / EN, locale prefix routing |
| Lint | **Biome** — lint + format, a11y rules |
| Tests | **Vitest** (unit) · **Playwright** (E2E + a11y) |

<br>

## Quick Start

### Prerequisites

- [Docker Desktop](https://docs.docker.com/get-docker/) running
- [Git](https://git-scm.com/)

### One command setup

```bash
git clone https://github.com/StudioCavalli/FoxCart.git
cd FoxCart
./install.sh          # macOS / Linux
install.bat           # Windows
```

That's it. Everything boots in Docker:

| Service | URL |
|:--------|:----|
| Site | http://localhost:3000/fr |
| Admin CMS | http://localhost:3000/admin |
| Mailpit | http://localhost:8025 |
| PostgreSQL | `localhost:5432` |
| Redis | `localhost:6379` |

<br>

## Project Structure

```
app/
├── (frontend)/[locale]/     # Public site — i18n routed
│   ├── page.tsx             # Home
│   ├── services/            # Service catalog + detail + pricing
│   ├── shop/                # Product catalog + detail
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout tunnel + Stripe
│   ├── account/             # Client dashboard, orders, addresses
│   ├── quote/               # Quote request (multi-step form)
│   ├── blog/                # Articles
│   ├── contact/             # Contact form
│   ├── about/               # About FoxCase
│   ├── lab/                 # Link to FoxStudio
│   └── legal/               # CGV, privacy, mentions, returns
├── (payload)/admin/         # Payload CMS admin UI
└── api/                     # Stripe webhooks, Packlink, cart

cms/
├── collections/             # Products, Services, Orders, Customers...
├── globals/                 # Settings, Navigation, ShopSettings
├── hooks/                   # ISR revalidation, Stripe sync
└── access/                  # Role-based access control

components/
├── ui/                      # shadcn/ui components (19 installed)
├── glass/                   # Glassmorphism components
├── layout/                  # Header, Footer, MobileNav, Breadcrumbs
├── home/                    # Hero, ServicesOverview, Testimonials
├── shop/                    # ProductCard, CartDrawer, CheckoutForm
├── services/                # ServiceCard, PricingTable
└── visual/                  # Reveal, SectionHeader, Marquee, Logo

lib/
├── stripe/                  # Payment integration
├── packlink/                # Shipping rates & shipment creation
├── gelato/                  # Print-on-demand (cards, flyers)
├── lulu/                    # Book & magazine printing
├── cart/                    # Zustand store + server actions
├── email/                   # Resend client + React Email templates
└── validators/              # Zod schemas (checkout, quote, contact)
```

<br>

## Scripts

```bash
# ── Docker ──────────────────────────────
pnpm docker:up              # Start all containers
pnpm docker:down            # Stop all containers
pnpm docker:logs            # Stream app logs
pnpm docker:seed            # Seed initial data
pnpm docker:migrate         # Run Payload migrations
pnpm docker:reset           # Wipe DB + restart

# ── Development ─────────────────────────
pnpm dev                    # Next.js dev (Turbopack)
pnpm build                  # Production build
pnpm start                  # Start production server

# ── Quality ─────────────────────────────
pnpm check                  # Biome lint + format
pnpm check:fix              # Auto-fix
pnpm typecheck              # TypeScript strict check
pnpm test                   # Vitest unit tests
pnpm test:e2e               # Playwright E2E

# ── Payload CMS ─────────────────────────
pnpm payload:migrate        # Run database migrations
pnpm payload:types          # Regenerate payload-types.ts
pnpm payload:seed           # Seed demo data

# ── Integrations ────────────────────────
pnpm stripe:sync            # Sync products → Stripe
pnpm alibaba:import         # Import products from Alibaba CSV
```

<br>

## Design System

**Dark-first** with FoxCase orange accent. Inherits FoxStudio's brutalist DNA — industrial grid, monumental typography, Geist fonts — with glassmorphism and warmth for the commercial context.

```
Primary / Accent     #FF6B00      ████████
Accent hover         #FF8533      ████████
Background (dark)    #0A0A0A      ████████
Surface              #141414      ████████
Foreground           #F4F4F4      ████████
Border               #262626      ████████
Muted                #A0A0A0      ████████
```

**Glassmorphism** — `glass`, `glass-card`, `glass-accent` utility classes with backdrop-blur, translucent borders, and orange glow on hover.

**Typography** — Geist Sans (display + body) · Geist Mono (metadata, labels, code)

<br>

## Environment Variables

Copy `.env.example` to `.env.local`. Docker defaults work out of the box for local dev.

| Variable | Required | Description |
|:---------|:--------:|:------------|
| `DATABASE_URL` | Yes | Postgres connection string |
| `PAYLOAD_SECRET` | Yes | Min 32 chars, `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public URL |
| `STRIPE_SECRET_KEY` | — | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | — | Stripe webhook signing secret |
| `PACKLINK_API_KEY` | — | Packlink PRO API key |
| `GELATO_API_KEY` | — | Gelato print API key |
| `LULU_API_KEY` | — | Lulu Direct API key |
| `RESEND_API_KEY` | — | Resend email API key |
| `BLOB_READ_WRITE_TOKEN` | — | Vercel Blob storage token |

<br>

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Vercel CDN                     │
├─────────────────────────────────────────────────┤
│              Next.js 16 (App Router)             │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  Frontend     │  │  Payload CMS (embedded)  │ │
│  │  RSC + i18n   │  │  Admin UI + REST API     │ │
│  └──────┬───────┘  └──────────┬───────────────┘ │
│         │                      │                  │
│  ┌──────┴──────────────────────┴───────────────┐ │
│  │              PostgreSQL (Neon)               │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ ┌─────────┐ │
│  │ Stripe  │ │Packlink │ │ Gelato │ │  Lulu   │ │
│  │Payments │ │Shipping │ │ Print  │ │ Books   │ │
│  └─────────┘ └─────────┘ └────────┘ └─────────┘ │
└─────────────────────────────────────────────────┘
```

<br>

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) — Vercel, Neon, Stripe, Packlink, Gelato, Lulu, Resend
- [Admin Guide](docs/ADMIN-GUIDE.md) — CMS: products, services, orders, blog, globals
- [Technical Specs](CAHIER-DES-CHARGES-TECHNIQUE.md) — Full technical specifications
- [Milestones](MILESTONES.md) — All milestones and issues

## Related

- **[FoxStudio](https://github.com/StudioCavalli/FoxStudio)** — R&D lab & innovation incubator (subsidiary)

<br>

---

<div align="center">

**FoxCase** · Agence digitale

[Website](https://foxcase.fr) · [FoxStudio Lab](https://studio.foxcase.fr) 

</div>
