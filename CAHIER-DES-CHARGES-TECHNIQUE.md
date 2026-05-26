# Cahier des charges technique — FoxCart

**Version :** 1.0  
**Date :** 2026-05-26  
**Commanditaire :** FoxCase (agence digitale)  
**Produit :** FoxCart — site vitrine & e-commerce pour FoxCase  
**Contact :** sebastien@sdweb.fr  

---

## 1. Contexte & positionnement

FoxCart est le **site principal de FoxCase**, l'entreprise mère. FoxStudio (le labo R&D, déjà en ligne) en est la filiale innovation. FoxCart doit :

1. **Vitrine commerciale** : présenter l'ensemble des prestations FoxCase (création de business plans, business models, apps mobiles, sites internet, SaaS, communication, ERP, chefferie de projet, formation pour écoles) avec tarification claire.
2. **E-commerce from scratch** : vente de supports commerciaux physiques — kakémonos, roll-ups, cartes de visite, flyers, livres, magazines — avec intégrations fournisseurs et expédition.
3. **Pont vers FoxStudio** : lien clair vers le labo pour les projets innovants.

**Audiences :** Professionnels (TPE/PME, startups, grands comptes) et particuliers.

---

## 2. Stack technique

### 2.1 Principe fondateur : monorepo full-stack

Un seul repository, un seul déploiement. Le front et le back cohabitent dans le même projet Next.js avec Payload CMS embarqué.

### 2.2 Socle

| Couche | Technologie | Version | Justification |
|---|---|---|---|
| **Framework** | Next.js | 15+ | App Router, RSC, Server Actions, monorepo natif avec Payload |
| **Runtime** | React | 19 | Server Components, Actions, `use()`, transitions |
| **Langage** | TypeScript | 5.7+ | strict, `noUncheckedIndexedAccess`, type-safety complète |
| **CMS + Backend** | Payload CMS | 3.x | Embarqué dans Next.js, full TS, collections e-commerce natives |
| **ORM** | Drizzle | via Payload | Requêtes type-safe, migrations auto |
| **Base de données** | PostgreSQL | 16+ | Neon serverless (branching par PR, cold start optimisé) |
| **Package manager** | pnpm | 9+ | Workspaces si besoin, lockfile déterministe |

### 2.3 Frontend & UI

| Couche | Technologie | Justification |
|---|---|---|
| **CSS** | Tailwind CSS v4 | Moteur Oxide, config CSS-first (`@theme`), zero-runtime |
| **Composants UI** | shadcn/ui | Composants accessibles, personnalisables, basés sur Radix |
| **Variantes** | CVA (class-variance-authority) | Variantes typées pour composants |
| **Animations** | Motion (ex-Framer Motion) | Transitions de page, micro-interactions |
| **Smooth scroll** | Lenis | Fluidité, respect `prefers-reduced-motion` |
| **Icônes** | Lucide React | Cohérent avec shadcn/ui |
| **Formulaires** | React Hook Form + Zod | Validation client/serveur unifiée |

### 2.4 E-commerce

| Couche | Technologie | Justification |
|---|---|---|
| **Paiement** | Stripe | Standard FR, SEPA + CB + Apple/Google Pay, webhooks robustes |
| **Panier** | Custom (Zustand + cookies) | Persistance côté client, sync serveur à l'auth |
| **Expédition** | Packlink PRO API | Agrégateur multi-transporteurs, meilleur prix auto |
| **Impression cartes/flyers** | Gelato API | Réseau mondial d'impression, API REST, prix compétitifs EU |
| **Impression livres** | Lulu Direct API | Référence impression livres/magazines, API complète |
| **Sourcing signalétique** | AliExpress/Alibaba Open Platform | Kakémonos, roll-ups, PLV — import catalogue + prix |
| **Emails transactionnels** | Resend | Confirmations commande, suivi expédition |

### 2.5 Internationalisation

| Couche | Technologie | Justification |
|---|---|---|
| **i18n** | next-intl v4 | App Router-first, server-friendly, splitting par locale |
| **Locales** | FR, EN | FR marché domestique, EN international |
| **Routing** | Préfixe locale (`/fr/`, `/en/`) | SEO-friendly, hreflang complet |
| **CMS** | Champs localisés Payload | Un document, traductions par champ |

### 2.6 Infrastructure & déploiement

| Service | Rôle |
|---|---|
| **Vercel** | Hébergement Next.js + Payload, Edge CDN, preview par PR |
| **Neon** | PostgreSQL serverless (branching par PR) |
| **Vercel Blob** | Stockage médias (images produits, assets) |
| **Stripe** | Passerelle de paiement |
| **Resend** | Emails transactionnels |
| **Upstash Redis** | Sessions panier, rate-limiting, cache |

### 2.7 Qualité & CI

| Outil | Rôle |
|---|---|
| **Biome** | Lint + format (remplace ESLint + Prettier) |
| **Vitest** | Tests unitaires |
| **Playwright** | Tests E2E + accessibilité (axe-core) |
| **GitHub Actions** | Pipeline CI : typecheck → lint → test → build → audit |
| **Lighthouse CI** | Audit performance automatisé |

---

## 3. Direction artistique technique

### 3.1 Palette de couleurs

Reprise de la DA FoxStudio (monochrome brutaliste) avec injection de l'identité FoxCase (orange).

```css
/* === Mode sombre (défaut) === */
--color-background:       #0A0A0A;
--color-foreground:        #F4F4F4;
--color-surface:           #141414;
--color-surface-elevated:  #1F1F1F;
--color-muted:             #A0A0A0;
--color-border:            #262626;

/* === Accent Orange FoxCase === */
--color-accent:            #FF6B00;     /* Orange principal */
--color-accent-hover:      #FF8533;     /* Orange clair (hover) */
--color-accent-muted:      #FF6B0033;   /* Orange translucide (glassmorphism) */
--color-accent-foreground: #FFFFFF;     /* Texte sur fond orange */

/* === Mode clair === */
--color-background-light:  #FFFFFF;
--color-foreground-light:  #0A0A0A;
--color-surface-light:     #F8F8F8;
--color-border-light:      #E5E5E5;

/* === Glassmorphism === */
--glass-background:        rgba(20, 20, 20, 0.6);
--glass-border:            rgba(255, 255, 255, 0.08);
--glass-blur:              16px;
--glass-shadow:            0 8px 32px rgba(0, 0, 0, 0.3);
```

### 3.2 Typographie

Reprise intégrale de FoxStudio :
- **Display / Titres** : Geist Sans (auto-hébergé via npm `geist`)
- **Body / UI** : Geist Sans
- **Mono / Métadonnées** : Geist Mono
- **Échelle** : même échelle FoxStudio (64px → 160px display, 16px body, 13px mono)

### 3.3 Glassmorphism

Application ciblée sur :
- **Cards produits** e-commerce (fond semi-transparent, blur, bordure lumineuse)
- **Cards services** (effet verre dépoli sur fond sombre)
- **Navigation** (header avec backdrop-blur au scroll)
- **Modales et overlays** (panier, filtres)
- **Pricing cards** (mise en avant du plan recommandé)

Implémentation Tailwind :
```html
<div class="bg-white/5 backdrop-blur-xl border border-white/10 
            rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
```

### 3.4 shadcn/ui — Personnalisation

- Thème custom aligné sur la palette FoxCase (orange accent, dark mode)
- Composants utilisés : Button, Card, Dialog, Sheet, Tabs, Table, Badge, Input, Select, Textarea, Toast, Dropdown, Command, Accordion, Carousel, Separator
- Override des radius : `0.5rem` (plus arrondi que FoxStudio pour le côté commercial)
- Toutes les variantes `accent` utilisent l'orange FoxCase

### 3.5 Animations & interactions

Reprise de FoxStudio avec adaptation :
- **Smooth scroll** (Lenis)
- **Reveal on scroll** (IntersectionObserver, fade + translate)
- **Page transitions** (View Transitions API + fallback Motion)
- **Hover effects** sur les cards (scale subtil + glow orange)
- **Curseur custom** (optionnel, lazy-loaded)
- `prefers-reduced-motion` strictement respecté

---

## 4. Architecture applicative

### 4.1 Structure du monorepo

```
FoxCart/
├── app/
│   ├── (frontend)/[locale]/              # Site public (i18n)
│   │   ├── layout.tsx                    # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                      # Home
│   │   ├── services/
│   │   │   ├── page.tsx                  # Catalogue des services
│   │   │   └── [slug]/page.tsx           # Page service détaillée + pricing
│   │   ├── shop/
│   │   │   ├── page.tsx                  # Boutique — catalogue produits
│   │   │   ├── [category]/
│   │   │   │   └── page.tsx              # Produits par catégorie
│   │   │   └── [category]/[slug]/
│   │   │       └── page.tsx              # Fiche produit
│   │   ├── cart/
│   │   │   └── page.tsx                  # Panier
│   │   ├── checkout/
│   │   │   ├── page.tsx                  # Tunnel de commande
│   │   │   └── success/page.tsx          # Confirmation commande
│   │   ├── account/
│   │   │   ├── page.tsx                  # Dashboard client
│   │   │   ├── orders/page.tsx           # Historique commandes
│   │   │   └── settings/page.tsx         # Paramètres compte
│   │   ├── about/
│   │   │   └── page.tsx                  # À propos de FoxCase
│   │   ├── lab/
│   │   │   └── page.tsx                  # Lien/présentation FoxStudio
│   │   ├── contact/
│   │   │   └── page.tsx                  # Formulaire contact (pro + particulier)
│   │   ├── quote/
│   │   │   └── page.tsx                  # Demande de devis (services)
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Articles / actualités
│   │   │   └── [slug]/page.tsx           # Article détail
│   │   ├── legal/
│   │   │   ├── mentions/page.tsx         # Mentions légales
│   │   │   ├── privacy/page.tsx          # Politique de confidentialité
│   │   │   ├── cgv/page.tsx              # CGV (e-commerce obligatoire)
│   │   │   └── returns/page.tsx          # Politique de retour
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── error.tsx
│   │
│   ├── (payload)/admin/                  # Payload CMS admin
│   │   └── [[...segments]]/page.tsx
│   │
│   ├── api/
│   │   ├── stripe/
│   │   │   └── webhooks/route.ts         # Stripe webhook handler
│   │   ├── packlink/
│   │   │   └── shipping/route.ts         # Calcul tarifs expédition
│   │   ├── cart/
│   │   │   └── route.ts                  # API panier (sync serveur)
│   │   └── quote/
│   │       └── route.ts                  # Soumission devis
│   │
│   ├── globals.css                       # Tokens, theme, animations, glassmorphism
│   ├── icon.svg                          # Favicon FoxCase
│   └── apple-icon.tsx
│
├── cms/
│   ├── collections/
│   │   ├── Users.ts                      # Utilisateurs admin + clients
│   │   ├── Media.ts                      # Médias (images, PDFs)
│   │   ├── Services.ts                   # Catalogue services
│   │   ├── ServiceCategories.ts          # Catégories de services
│   │   ├── Products.ts                   # Produits e-commerce
│   │   ├── ProductCategories.ts          # Catégories produits
│   │   ├── ProductVariants.ts            # Variantes (taille, finition, etc.)
│   │   ├── Orders.ts                     # Commandes
│   │   ├── OrderItems.ts                 # Lignes de commande
│   │   ├── Customers.ts                  # Clients (profil, adresses)
│   │   ├── Reviews.ts                    # Avis produits
│   │   ├── Coupons.ts                    # Codes promo
│   │   ├── BlogPosts.ts                  # Articles de blog
│   │   ├── Pages.ts                      # Pages statiques (About, etc.)
│   │   ├── Quotes.ts                     # Demandes de devis
│   │   └── Testimonials.ts              # Témoignages clients
│   │
│   ├── globals/
│   │   ├── Settings.ts                   # Config globale (SEO, contact, réseaux)
│   │   ├── Navigation.ts                 # Menus header/footer
│   │   └── ShopSettings.ts              # Config boutique (devise, TVA, seuils)
│   │
│   ├── hooks/
│   │   ├── revalidate.ts                # Revalidation ISR on publish
│   │   ├── stripe-sync.ts               # Sync produits → Stripe
│   │   └── order-notifications.ts       # Emails automatiques commandes
│   │
│   └── access/
│       ├── isAdmin.ts
│       ├── isEditor.ts
│       └── isCustomer.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    # Navigation principale + panier
│   │   ├── Footer.tsx                    # Footer riche
│   │   ├── MobileNav.tsx                 # Navigation mobile (Sheet)
│   │   └── Breadcrumbs.tsx              # Fil d'Ariane
│   │
│   ├── ui/                               # shadcn/ui (installés via CLI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── toast.tsx
│   │   ├── tabs.tsx
│   │   ├── table.tsx
│   │   ├── accordion.tsx
│   │   ├── carousel.tsx
│   │   ├── command.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   │
│   ├── glass/                            # Composants glassmorphism custom
│   │   ├── GlassCard.tsx                 # Card avec effet verre
│   │   ├── GlassPanel.tsx                # Panel glassmorphism
│   │   └── GlassModal.tsx                # Modal glassmorphism
│   │
│   ├── home/
│   │   ├── Hero.tsx                      # Hero section (manifeste + CTA)
│   │   ├── ServicesOverview.tsx          # Aperçu services (6 cards)
│   │   ├── FeaturedProducts.tsx          # Produits mis en avant
│   │   ├── Testimonials.tsx             # Témoignages clients (carousel)
│   │   ├── StatsSection.tsx             # Chiffres clés animés
│   │   ├── CTABand.tsx                  # Bandeau call-to-action
│   │   └── LabTeaser.tsx                # Teaser FoxStudio
│   │
│   ├── services/
│   │   ├── ServiceCard.tsx              # Card service (glassmorphism)
│   │   ├── PricingTable.tsx             # Tableau de prix
│   │   ├── PricingCard.tsx              # Card prix (3 tiers)
│   │   └── ServiceDetail.tsx            # Détail prestation
│   │
│   ├── shop/
│   │   ├── ProductCard.tsx              # Card produit
│   │   ├── ProductGallery.tsx           # Galerie images produit
│   │   ├── ProductInfo.tsx              # Infos produit + variantes + ajout panier
│   │   ├── ProductFilters.tsx           # Filtres (catégorie, prix, etc.)
│   │   ├── ProductGrid.tsx              # Grille produits responsive
│   │   ├── CartDrawer.tsx               # Panier latéral (Sheet)
│   │   ├── CartItem.tsx                 # Ligne panier
│   │   ├── CartSummary.tsx              # Résumé panier + total
│   │   ├── CheckoutForm.tsx             # Formulaire commande
│   │   ├── ShippingCalculator.tsx       # Calcul frais Packlink
│   │   ├── PaymentForm.tsx              # Intégration Stripe Elements
│   │   ├── OrderConfirmation.tsx        # Confirmation post-paiement
│   │   └── ReviewCard.tsx               # Avis client
│   │
│   ├── account/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── OrderDetail.tsx
│   │   └── AddressBook.tsx
│   │
│   ├── quote/
│   │   ├── QuoteForm.tsx                # Formulaire de devis multi-étapes
│   │   └── QuoteConfirmation.tsx
│   │
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx              # Rendu Lexical richtext
│   │   └── PostSidebar.tsx
│   │
│   ├── visual/
│   │   ├── FoxCaseLogo.tsx              # Logo FoxCase (SVG)
│   │   ├── SectionHeader.tsx            # En-tête section numérotée
│   │   ├── Reveal.tsx                   # Animation scroll reveal
│   │   ├── Marquee.tsx                  # Texte défilant
│   │   └── Pattern.tsx                  # Pattern décoratif
│   │
│   ├── seo/
│   │   └── LdJson.tsx                   # Schemas JSON-LD
│   │
│   └── providers/
│       ├── ClientProviders.tsx          # Providers client (cart, theme, scroll)
│       ├── CartProvider.tsx             # Context panier (Zustand)
│       ├── ThemeProvider.tsx            # Dark/light mode
│       └── SmoothScroll.tsx             # Lenis wrapper
│
├── lib/
│   ├── stripe/
│   │   ├── client.ts                    # Stripe client-side (loadStripe)
│   │   ├── server.ts                    # Stripe server-side (API)
│   │   ├── webhooks.ts                  # Traitement webhooks Stripe
│   │   └── checkout.ts                  # Création session checkout
│   │
│   ├── packlink/
│   │   ├── client.ts                    # Client API Packlink
│   │   ├── shipping-rates.ts            # Calcul tarifs
│   │   └── create-shipment.ts           # Création expédition
│   │
│   ├── gelato/
│   │   ├── client.ts                    # Client API Gelato
│   │   ├── products.ts                  # Catalogue produits print
│   │   └── orders.ts                    # Commandes impression
│   │
│   ├── lulu/
│   │   ├── client.ts                    # Client API Lulu Direct
│   │   ├── products.ts                  # Catalogue livres
│   │   └── orders.ts                    # Commandes impression livres
│   │
│   ├── alibaba/
│   │   ├── client.ts                    # Client API Alibaba/AliExpress
│   │   └── products.ts                  # Import catalogue signalétique
│   │
│   ├── cart/
│   │   ├── store.ts                     # Zustand store panier
│   │   ├── actions.ts                   # Server Actions panier
│   │   └── types.ts                     # Types panier
│   │
│   ├── email/
│   │   ├── client.ts                    # Client Resend
│   │   ├── templates/
│   │   │   ├── order-confirmation.tsx   # Template confirmation commande
│   │   │   ├── shipping-notification.tsx # Template expédition
│   │   │   ├── quote-received.tsx       # Template réception devis
│   │   │   └── welcome.tsx              # Template bienvenue
│   │   └── send.ts                      # Helper d'envoi
│   │
│   ├── data/
│   │   ├── services.ts                  # Fetchers services
│   │   ├── products.ts                  # Fetchers produits
│   │   ├── orders.ts                    # Fetchers commandes
│   │   └── blog.ts                      # Fetchers articles
│   │
│   ├── seo/
│   │   └── schema.ts                    # Builders JSON-LD (Organization, Product, Offer)
│   │
│   ├── validators/
│   │   ├── checkout.ts                  # Schémas Zod checkout
│   │   ├── quote.ts                     # Schémas Zod devis
│   │   └── contact.ts                   # Schémas Zod contact
│   │
│   ├── utils.ts                         # Utilitaires (cn, formatPrice, etc.)
│   └── site.ts                          # Constantes site (SITE, NAV)
│
├── i18n/
│   ├── routing.ts                       # Config next-intl routing
│   ├── request.ts                       # Server-side locale
│   └── navigation.ts                    # Locale-aware Link
│
├── messages/
│   ├── fr.json                          # Traductions FR
│   └── en.json                          # Traductions EN
│
├── hooks/
│   ├── use-cart.ts                      # Hook panier
│   ├── use-media-query.ts              # Hook responsive
│   └── use-scroll-direction.ts         # Hook direction scroll
│
├── scripts/
│   ├── seed.ts                          # Seed données initiales
│   ├── sync-stripe.ts                   # Sync produits vers Stripe
│   └── import-alibaba.ts               # Import catalogue Alibaba
│
├── public/
│   ├── fox-case-logo.svg               # Logo FoxCase
│   ├── og/                              # Images OG statiques
│   └── fonts/                           # Polices auto-hébergées (si hors npm)
│
├── payload.config.ts                    # Configuration Payload CMS
├── next.config.ts                       # Configuration Next.js
├── middleware.ts                         # i18n + CSP + auth middleware
├── tailwind.config.ts                   # (si nécessaire, sinon @theme dans globals.css)
├── postcss.config.mjs
├── tsconfig.json
├── biome.json
├── .env.example
├── .gitignore
└── package.json
```

### 4.2 Modèle de données — Collections Payload

#### Products (Produits e-commerce)

```typescript
{
  slug: string;                    // URL-friendly
  name: string;                    // localized
  description: richText;           // localized, Lexical
  shortDescription: text;          // localized, max 200 chars
  category: relationship;          // → ProductCategories
  images: array<upload>;           // Galerie (min 1, max 10)
  
  // Pricing
  basePrice: number;               // Prix HT en centimes
  compareAtPrice?: number;          // Prix barré (promo)
  taxRate: number;                  // Taux TVA (20% par défaut)
  
  // Variants
  hasVariants: boolean;
  variants: array<{
    name: string;                   // "Format", "Finition", "Quantité"
    options: array<{
      label: string;                // "A4", "A3", "Mat", "Brillant"
      priceModifier: number;        // Ajustement prix en centimes
      sku: string;                  // SKU unique
      stock: number;                // Stock (0 = sur commande)
    }>;
  }>;
  
  // Fulfillment
  fulfillmentType: enum;            // 'internal' | 'gelato' | 'lulu' | 'alibaba'
  externalProductId?: string;       // ID produit chez le fournisseur
  weight: number;                   // Poids en grammes (pour Packlink)
  dimensions: {                     // Dimensions en cm
    length: number;
    width: number;
    height: number;
  };
  
  // Metadata
  featured: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
  publishedAt: date;
  _status: 'draft' | 'published';
}
```

#### Services (Prestations)

```typescript
{
  slug: string;
  name: string;                     // localized
  tagline: string;                  // localized, accroche courte
  description: richText;            // localized, Lexical
  icon: string;                     // Nom icône Lucide
  category: relationship;           // → ServiceCategories
  
  // Pricing
  pricingType: enum;                // 'fixed' | 'from' | 'quote' | 'hourly'
  pricing: array<{
    tier: string;                   // "Essentiel", "Pro", "Enterprise"
    price: number;                  // Prix HT (0 = sur devis)
    unit?: string;                  // "/mois", "/projet", "/heure"
    features: array<string>;        // Liste des inclusions
    highlighted: boolean;           // Mise en avant (1 seul)
    cta: string;                    // Texte du bouton
    ctaLink: string;                // Lien (contact, devis, checkout)
  }>;
  
  // Content
  process: array<{                  // Étapes de réalisation
    step: number;
    title: string;                  // localized
    description: string;            // localized
  }>;
  deliverables: array<string>;      // localized
  timeline: string;                 // localized, "2-4 semaines"
  
  // SEO
  featured: boolean;
  order: number;                    // Ordre d'affichage
  publishedAt: date;
}
```

#### Orders (Commandes)

```typescript
{
  orderNumber: string;              // Auto-generated (FC-2026-00001)
  customer: relationship;           // → Customers
  
  items: array<{
    product: relationship;          // → Products
    variant?: string;               // SKU sélectionné
    quantity: number;
    unitPrice: number;              // Prix unitaire HT au moment de la commande
    totalPrice: number;             // quantity × unitPrice
  }>;
  
  // Totals
  subtotal: number;                 // Total HT
  shippingCost: number;             // Frais expédition
  taxAmount: number;                // TVA
  discountAmount: number;           // Réduction (coupon)
  total: number;                    // Total TTC
  
  // Coupon
  coupon?: relationship;            // → Coupons
  
  // Shipping
  shippingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    country: string;                // ISO 3166-1 alpha-2
    phone: string;
  };
  shippingMethod: string;           // Transporteur choisi
  packlinkShipmentId?: string;      // ID Packlink
  trackingNumber?: string;
  trackingUrl?: string;
  
  // Payment
  stripePaymentIntentId: string;
  paymentStatus: enum;              // 'pending' | 'paid' | 'failed' | 'refunded'
  
  // Status
  status: enum;                     // 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  
  // Fulfillment
  fulfillmentStatus: enum;          // 'unfulfilled' | 'partial' | 'fulfilled'
  fulfillmentDetails: array<{
    provider: string;               // 'gelato' | 'lulu' | 'alibaba' | 'internal'
    externalOrderId: string;
    status: string;
    items: array<string>;           // SKUs concernés
  }>;
  
  // Notes
  customerNote?: text;
  internalNote?: text;
  
  createdAt: date;
  updatedAt: date;
}
```

#### Customers (Clients)

```typescript
{
  email: string;                    // unique
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  type: enum;                       // 'individual' | 'professional'
  
  // Addresses
  addresses: array<{
    label: string;                  // "Domicile", "Bureau"
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
  
  // Stripe
  stripeCustomerId?: string;
  
  // Auth (Payload built-in)
  // email + password gérés par Payload auth
}
```

#### Quotes (Demandes de devis)

```typescript
{
  quoteNumber: string;              // Auto-generated (DV-2026-00001)
  
  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  type: enum;                       // 'individual' | 'professional'
  
  // Request
  service: relationship;            // → Services (optionnel)
  budget: enum;                     // '< 1000€' | '1000-5000€' | '5000-15000€' | '> 15000€'
  timeline: enum;                   // '< 1 mois' | '1-3 mois' | '3-6 mois' | '> 6 mois'
  description: textarea;            // Description du besoin
  attachments: array<upload>;       // Pièces jointes
  
  // Status
  status: enum;                     // 'new' | 'contacted' | 'quoted' | 'accepted' | 'rejected'
  internalNote?: textarea;
  quotedAmount?: number;
  
  createdAt: date;
}
```

#### Autres collections

- **ProductCategories** : `{ slug, name (localized), description (localized), image, parent?, order }`
- **ServiceCategories** : `{ slug, name (localized), description (localized), icon, order }`
- **Coupons** : `{ code, type ('percentage'|'fixed'), value, minOrder?, maxUses, usedCount, expiresAt, active }`
- **Reviews** : `{ product → Products, customer → Customers, rating (1-5), title, comment, verified, publishedAt }`
- **BlogPosts** : `{ slug, title (localized), lead (localized), body (richText, localized), author, tags, publishedAt }`
- **Testimonials** : `{ name, company, role, quote (localized), avatar, featured, order }`
- **Pages** : `{ slug, title (localized), content (richText, localized) }` — About, CGV, etc.
- **Media** : `{ upload, alt (localized), caption (localized) }`
- **Users** : `{ email, password, role ('admin'|'editor'|'customer'), firstName, lastName }`

### 4.3 Globals Payload

- **Settings** : SEO defaults, coordonnées FoxCase, réseaux sociaux, lien FoxStudio, logo
- **Navigation** : Header links, footer groups, CTA header
- **ShopSettings** : Devise (EUR), taux TVA par défaut, seuil livraison gratuite, message panier, politique retour

---

## 5. Intégrations externes

### 5.1 Stripe

**Flux de paiement :**
1. Client ajoute produits au panier (Zustand, persisté en cookies)
2. Page `/checkout` : formulaire adresse + choix expédition (Packlink)
3. Stripe Elements intégré (Card, Apple Pay, Google Pay, SEPA)
4. Création PaymentIntent côté serveur (Server Action)
5. Confirmation 3D Secure si nécessaire
6. Webhook `payment_intent.succeeded` → mise à jour commande → envoi email confirmation → déclenchement fulfillment

**Sync produits :**
- Hook Payload `afterChange` sur Products → crée/met à jour le produit Stripe
- Prix stockés en centimes côté Payload et Stripe

### 5.2 Packlink PRO

**Flux expédition :**
1. Client entre son adresse → appel API Packlink `/shipments/rates`
2. Affichage des options triées par prix (Colissimo, Mondial Relay, DHL, etc.)
3. Client choisit → tarif sauvegardé dans la commande
4. Post-paiement → création automatique de l'expédition via API
5. Récupération du numéro de suivi → email client

**Paramètres :**
- Adresse d'expédition source : adresse FoxCase
- Poids/dimensions : depuis la fiche produit
- Assurance : automatique au-delà de 100€

### 5.3 Gelato (impression cartes de visite, flyers, affiches)

**Flux :**
1. Produits Gelato pré-configurés dans le catalogue (via import ou saisie manuelle)
2. Client commande → post-paiement, appel API Gelato `POST /orders`
3. Gelato imprime et expédie directement au client (drop-shipping)
4. Webhook Gelato → mise à jour statut fulfillment

**Produits cibles :**
- Cartes de visite (format standard, premium, recyclé)
- Flyers (A5, A4, DL)
- Affiches (A3, A2, A1)
- Brochures
- Stickers

### 5.4 Lulu Direct (impression livres & magazines)

**Flux :**
1. Produits livres pré-configurés (format, reliure, papier)
2. Client commande → post-paiement, appel API Lulu `POST /print-jobs`
3. Upload du PDF intérieur + couverture (stockés sur Vercel Blob)
4. Lulu imprime et expédie (drop-shipping ou envoi à FoxCase pour re-expédition)

**Produits cibles :**
- Livres brochés (format poche, A5)
- Livres reliés
- Magazines
- Catalogues d'entreprise

### 5.5 Alibaba / AliExpress (signalétique, PLV)

**Flux :**
1. Import semi-automatique du catalogue : script `import-alibaba.ts` récupère produits (kakémonos, roll-ups, X-banners, totems)
2. Produits créés dans Payload avec `fulfillmentType: 'alibaba'` et `externalProductId`
3. Client commande → commande manuelle ou API chez le fournisseur Alibaba
4. Suivi via interface admin Payload

**Note :** L'API Alibaba Open Platform étant complexe (authentification seller), une première version peut fonctionner en semi-automatique (import catalogue + commande manuelle côté fournisseur), puis automatisation progressive.

### 5.6 Resend (emails transactionnels)

**Templates React (via `@react-email/components`) :**
- Confirmation de commande (récapitulatif + numéro)
- Notification d'expédition (tracking)
- Réception de demande de devis
- Bienvenue (création de compte)
- Réinitialisation mot de passe

---

## 6. Fonctionnalités détaillées

### 6.1 Home

- **Hero** : Titre manifeste FoxCase + sous-titre + double CTA ("Nos services" / "La boutique")
- **Services overview** : 6 cards glassmorphism, icône + titre + accroche, lien vers détail
- **Produits featured** : Carousel/grille de 4-6 produits phares
- **Témoignages** : Carousel de témoignages clients
- **Chiffres clés** : Compteurs animés (projets livrés, clients, années d'expérience)
- **Bandeau CTA** : "Un projet ? Demandez un devis" avec accent orange
- **Teaser FoxStudio** : Card lien vers le labo avec effet glassmorphism

### 6.2 Services

**Page catalogue (`/services`) :**
- Grille de toutes les prestations, filtrables par catégorie
- Cards glassmorphism avec icône, titre, tagline, "À partir de X€"

**Page détail (`/services/[slug]`) :**
- Description complète
- Tableau de pricing (3 tiers : Essentiel / Pro / Enterprise)
- Process de réalisation (étapes numérotées, timeline)
- Livrables
- CTA "Demander un devis" ou "Commander"
- Témoignages liés
- FAQ (Accordion)

**Liste des services (à minima) :**

| Catégorie | Services |
|---|---|
| **Stratégie** | Business Plan, Business Model Canvas, Étude de marché |
| **Digital** | Site vitrine, Site e-commerce, Application mobile, Application web/SaaS |
| **Communication** | Identité visuelle, Charte graphique, Community management, Stratégie de com |
| **Gestion** | ERP/CRM sur mesure, Chefferie de projet, Consulting digital |
| **Formation** | Formation dev (écoles), Formation outils digitaux, Workshops |
| **Support** | Maintenance, Hébergement, Support technique |

### 6.3 Boutique (E-commerce)

**Page catalogue (`/shop`) :**
- Filtres latéraux : catégorie, prix (range), tri (prix, nouveautés, populaires)
- Grille produits responsive (2 cols mobile, 3 tablet, 4 desktop)
- Pagination ou infinite scroll
- Recherche produit (Command palette shadcn)

**Page produit (`/shop/[category]/[slug]`) :**
- Galerie images (carousel + zoom)
- Sélecteur de variantes (taille, finition, quantité)
- Prix dynamique selon variantes
- Stock indicator
- Bouton "Ajouter au panier" (avec feedback toast)
- Description, spécifications techniques
- Avis clients (étoiles + commentaires)
- Produits similaires (recommandations)

**Catégories produits :**

| Catégorie | Exemples | Fournisseur |
|---|---|---|
| **Signalétique** | Kakémonos, roll-ups, X-banners, totems, drapeaux | Alibaba |
| **Print** | Cartes de visite, flyers, affiches, brochures, stickers | Gelato |
| **Édition** | Livres, magazines, catalogues, manuels | Lulu Direct |
| **Packaging** | Boîtes, sacs, emballages personnalisés | Alibaba |

### 6.4 Panier & Checkout

**Panier (CartDrawer) :**
- Drawer latéral (Sheet shadcn)
- Liste des articles avec image, variante, quantité modifiable, suppression
- Sous-total
- Code promo
- Bouton "Commander"

**Tunnel de commande (`/checkout`) :**
1. **Identification** : Connexion / Création compte / Invité
2. **Adresse** : Livraison + facturation (toggle "même adresse")
3. **Expédition** : Choix transporteur via Packlink (prix + délai)
4. **Paiement** : Stripe Elements (CB, Apple Pay, Google Pay, SEPA)
5. **Confirmation** : Récapitulatif avant validation
6. **Succès** (`/checkout/success`) : Confirmation + numéro de commande + email envoyé

### 6.5 Espace client (`/account`)

- Dashboard : dernières commandes, raccourcis
- Historique commandes : liste avec statut, détail, suivi
- Carnet d'adresses : CRUD adresses
- Paramètres : email, mot de passe, préférences

### 6.6 Demande de devis (`/quote`)

Formulaire multi-étapes :
1. Type (particulier / professionnel)
2. Service concerné (select)
3. Budget et délai souhaités
4. Description du besoin (textarea)
5. Pièces jointes (optionnel)
6. Coordonnées
7. Envoi → email notification interne + email confirmation client

### 6.7 Blog

- Liste des articles avec pagination
- Filtrage par tag
- Rendu Lexical richtext
- Partage social (Open Graph optimisé)

### 6.8 Contact

- Formulaire simple (nom, email, sujet, message)
- Anti-spam : honeypot + rate-limit Upstash
- Deux entrées : Professionnels / Particuliers

---

## 7. SEO & Données structurées

### Métadonnées dynamiques (par page)

- `title`, `description`, `openGraph`, `twitter` via `generateMetadata()`
- Images OG dynamiques (Next.js `ImageResponse`)
- Canonicals + hreflang (FR/EN)

### JSON-LD

| Page | Schema |
|---|---|
| Home | `Organization`, `WebSite` |
| Services | `Service`, `Offer` (avec pricing) |
| Produit | `Product`, `Offer`, `AggregateRating` |
| Blog | `Article`, `BlogPosting` |
| Contact | `ContactPage` |

### Sitemap & Robots

- Sitemap dynamique localisé (FR + EN)
- Robots.txt : index tout sauf `/admin`, `/api`, `/account`

---

## 8. Sécurité

| Mesure | Implémentation |
|---|---|
| **HTTPS** | Enforced par Vercel |
| **CSP** | Strict, nonce-based (`script-src 'nonce-xxx'`), whitelist Stripe/Vercel |
| **HSTS** | `max-age=63072000; includeSubDomains; preload` |
| **CORS** | Restrictif, domaine uniquement |
| **Rate limiting** | Upstash Redis sur les endpoints sensibles (checkout, contact, quote) |
| **Input validation** | Zod sur toutes les entrées (client + serveur) |
| **XSS** | React escape par défaut + CSP |
| **CSRF** | Server Actions Next.js (token automatique) |
| **SQL injection** | Drizzle ORM (requêtes paramétrées) |
| **Auth** | Payload auth (bcrypt, sessions) + Stripe auth (webhooks signés) |
| **Secrets** | Variables d'env Vercel, jamais committées, rotation documentée |
| **PCI DSS** | Stripe Elements (données CB jamais sur notre serveur) |
| **RGPD** | Consentement explicite, droit de suppression, export données, pas de cookie tiers |
| **Dependabot** | Activé, alertes de sécurité |

---

## 9. Performance

### Budgets

| Métrique | Budget |
|---|---|
| JS home (gzip) | ≤ 150 ko |
| CSS home (gzip) | ≤ 25 ko |
| LCP (mobile 4G) | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.05 |
| Lighthouse Performance (mobile) | ≥ 85 |
| TTFB | < 600 ms |

### Stratégies

- Server Components par défaut (zero JS pour les pages statiques)
- Dynamic imports pour composants lourds (Stripe Elements, galeries)
- Image optimization (AVIF/WebP via Next.js `<Image>`)
- ISR (Incremental Static Regeneration) pour pages produits/services
- Edge middleware pour i18n routing
- Preload des polices Geist
- Code splitting par route

---

## 10. Accessibilité

- **WCAG 2.2 AA** minimum
- Navigation clavier complète
- Focus visible (ring accent orange)
- Contrastes vérifiés (dark mode + orange accent ≥ 4.5:1)
- `prefers-reduced-motion` respecté
- Labels et ARIA sur tous les éléments interactifs
- Skip to content
- Alt text obligatoire (Biome rule)
- Tests axe-core en CI (Playwright)

---

## 11. Variables d'environnement

```bash
# === Database ===
DATABASE_URL=                        # Neon Postgres connection string
POSTGRES_URL_NON_POOLING=            # Neon non-pooled (preferred by Payload)

# === Payload ===
PAYLOAD_SECRET=                      # openssl rand -hex 32

# === Site ===
NEXT_PUBLIC_SITE_URL=                # https://foxcase.fr
NEXT_PUBLIC_SITE_NAME=FoxCart

# === Stripe ===
STRIPE_SECRET_KEY=                   # sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # pk_live_xxx
STRIPE_WEBHOOK_SECRET=               # whsec_xxx

# === Packlink ===
PACKLINK_API_KEY=                    # API key Packlink PRO
PACKLINK_SOURCE_ADDRESS=             # JSON adresse expéditeur

# === Gelato ===
GELATO_API_KEY=                      # API key Gelato

# === Lulu Direct ===
LULU_API_KEY=                        # API key Lulu
LULU_API_SECRET=                     # Secret Lulu (OAuth)

# === Alibaba ===
ALIBABA_APP_KEY=                     # App key Alibaba Open Platform
ALIBABA_APP_SECRET=                  # App secret

# === Resend ===
RESEND_API_KEY=                      # API key Resend

# === Upstash Redis ===
UPSTASH_REDIS_REST_URL=              # Redis URL
UPSTASH_REDIS_REST_TOKEN=            # Redis token

# === Storage ===
BLOB_READ_WRITE_TOKEN=               # Vercel Blob token

# === Analytics (optional) ===
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=        # foxcase.fr
```

---

## 12. Scripts npm

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "check": "biome check .",
  "check:fix": "biome check . --write",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "payload:migrate": "payload migrate",
  "payload:types": "payload generate:types",
  "payload:seed": "tsx scripts/seed.ts",
  "stripe:sync": "tsx scripts/sync-stripe.ts",
  "alibaba:import": "tsx scripts/import-alibaba.ts"
}
```

---

*Document technique maintenu par FoxCase. Toute modification doit être versionnée (Git) et datée.*
