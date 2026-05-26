# Milestones & Issues — FoxCart

**Version :** 1.0  
**Date :** 2026-05-26  

---

## Vue d'ensemble

| # | Milestone | Durée | Dépendance |
|---|---|---|---|
| M1 | Setup & Foundation | 1 semaine | — |
| M2 | Design System & UI Kit | 1.5 semaines | M1 |
| M3 | Vitrine — Pages statiques | 2 semaines | M2 |
| M4 | CMS & Contenu | 1.5 semaines | M3 |
| M5 | E-commerce — Catalogue & Panier | 2.5 semaines | M4 |
| M6 | E-commerce — Checkout & Paiement | 2 semaines | M5 |
| M7 | Intégrations fournisseurs | 2 semaines | M6 |
| M8 | Espace client & Auth | 1.5 semaines | M6 |
| M9 | SEO, i18n & Contenu | 1.5 semaines | M3, M5 |
| M10 | Tests, Performance & Sécurité | 1.5 semaines | M8 |
| M11 | Mise en production | 1 semaine | M10 |

**Total estimé : ~18 semaines**

---

## M1 — Setup & Foundation

> Poser les bases techniques : repo, config, CI, dépendances.

### Issues

#### M1-01 — Initialiser le projet Next.js 15 + TypeScript strict
**Labels :** `setup`, `priority:critical`  
**Description :**
- `pnpm create next-app` avec App Router, TypeScript, Tailwind
- Configurer `tsconfig.json` : strict, `noUncheckedIndexedAccess`, `noImplicitOverride`, path aliases `@/*`
- Configurer `next.config.ts` : `reactStrictMode`, `poweredByHeader: false`, `typedRoutes`, image formats AVIF/WebP
- Structure de dossiers initiale (app, components, lib, cms, i18n, hooks, scripts, public)
- `.gitignore` adapté (node_modules, .next, .env.local, payload-types.ts)

**Critères d'acceptation :**
- [ ] `pnpm dev` démarre sans erreur
- [ ] `pnpm typecheck` passe
- [ ] Structure conforme au CDC §4.1

---

#### M1-02 — Installer et configurer Payload CMS v3 (embarqué)
**Labels :** `setup`, `cms`, `priority:critical`  
**Description :**
- Installer `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/storage-vercel-blob`
- Configurer `payload.config.ts` avec localisation FR/EN, drafts + versions, Lexical editor
- Créer la route admin `app/(payload)/admin/[[...segments]]/page.tsx`
- Configurer la base de données Neon (variable `DATABASE_URL`)
- Créer `.env.example` avec toutes les variables documentées

**Critères d'acceptation :**
- [ ] `/admin` accessible et fonctionnel
- [ ] Connexion admin possible
- [ ] Migration initiale appliquée

---

#### M1-03 — Configurer Tailwind CSS v4 + PostCSS
**Labels :** `setup`, `styling`, `priority:critical`  
**Description :**
- Installer `tailwindcss` v4 + `@tailwindcss/postcss`
- Configurer `postcss.config.mjs`
- Créer `app/globals.css` avec le bloc `@theme` contenant tous les tokens de couleur (palette dark, orange FoxCase, glassmorphism)
- Définir les variables de spacing, typography scale, border radius
- Définir les keyframes d'animation (reveal, marquee, skeleton)
- Classes utilitaires : `.glass`, `.glass-card`, `.glass-panel`

**Critères d'acceptation :**
- [ ] Tailwind compile sans erreur
- [ ] Tokens de couleur utilisables (`text-accent`, `bg-glass`, etc.)
- [ ] Classes glassmorphism fonctionnelles

---

#### M1-04 — Installer et configurer shadcn/ui
**Labels :** `setup`, `ui`, `priority:high`  
**Description :**
- `pnpm dlx shadcn@latest init` avec thème custom (orange accent, dark mode, radius 0.5rem)
- Installer les composants de base : Button, Card, Input, Select, Textarea, Badge, Toast, Dialog, Sheet, Tabs, Table, Accordion, Carousel, Command, Dropdown, Separator, Skeleton
- Configurer `components.json` (path aliases, style)
- Customiser les variantes `accent` pour l'orange FoxCase

**Critères d'acceptation :**
- [ ] Tous les composants listés installés
- [ ] Variant `accent` sur Button rend en orange
- [ ] Dark mode fonctionne correctement

---

#### M1-05 — Configurer Biome (lint + format)
**Labels :** `setup`, `dx`, `priority:high`  
**Description :**
- Installer `@biomejs/biome`
- Configurer `biome.json` : 2 spaces, double quotes, trailing commas, 100 chars line width, rules recommandées + a11y
- Ignorer `.next`, `node_modules`, `payload-types.ts`
- Script `check` et `check:fix`

**Critères d'acceptation :**
- [ ] `pnpm check` passe sur le projet initial
- [ ] Règles a11y actives (useAltText, useValidAriaProps)

---

#### M1-06 — Configurer next-intl v4 (i18n)
**Labels :** `setup`, `i18n`, `priority:high`  
**Description :**
- Installer `next-intl`
- Créer `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`
- Configurer le middleware i18n dans `middleware.ts`
- Créer `messages/fr.json` et `messages/en.json` (structure initiale)
- Route groupe `app/(frontend)/[locale]/layout.tsx` avec `setRequestLocale()`
- Redirection racine `/` → `/fr` selon `Accept-Language`

**Critères d'acceptation :**
- [ ] `/fr` et `/en` rendent des contenus différents
- [ ] Redirection automatique à la racine
- [ ] `generateStaticParams()` exporte les locales

---

#### M1-07 — Configurer CI GitHub Actions
**Labels :** `setup`, `ci`, `priority:medium`  
**Description :**
- Créer `.github/workflows/ci.yml` :
  1. Typecheck (`tsc --noEmit`)
  2. Lint (`biome check`)
  3. Tests unitaires (`vitest run`)
  4. Build (`next build`)
- Trigger sur push `main` et PR
- Node 22, pnpm, cache

**Critères d'acceptation :**
- [ ] Pipeline passe au vert sur la branche initiale
- [ ] Échec visible si typecheck ou lint échoue

---

#### M1-08 — Setup Docker (dev local complet)
**Labels :** `setup`, `docker`, `priority:critical`  
**Description :**
- Créer le `Dockerfile` multi-stage (development, builder, production)
- Créer `docker-compose.yml` avec :
  - **app** : Next.js avec hot reload (volume mount)
  - **postgres** : PostgreSQL 16 Alpine avec healthcheck
  - **redis** : Redis 7 Alpine avec healthcheck
  - **mailpit** : Mail catcher (SMTP :1025, Web UI :8025)
- Créer `.env.docker` avec les variables pré-configurées pour le dev local
- Ajouter `.dockerignore` (node_modules, .next, .git, etc.)
- Ajouter les scripts npm Docker : `docker:up`, `docker:down`, `docker:build`, `docker:logs`, `docker:seed`, `docker:migrate`, `docker:reset`
- Configurer le hot reload via volumes (exclure node_modules et .next)
- Configurer Resend pour pointer vers Mailpit en local (SMTP localhost:1025)

**Critères d'acceptation :**
- [ ] `docker compose up -d` lance tout l'environnement en < 2 min
- [ ] Hot reload fonctionne (modification fichier → refresh auto)
- [ ] Postgres accessible et fonctionnel
- [ ] Redis accessible
- [ ] Emails capturés dans Mailpit (http://localhost:8025)
- [ ] `docker compose exec app pnpm payload:seed` fonctionne
- [ ] Pas de volume conflict (node_modules isolés)

---

#### M1-09 — Configurer les polices Geist
**Labels :** `setup`, `typography`, `priority:medium`  
**Description :**
- Installer `geist` (npm)
- Configurer dans le root layout : `GeistSans`, `GeistMono`
- Variables CSS `--font-sans`, `--font-mono`
- `font-display: swap`

**Critères d'acceptation :**
- [ ] Polices chargées et visibles
- [ ] Pas de FOUT visible (swap rapide)
- [ ] Variables CSS disponibles dans Tailwind

---

## M2 — Design System & UI Kit

> Construire les composants réutilisables, le système de design, les effets visuels.

### Issues

#### M2-01 — Créer les composants glassmorphism
**Labels :** `ui`, `design`, `priority:critical`  
**Description :**
- `GlassCard` : card avec backdrop-blur, bordure translucide, ombre
- `GlassPanel` : panel plus large (sections, sidebars)
- `GlassModal` : modal avec effet verre dépoli
- Props : `variant` (subtle, medium, strong), `accent` (boolean, bordure orange glow)
- Responsive : adapter l'intensité du blur sur mobile (performance)
- Respect `prefers-reduced-motion`

**Critères d'acceptation :**
- [ ] 3 composants fonctionnels avec variants
- [ ] Rendu correct en dark + light mode
- [ ] Pas de dégradation perf mobile visible

---

#### M2-02 — Créer le layout principal (Header + Footer + Container)
**Labels :** `ui`, `layout`, `priority:critical`  
**Description :**
- **Header** : logo FoxCase, navigation principale (Services, Boutique, À propos, Blog, Contact), switcher de langue (FR/EN), icône panier avec badge compteur, CTA "Devis gratuit", sticky avec backdrop-blur au scroll
- **Footer** : logo, colonnes (Services, Boutique, Entreprise, Légal), réseaux sociaux, copyright, lien FoxStudio
- **Container** : max-width 1440px, responsive margins/padding (reprendre grille FoxStudio)
- **MobileNav** : Sheet latéral avec menu complet
- **Breadcrumbs** : fil d'Ariane auto-généré

**Critères d'acceptation :**
- [ ] Navigation responsive (desktop + mobile)
- [ ] Panier badge visible avec compteur
- [ ] Breadcrumbs sur toutes les pages internes
- [ ] Footer complet

---

#### M2-03 — Créer les composants visuels (Reveal, SectionHeader, Marquee, Pattern)
**Labels :** `ui`, `animation`, `priority:high`  
**Description :**
- **Reveal** : wrapper qui anime les enfants en fade+translate au scroll (IntersectionObserver)
- **SectionHeader** : numéro + label + meta en mono (style FoxStudio)
- **Marquee** : texte défilant horizontal (CSS animation)
- **Pattern** : pattern décoratif orange semi-transparent (adaptation du halftone FoxStudio)
- **FoxCaseLogo** : composant SVG du logo FoxCase

**Critères d'acceptation :**
- [ ] Reveal anime correctement (threshold 0.2)
- [ ] Marquee pause on hover
- [ ] Tous respectent `prefers-reduced-motion`
- [ ] Logo SVG en `currentColor`

---

#### M2-04 — Configurer Motion (animations de page)
**Labels :** `ui`, `animation`, `priority:medium`  
**Description :**
- Installer `motion`
- Créer un `AnimatePresence` wrapper pour les transitions de page
- Définir les presets d'animation : `fadeIn`, `slideUp`, `slideDown`, `scaleIn`
- Configurer les tokens de durée/easing alignés sur FoxStudio (150ms fast, 300ms base, 600ms slow)

**Critères d'acceptation :**
- [ ] Transitions de page fluides
- [ ] Presets réutilisables
- [ ] Désactivé sous `prefers-reduced-motion`

---

#### M2-05 — Configurer Lenis (smooth scroll)
**Labels :** `ui`, `animation`, `priority:medium`  
**Description :**
- Installer `lenis`
- Créer `SmoothScroll.tsx` provider (lazy-loaded, client-only)
- Intégrer dans `ClientProviders.tsx`
- Désactiver sous `prefers-reduced-motion`

**Critères d'acceptation :**
- [ ] Scroll fluide actif
- [ ] Pas de conflit avec les formulaires/selects natifs
- [ ] Désactivé proprement si reduced-motion

---

#### M2-06 — Créer le ThemeProvider (dark/light mode)
**Labels :** `ui`, `priority:medium`  
**Description :**
- Provider dark/light mode (sombre par défaut)
- Persistance en localStorage
- Toggle dans le header
- Classes CSS `.dark` / `.light`

**Critères d'acceptation :**
- [ ] Toggle fonctionne
- [ ] Persistance entre sessions
- [ ] Pas de flash au chargement

---

## M3 — Vitrine — Pages statiques

> Construire les pages principales du site vitrine.

### Issues

#### M3-01 — Page Home
**Labels :** `page`, `vitrine`, `priority:critical`  
**Description :**
- **Hero** : titre manifeste FoxCase, sous-titre, double CTA ("Nos services" + "La boutique"), pattern décoratif orange, grille blueprint subtile en fond
- **Services overview** : 6 cards glassmorphism (icône Lucide + titre + tagline + "À partir de X€"), lien vers `/services`
- **Produits featured** : section avec 4-6 produits phares (carousel ou grille)
- **Témoignages** : carousel de 3-5 témoignages clients
- **Chiffres clés** : 4 compteurs animés (projets, clients, années, satisfaction)
- **Bandeau CTA** : fond orange, "Un projet ? Parlons-en" + bouton devis
- **Teaser FoxStudio** : card glassmorphism avec lien vers FoxStudio

**Critères d'acceptation :**
- [ ] Toutes les sections rendues
- [ ] Animations au scroll (Reveal)
- [ ] Responsive mobile/tablet/desktop
- [ ] CTAs fonctionnels (liens corrects)
- [ ] Compteurs animés au scroll

---

#### M3-02 — Page Services (catalogue)
**Labels :** `page`, `vitrine`, `priority:critical`  
**Description :**
- Hero section avec titre + description
- Filtres par catégorie (tabs ou badges cliquables)
- Grille de service cards (glassmorphism)
- Chaque card : icône, titre, tagline, "À partir de X€", CTA

**Critères d'acceptation :**
- [ ] Filtrage par catégorie fluide
- [ ] Cards responsives (1-2-3 colonnes)
- [ ] Liens vers pages détail

---

#### M3-03 — Page Service détail
**Labels :** `page`, `vitrine`, `priority:critical`  
**Description :**
- Titre + tagline + badge catégorie
- Description complète (richtext Payload)
- **Pricing table** : 3 colonnes (Essentiel / Pro / Enterprise) avec features, prix, CTA
- Card mise en avant (plan recommandé) avec bordure orange glow
- Process de réalisation : timeline numérotée (étapes)
- Livrables : liste à puces
- CTA final : "Demander un devis pour ce service"
- Témoignages liés (si disponibles)
- FAQ en Accordion

**Critères d'acceptation :**
- [ ] Pricing table responsive (stacked sur mobile)
- [ ] Plan highlighted visuellement différencié
- [ ] CTA "Devis" pré-remplit le formulaire avec le service

---

#### M3-04 — Page À propos
**Labels :** `page`, `vitrine`, `priority:high`  
**Description :**
- Présentation FoxCase (histoire, mission, valeurs)
- Lien vers FoxStudio (le labo)
- Équipe (optionnel, si contenu disponible)
- Chiffres clés
- Partenaires / certifications

**Critères d'acceptation :**
- [ ] Contenu éditable via CMS (Pages collection)
- [ ] Section FoxStudio avec CTA externe

---

#### M3-05 — Page Contact
**Labels :** `page`, `vitrine`, `priority:high`  
**Description :**
- Formulaire : nom, email, téléphone, sujet (select), type (particulier/pro), message
- Validation Zod client + serveur
- Anti-spam : honeypot + rate-limit
- Envoi via Resend (ou EmailJS en fallback)
- Coordonnées FoxCase (adresse, email, téléphone)
- Map (optionnel, iframe Google Maps ou leaflet)

**Critères d'acceptation :**
- [ ] Validation en temps réel
- [ ] Email envoyé au submit
- [ ] Toast de confirmation
- [ ] Rate-limit actif (max 3 envois / 15 min par IP)

---

#### M3-06 — Page Demande de devis
**Labels :** `page`, `vitrine`, `priority:high`  
**Description :**
- Formulaire multi-étapes (stepper) :
  1. Type (particulier / professionnel)
  2. Service concerné (select depuis Services collection)
  3. Budget + timeline
  4. Description du besoin
  5. Coordonnées
  6. Récapitulatif + envoi
- Pièces jointes (upload)
- Sauvegarde dans collection Quotes
- Email notification interne + confirmation client

**Critères d'acceptation :**
- [ ] Navigation stepper fluide (avant/arrière)
- [ ] Validation par étape
- [ ] Upload pièces jointes fonctionnel
- [ ] Quote sauvegardée dans Payload admin

---

#### M3-07 — Pages légales (CGV, mentions, privacy, retours)
**Labels :** `page`, `legal`, `priority:high`  
**Description :**
- Mentions légales
- Politique de confidentialité (RGPD)
- Conditions Générales de Vente (obligatoire e-commerce)
- Politique de retour/remboursement
- Contenu éditable via CMS (Pages collection)

**Critères d'acceptation :**
- [ ] 4 pages créées et accessibles
- [ ] Contenu modifiable depuis l'admin
- [ ] Liens dans le footer

---

#### M3-08 — Page Lab (lien FoxStudio)
**Labels :** `page`, `vitrine`, `priority:low`  
**Description :**
- Page de présentation de FoxStudio
- Explication de la filiation FoxCase → FoxStudio
- CTA vers le site FoxStudio (externe)
- Quelques highlights de projets du labo

**Critères d'acceptation :**
- [ ] Lien externe fonctionnel
- [ ] Design cohérent avec le reste du site

---

## M4 — CMS & Contenu

> Configurer toutes les collections Payload et seeder les données.

### Issues

#### M4-01 — Créer les collections Services & ServiceCategories
**Labels :** `cms`, `priority:critical`  
**Description :**
- `ServiceCategories` : slug, name (localized), description (localized), icon, order
- `Services` : tous les champs du CDC §4.2 (slug, name, tagline, description richtext, icon, category, pricingType, pricing array, process, deliverables, timeline, featured, order)
- Localisation FR/EN sur tous les champs textuels
- Drafts + versions activés
- Access control : admin/editor can create/update, public can read published

**Critères d'acceptation :**
- [ ] Collections créées et migrées
- [ ] Admin UI fonctionnel pour saisir un service complet
- [ ] Champs localisés visibles

---

#### M4-02 — Créer les collections Products, ProductCategories, ProductVariants
**Labels :** `cms`, `ecommerce`, `priority:critical`  
**Description :**
- `ProductCategories` : slug, name (localized), description (localized), image, parent?, order
- `Products` : tous les champs du CDC §4.2 (slug, name, descriptions, images, pricing, variants, fulfillment, dimensions, featured, stripe IDs)
- Variantes inline (array dans Products) avec SKU, priceModifier, stock
- fulfillmentType enum : internal, gelato, lulu, alibaba
- Hook `afterChange` pour sync Stripe (M6)

**Critères d'acceptation :**
- [ ] Collections créées et migrées
- [ ] Variantes saisissables depuis l'admin
- [ ] Images uploadables (Vercel Blob)
- [ ] `payload generate:types` génère les types corrects

---

#### M4-03 — Créer les collections Orders, Customers, Coupons
**Labels :** `cms`, `ecommerce`, `priority:critical`  
**Description :**
- `Customers` : email, name, company, phone, type, addresses array, stripeCustomerId
- `Orders` : tous les champs du CDC §4.2 (orderNumber auto, items, totals, shipping, payment, status, fulfillment)
- `Coupons` : code, type, value, minOrder, maxUses, usedCount, expiresAt, active
- Auto-generation du orderNumber (FC-YYYY-NNNNN)
- Access control : admin full, customer reads own orders

**Critères d'acceptation :**
- [ ] Collections créées et migrées
- [ ] OrderNumber auto-incrémenté
- [ ] Customer ne voit que ses propres commandes
- [ ] Coupons validables (code unique, pas expiré, pas max uses)

---

#### M4-04 — Créer les collections Quotes, Reviews, Testimonials, BlogPosts
**Labels :** `cms`, `priority:high`  
**Description :**
- `Quotes` : quoteNumber auto, contact info, service relation, budget, timeline, description, attachments, status
- `Reviews` : product relation, customer relation, rating 1-5, title, comment, verified
- `Testimonials` : name, company, role, quote (localized), avatar, featured, order
- `BlogPosts` : slug, title, lead, body richtext, author, tags, publishedAt
- Localisation sur les champs pertinents

**Critères d'acceptation :**
- [ ] 4 collections créées et migrées
- [ ] QuoteNumber auto-généré (DV-YYYY-NNNNN)
- [ ] Reviews liées aux produits
- [ ] Blog posts avec rendu Lexical

---

#### M4-05 — Créer les globals Settings, Navigation, ShopSettings
**Labels :** `cms`, `priority:high`  
**Description :**
- `Settings` : SEO defaults (title, description, OG image), coordonnées FoxCase, réseaux sociaux, lien FoxStudio, logo
- `Navigation` : header links array, footer groups array, CTA header config
- `ShopSettings` : currency (EUR), default tax rate, free shipping threshold, cart message, return policy summary

**Critères d'acceptation :**
- [ ] Globals éditables depuis admin
- [ ] Valeurs utilisables côté front (fetch via Payload API)

---

#### M4-06 — Script de seed des données initiales
**Labels :** `cms`, `dx`, `priority:high`  
**Description :**
- Créer `scripts/seed.ts` idempotent :
  - 6+ catégories de services
  - 10+ services avec pricing tiers
  - 4+ catégories de produits
  - 15+ produits (signalétique, print, édition)
  - 5+ témoignages
  - 3+ articles de blog
  - Globals (Settings, Navigation, ShopSettings)
  - Admin user
- Données réalistes et en français

**Critères d'acceptation :**
- [ ] `pnpm payload:seed` crée toutes les données
- [ ] Réexécution = pas de doublons
- [ ] Données suffisantes pour naviguer le site complet

---

#### M4-07 — Hooks Payload (revalidation ISR)
**Labels :** `cms`, `priority:medium`  
**Description :**
- Hook `afterChange` sur Services → `revalidateTag('services')`
- Hook `afterChange` sur Products → `revalidateTag('products')`
- Hook `afterChange` sur BlogPosts → `revalidateTag('blog')`
- Hook `afterChange` sur Testimonials → `revalidateTag('testimonials')`
- Hook `afterChange` sur Globals → `revalidateTag('settings')` / `revalidateTag('navigation')`

**Critères d'acceptation :**
- [ ] Modification dans l'admin → page front mise à jour sans rebuild
- [ ] Tags de revalidation documentés

---

## M5 — E-commerce — Catalogue & Panier

> Construire l'expérience de navigation et d'achat.

### Issues

#### M5-01 — Page boutique (catalogue produits)
**Labels :** `page`, `ecommerce`, `priority:critical`  
**Description :**
- Hero section avec titre + description boutique
- **Filtres latéraux** (desktop) / **Filtres en Sheet** (mobile) :
  - Catégorie (checkbox ou radio)
  - Fourchette de prix (range slider)
  - Tri (prix croissant/décroissant, nouveautés, populaires)
- **Grille produits** responsive (2/3/4 colonnes)
- **ProductCard** : image, badge catégorie, titre, prix, bouton "Ajouter au panier"
- Pagination (ou infinite scroll)
- URL state : filtres reflétés dans l'URL (`?category=print&sort=price-asc`)
- Résultats vides : message + CTA

**Critères d'acceptation :**
- [ ] Filtres fonctionnels et cumulables
- [ ] URL shareable avec filtres
- [ ] Grid responsive
- [ ] Pagination fonctionnelle
- [ ] Chargement avec Skeleton

---

#### M5-02 — Page produit détail
**Labels :** `page`, `ecommerce`, `priority:critical`  
**Description :**
- **ProductGallery** : carousel d'images avec zoom (click ou hover)
- **ProductInfo** :
  - Titre, badge catégorie
  - Prix (dynamique selon variantes sélectionnées)
  - Prix barré si promo
  - Sélecteur de variantes (boutons ou select selon le nombre d'options)
  - Indicateur stock ("En stock", "Sur commande", "X restants")
  - Quantité (+/-)
  - Bouton "Ajouter au panier" (accent orange, feedback toast)
- Description (richtext)
- Spécifications techniques (table)
- **Reviews** : note moyenne + liste des avis + formulaire d'ajout
- **Produits similaires** : 4 cards en bas de page

**Critères d'acceptation :**
- [ ] Variantes changent le prix dynamiquement
- [ ] Ajout au panier avec toast confirmation
- [ ] Galerie images avec navigation
- [ ] Avis affichés et soumissibles
- [ ] Produits similaires (même catégorie)

---

#### M5-03 — Panier (store Zustand + CartDrawer)
**Labels :** `ecommerce`, `priority:critical`  
**Description :**
- **Cart store** (Zustand) :
  - `items: CartItem[]` (productId, variantSku, quantity, price)
  - Actions : `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `applyCoupon`
  - Persistance cookies (pour SSR) + localStorage (pour client)
  - Computed : `subtotal`, `itemCount`, `totalWithDiscount`
- **CartDrawer** (Sheet shadcn) :
  - Ouverture depuis l'icône panier du header
  - Liste des articles : image thumb, titre, variante, prix unitaire, quantité (+/-), supprimer
  - Input code promo + bouton appliquer
  - Sous-total + réduction éventuelle
  - Bouton "Commander" → `/checkout`
- **Badge panier** dans le header : compteur d'articles

**Critères d'acceptation :**
- [ ] Ajout/suppression/modification quantité fonctionnels
- [ ] Persistance après refresh (cookies)
- [ ] Code promo validé contre collection Coupons
- [ ] Badge compteur mis à jour en temps réel
- [ ] Drawer responsive

---

#### M5-04 — Recherche produits (Command palette)
**Labels :** `ecommerce`, `ui`, `priority:medium`  
**Description :**
- Bouton recherche dans le header
- Ouvre une Command palette (shadcn Command)
- Recherche instantanée (debounced, 300ms)
- Résultats groupés par catégorie
- Lien direct vers la fiche produit
- Raccourci clavier Cmd+K / Ctrl+K

**Critères d'acceptation :**
- [ ] Recherche fonctionnelle
- [ ] Résultats pertinents
- [ ] Raccourci clavier actif
- [ ] Navigation clavier dans les résultats

---

#### M5-05 — Page catégorie produit
**Labels :** `page`, `ecommerce`, `priority:medium`  
**Description :**
- `/shop/[category]` : même layout que la boutique mais filtré par catégorie
- Hero avec image/titre/description de la catégorie
- Sous-catégories si applicable
- Breadcrumbs

**Critères d'acceptation :**
- [ ] Filtrage correct par catégorie
- [ ] SEO : meta title/description spécifiques
- [ ] Breadcrumbs corrects

---

## M6 — E-commerce — Checkout & Paiement

> Tunnel de commande complet avec Stripe.

### Issues

#### M6-01 — Intégrer Stripe (client + serveur)
**Labels :** `ecommerce`, `payment`, `priority:critical`  
**Description :**
- Installer `stripe` + `@stripe/stripe-js` + `@stripe/react-stripe-js`
- Configurer `lib/stripe/server.ts` (Stripe SDK côté serveur)
- Configurer `lib/stripe/client.ts` (`loadStripe` côté client)
- Server Action : créer un PaymentIntent à partir du panier
- Gérer les statuts : `requires_payment_method`, `requires_action` (3DS), `succeeded`

**Critères d'acceptation :**
- [ ] PaymentIntent créé correctement
- [ ] Montant = total panier + shipping
- [ ] Mode test fonctionnel (clés `sk_test_*`)

---

#### M6-02 — Page checkout (tunnel de commande)
**Labels :** `page`, `ecommerce`, `priority:critical`  
**Description :**
- Layout checkout dédié (header simplifié, pas de footer complet)
- **Step 1 — Identification** :
  - Connexion (email + mot de passe)
  - Création de compte (email + mot de passe + nom)
  - Commande en invité (email uniquement)
- **Step 2 — Adresse** :
  - Livraison (autocomplete si possible)
  - Facturation (toggle "identique à la livraison")
  - Validation Zod en temps réel
- **Step 3 — Expédition** :
  - Appel API Packlink avec adresse + poids/dimensions
  - Affichage des options (transporteur, prix, délai)
  - Sélection obligatoire
- **Step 4 — Paiement** :
  - Stripe Elements (CardElement ou PaymentElement)
  - Apple Pay / Google Pay
  - SEPA (optionnel v2)
- **Step 5 — Récapitulatif** :
  - Articles, adresse, transporteur, total TTC
  - Bouton "Payer X€"
- **Sidebar récapitulatif** (desktop) : résumé panier toujours visible

**Critères d'acceptation :**
- [ ] Tunnel complet navigable (avant/arrière)
- [ ] Validation à chaque étape
- [ ] Stripe Elements rendus correctement
- [ ] Total mis à jour dynamiquement (shipping + coupons)
- [ ] Responsive : sidebar → collapsible sur mobile

---

#### M6-03 — Webhook Stripe + création commande
**Labels :** `ecommerce`, `payment`, `priority:critical`  
**Description :**
- Route `app/api/stripe/webhooks/route.ts`
- Vérification signature webhook (`stripe.webhooks.constructEvent`)
- Events gérés :
  - `payment_intent.succeeded` → créer Order dans Payload, envoyer email confirmation
  - `payment_intent.payment_failed` → logger, notifier
  - `charge.refunded` → mettre à jour Order status
- Idempotence : vérifier que la commande n'existe pas déjà (via paymentIntentId)

**Critères d'acceptation :**
- [ ] Commande créée automatiquement post-paiement
- [ ] Email confirmation envoyé
- [ ] Pas de commande dupliquée
- [ ] Webhook secret vérifié
- [ ] Logging des erreurs

---

#### M6-04 — Page confirmation de commande
**Labels :** `page`, `ecommerce`, `priority:high`  
**Description :**
- `/checkout/success?session_id=xxx`
- Récupération de la commande via paymentIntentId
- Affichage : numéro de commande, récapitulatif, adresse, transporteur, estimation livraison
- CTA : "Voir mes commandes" (si connecté) ou "Continuer les achats"
- Panier vidé

**Critères d'acceptation :**
- [ ] Données commande affichées correctement
- [ ] Panier vidé après confirmation
- [ ] Redirection si accès direct sans session valide

---

#### M6-05 — Sync produits Payload → Stripe
**Labels :** `ecommerce`, `priority:high`  
**Description :**
- Hook Payload `afterChange` sur Products :
  - Si le produit n'a pas de `stripeProductId` → créer produit Stripe + price
  - Si le produit existe → mettre à jour (archive old price, create new)
- Script `sync-stripe.ts` pour sync initial en masse
- Gérer les variantes (un Stripe Price par variante)

**Critères d'acceptation :**
- [ ] Nouveau produit Payload → produit Stripe créé
- [ ] Modification prix → nouveau Stripe Price
- [ ] Script de sync masse fonctionnel

---

## M7 — Intégrations fournisseurs

> Connecter Packlink, Gelato, Lulu, Alibaba.

### Issues

#### M7-01 — Intégration Packlink PRO (expédition)
**Labels :** `integration`, `ecommerce`, `priority:critical`  
**Description :**
- Client API Packlink (`lib/packlink/client.ts`)
- **Calcul tarifs** (`lib/packlink/shipping-rates.ts`) :
  - Input : adresse destinataire, poids, dimensions
  - Output : liste de transporteurs avec prix et délai
  - Appel `POST /shipments/rates`
- **Création expédition** (`lib/packlink/create-shipment.ts`) :
  - Appelé post-paiement (dans le webhook ou un job)
  - Crée l'expédition chez Packlink
  - Récupère tracking number + URL
  - Met à jour la commande Payload
- **Route API** (`app/api/packlink/shipping/route.ts`) :
  - Endpoint pour le front (calcul tarifs dans le checkout)
  - Rate-limited
- Gestion des erreurs API Packlink (retry, fallback)

**Critères d'acceptation :**
- [ ] Tarifs affichés dans le checkout (≥ 3 options)
- [ ] Expédition créée post-paiement
- [ ] Tracking sauvegardé dans la commande
- [ ] Erreurs gérées proprement

---

#### M7-02 — Intégration Gelato (impression print)
**Labels :** `integration`, `ecommerce`, `priority:high`  
**Description :**
- Client API Gelato (`lib/gelato/client.ts`)
- **Catalogue produits** (`lib/gelato/products.ts`) :
  - Récupérer les produits Gelato disponibles
  - Mapper avec les produits Payload (`fulfillmentType: 'gelato'`)
- **Commandes** (`lib/gelato/orders.ts`) :
  - Post-paiement : créer commande Gelato pour les items `fulfillmentType: 'gelato'`
  - Upload des fichiers d'impression (PDF/image haute résolution)
  - Gelato expédie directement au client (drop-shipping)
- Webhook Gelato (si disponible) → mise à jour fulfillment status

**Critères d'acceptation :**
- [ ] Commande Gelato créée automatiquement
- [ ] Fichiers d'impression transmis
- [ ] Statut fulfillment mis à jour
- [ ] Produits Gelato avec prix correct dans le catalogue

---

#### M7-03 — Intégration Lulu Direct (impression livres)
**Labels :** `integration`, `ecommerce`, `priority:high`  
**Description :**
- Client API Lulu (`lib/lulu/client.ts`)
- **Catalogue** (`lib/lulu/products.ts`) :
  - Configurer les formats de livre disponibles (poche, A5, relié, magazine)
  - Prix basé sur nombre de pages + format + reliure
- **Commandes** (`lib/lulu/orders.ts`) :
  - Post-paiement : créer print job Lulu
  - Upload PDF intérieur + couverture
  - Expédition directe ou via FoxCase
- Auth OAuth2 Lulu

**Critères d'acceptation :**
- [ ] Print job créé post-paiement
- [ ] PDFs transmis correctement
- [ ] Prix calculé dynamiquement (pages × format)
- [ ] Auth OAuth2 fonctionnelle

---

#### M7-04 — Intégration Alibaba / AliExpress (signalétique)
**Labels :** `integration`, `ecommerce`, `priority:medium`  
**Description :**
- **V1 — Semi-automatique :**
  - Script `import-alibaba.ts` : importe les produits depuis un fichier CSV/JSON (export fournisseur)
  - Crée les produits Payload avec `fulfillmentType: 'alibaba'`, images, prix
  - Commande manuelle côté fournisseur (notification admin)
- **V2 — Automatique (évolution) :**
  - Client API Alibaba Open Platform
  - Import catalogue automatique
  - Commande automatique via API

**Critères d'acceptation V1 :**
- [ ] Script d'import fonctionnel (CSV → Payload)
- [ ] Produits créés avec images et prix
- [ ] Notification admin à chaque commande contenant des produits Alibaba
- [ ] Dashboard admin : liste des commandes Alibaba à traiter

---

#### M7-05 — Emails transactionnels (Resend + React Email)
**Labels :** `integration`, `priority:high`  
**Description :**
- Installer `resend` + `@react-email/components`
- Templates React :
  - `order-confirmation.tsx` : récapitulatif commande, numéro, adresse, transporteur
  - `shipping-notification.tsx` : numéro de suivi, lien tracking
  - `quote-received.tsx` : confirmation réception devis + délai de réponse
  - `welcome.tsx` : bienvenue après création de compte
- Helper `lib/email/send.ts` : wrapper Resend avec gestion d'erreurs
- Email interne admin : notification nouvelle commande / nouveau devis

**Critères d'acceptation :**
- [ ] 4+ templates créés et testés
- [ ] Emails envoyés aux bons moments (webhook Stripe, soumission devis, inscription)
- [ ] Design cohérent avec la DA (logo, couleurs)
- [ ] Fallback si Resend échoue (log + retry)

---

## M8 — Espace client & Auth

> Authentification client et dashboard personnel.

### Issues

#### M8-01 — Auth client (inscription, connexion, mot de passe oublié)
**Labels :** `auth`, `priority:critical`  
**Description :**
- Utiliser l'auth native Payload (collection Customers avec `auth: true`)
- **Page login** : email + mot de passe, lien "Mot de passe oublié", lien inscription
- **Page register** : email, mot de passe, nom, prénom, type (particulier/pro)
- **Reset password** : email de réinitialisation via Resend
- Middleware : protection des routes `/account/*`
- Session : cookie HTTP-only sécurisé
- Redirection post-login : page précédente ou dashboard

**Critères d'acceptation :**
- [ ] Inscription fonctionnelle → crée Customer + envoie welcome email
- [ ] Connexion fonctionnelle → session créée
- [ ] Reset password fonctionnel
- [ ] Routes `/account/*` protégées
- [ ] Pas de fuite de session (HTTP-only, SameSite=Lax)

---

#### M8-02 — Dashboard client (`/account`)
**Labels :** `page`, `auth`, `priority:high`  
**Description :**
- Vue d'ensemble : dernières commandes (3), raccourcis
- Statistiques : nombre de commandes, montant total dépensé
- Liens rapides : commandes, adresses, paramètres

**Critères d'acceptation :**
- [ ] Données personnalisées chargées
- [ ] Responsive

---

#### M8-03 — Historique commandes (`/account/orders`)
**Labels :** `page`, `auth`, `ecommerce`, `priority:high`  
**Description :**
- Liste des commandes du client (table ou cards)
- Colonnes : numéro, date, statut (badge coloré), total, action "Voir"
- **Détail commande** : récapitulatif complet, statut d'expédition, numéro de suivi, lien tracking
- Pagination

**Critères d'acceptation :**
- [ ] Client ne voit que ses propres commandes
- [ ] Statuts affichés avec badges colorés
- [ ] Lien tracking fonctionnel
- [ ] Pagination

---

#### M8-04 — Carnet d'adresses (`/account/settings`)
**Labels :** `page`, `auth`, `priority:medium`  
**Description :**
- Liste des adresses sauvegardées
- Ajout / Modification / Suppression
- Marquer une adresse par défaut
- Paramètres compte : modifier email, mot de passe, préférences

**Critères d'acceptation :**
- [ ] CRUD adresses fonctionnel
- [ ] Adresse par défaut pré-sélectionnée au checkout
- [ ] Modification email/password fonctionnelle

---

## M9 — SEO, i18n & Contenu

> Optimiser le référencement, finaliser les traductions, produire le contenu.

### Issues

#### M9-01 — Métadonnées dynamiques (toutes les pages)
**Labels :** `seo`, `priority:critical`  
**Description :**
- `generateMetadata()` sur chaque page :
  - Home, Services, Service detail, Shop, Product detail, Blog, Blog post, About, Contact, Quote
- Title, description, Open Graph (title, description, image, url), Twitter Card
- Canonical URLs par locale
- hreflang FR ↔ EN

**Critères d'acceptation :**
- [ ] Chaque page a des meta uniques et pertinentes
- [ ] OG images rendues (statiques ou dynamiques)
- [ ] hreflang correct
- [ ] Canonicals sans doublon

---

#### M9-02 — Données structurées JSON-LD
**Labels :** `seo`, `priority:high`  
**Description :**
- `Organization` (home)
- `WebSite` avec `SearchAction` (home)
- `Service` + `Offer` (pages services)
- `Product` + `Offer` + `AggregateRating` (pages produits)
- `Article` / `BlogPosting` (blog)
- `BreadcrumbList` (toutes pages)
- `ContactPage` (contact)
- Composant `LdJson.tsx` réutilisable

**Critères d'acceptation :**
- [ ] JSON-LD valide (testable avec Google Rich Results Test)
- [ ] Schemas produits avec prix, disponibilité, avis
- [ ] Breadcrumbs structurés

---

#### M9-03 — Sitemap dynamique + robots.txt
**Labels :** `seo`, `priority:high`  
**Description :**
- `app/(frontend)/[locale]/sitemap.ts` : sitemap localisé, inclut services, produits, blog
- `app/robots.ts` : index tout sauf `/admin`, `/api`, `/account`, `/_next`
- Sitemap soumis à Google Search Console

**Critères d'acceptation :**
- [ ] Sitemap contient toutes les URLs publiques
- [ ] Sitemaps FR et EN séparés
- [ ] robots.txt correct
- [ ] Pas de pages 404 dans le sitemap

---

#### M9-04 — Traductions complètes FR + EN
**Labels :** `i18n`, `priority:high`  
**Description :**
- Compléter `messages/fr.json` et `messages/en.json` avec tous les namespaces :
  - Site, Nav, Footer, Home, Services, Shop, Cart, Checkout, Account, Quote, Contact, Blog, Legal, Common (boutons, labels, erreurs)
- Contenu CMS : saisir les traductions EN pour tous les contenus FR (services, produits, pages)
- Vérifier : aucun fallback visible en prod

**Critères d'acceptation :**
- [ ] 0 clés de traduction manquantes
- [ ] 0 fallback langue visible
- [ ] Switcher FR/EN fonctionne sur toutes les pages

---

#### M9-05 — Blog — Pages et contenu initial
**Labels :** `page`, `content`, `priority:medium`  
**Description :**
- Page liste blog (`/blog`) : cards avec image, titre, lead, date, tag
- Page article (`/blog/[slug]`) : rendu Lexical richtext, auteur, date, partage
- Sidebar : articles récents, tags
- Seeder 3+ articles initiaux

**Critères d'acceptation :**
- [ ] Pages blog fonctionnelles
- [ ] Rendu richtext correct
- [ ] Pagination
- [ ] OG images par article

---

## M10 — Tests, Performance & Sécurité

> Fiabiliser l'ensemble avant la mise en production.

### Issues

#### M10-01 — Tests unitaires (Vitest)
**Labels :** `test`, `priority:critical`  
**Description :**
- Tests cart store (Zustand) : add, remove, update, coupon, totals
- Tests validators (Zod) : checkout, quote, contact
- Tests lib/stripe : calcul montants, création session
- Tests lib/packlink : calcul tarifs mock
- Tests utils : formatPrice, cn, date formatting
- Coverage ≥ 70% sur `lib/`

**Critères d'acceptation :**
- [ ] `pnpm test` passe
- [ ] ≥ 30 tests
- [ ] Coverage ≥ 70% sur lib/
- [ ] CI : tests dans la pipeline

---

#### M10-02 — Tests E2E (Playwright)
**Labels :** `test`, `priority:critical`  
**Description :**
- **Parcours vitrine** : Home → Services → Service detail → Devis → Confirmation
- **Parcours e-commerce** : Shop → Produit → Ajouter panier → Checkout → Paiement (Stripe test) → Confirmation
- **Auth** : Inscription → Connexion → Dashboard → Commandes → Déconnexion
- **i18n** : Navigation FR → switch EN → vérifier contenu traduit
- **Mobile** : même parcours sur viewport mobile
- **Accessibilité** : axe-core scan sur 5 pages clés

**Critères d'acceptation :**
- [ ] 5+ suites E2E passent
- [ ] Parcours checkout complet avec Stripe test mode
- [ ] 0 erreur axe-core critique
- [ ] Tests sur viewports mobile + desktop

---

#### M10-03 — Audit de performance
**Labels :** `perf`, `priority:high`  
**Description :**
- Lighthouse CI sur les pages clés (Home, Shop, Product, Checkout)
- Vérifier les budgets CDC §9 :
  - JS ≤ 150 ko, CSS ≤ 25 ko, LCP < 2.5s, INP < 200ms, CLS < 0.05
- Optimisations si nécessaire :
  - Dynamic imports pour Stripe Elements, Product Gallery
  - Lazy loading images sous le fold
  - Prefetch des pages critiques
  - Bundle analysis (identifier les grosses dépendances)

**Critères d'acceptation :**
- [ ] Lighthouse Performance ≥ 85 (mobile) sur toutes les pages clés
- [ ] Budgets respectés
- [ ] Bundle analysis documenté

---

#### M10-04 — Audit de sécurité
**Labels :** `security`, `priority:high`  
**Description :**
- Headers CSP stricts (nonce-based pour scripts, whitelist Stripe/Vercel)
- HSTS configuré
- Rate limiting sur : checkout, contact, quote, auth endpoints
- Vérifier : pas de secrets dans le code, .env.example à jour
- Dependabot activé
- Stripe webhook signature vérifiée
- Input validation Zod sur toutes les routes API
- XSS : pas de `dangerouslySetInnerHTML` non sanitisé
- RGPD : vérifier politique de confidentialité, droit suppression

**Critères d'acceptation :**
- [ ] CSP strict sans erreur console
- [ ] Rate limiting actif et testé
- [ ] 0 secret dans le code source
- [ ] Headers security score A+ (securityheaders.com)

---

#### M10-05 — Tests de charge (optionnel)
**Labels :** `perf`, `priority:low`  
**Description :**
- Test de charge sur les endpoints critiques (checkout, cart API, shipping rates)
- Outil : k6 ou artillery
- Vérifier : pas de dégradation sous 100 requêtes concurrentes

**Critères d'acceptation :**
- [ ] Endpoints répondent en < 500ms sous charge
- [ ] Pas d'erreur 5xx sous charge modérée

---

## M11 — Mise en production

> Déployer et lancer le site.

### Issues

#### M11-01 — Configuration Vercel (production)
**Labels :** `deploy`, `priority:critical`  
**Description :**
- Créer le projet Vercel (région `cdg1` Paris)
- Configurer toutes les variables d'environnement (production)
- Configurer le domaine custom (foxcase.fr ou foxcart.fr)
- SSL automatique
- Preview deployments sur chaque PR
- Speed Insights activé

**Critères d'acceptation :**
- [ ] Site accessible sur le domaine custom
- [ ] SSL fonctionnel
- [ ] Variables d'env configurées
- [ ] Preview deployments actifs

---

#### M11-02 — Configuration Neon (base de données production)
**Labels :** `deploy`, `priority:critical`  
**Description :**
- Créer la base de données Neon production
- Appliquer les migrations
- Seeder les données initiales (services, catégories, settings)
- Configurer le branching par PR (optionnel)

**Critères d'acceptation :**
- [ ] Base production opérationnelle
- [ ] Migrations appliquées
- [ ] Données seed présentes
- [ ] Backup configuré

---

#### M11-03 — Configuration Stripe (production)
**Labels :** `deploy`, `payment`, `priority:critical`  
**Description :**
- Activer le compte Stripe en mode production
- Configurer le webhook production (endpoint URL, events)
- Sync initiale des produits
- Tester un paiement réel (petit montant + remboursement)

**Critères d'acceptation :**
- [ ] Webhook actif et fonctionnel
- [ ] Produits synchronisés
- [ ] Paiement réel testé et remboursé

---

#### M11-04 — Configuration Packlink, Gelato, Lulu (production)
**Labels :** `deploy`, `integration`, `priority:high`  
**Description :**
- Passer les intégrations en mode production (clés API production)
- Tester un flux complet par intégration :
  - Packlink : calcul tarif réel + création expédition test
  - Gelato : commande test impression
  - Lulu : commande test livre
- Vérifier les webhooks

**Critères d'acceptation :**
- [ ] 3 intégrations en mode production
- [ ] Flux testés end-to-end
- [ ] Fallbacks en cas d'indisponibilité API

---

#### M11-05 — Smoke test production
**Labels :** `deploy`, `test`, `priority:critical`  
**Description :**
- Parcours complet sur la prod :
  - Navigation vitrine
  - Recherche produit
  - Ajout panier → checkout → paiement (test card si encore en mode test, sinon petit montant)
  - Demande de devis
  - Formulaire contact
  - Inscription / connexion
  - i18n FR/EN
- Vérifier : emails envoyés, commande créée, tracking

**Critères d'acceptation :**
- [ ] Tous les parcours fonctionnent
- [ ] Emails reçus
- [ ] Commandes visibles dans admin
- [ ] Pas d'erreur console
- [ ] Performance acceptable (LCP < 2.5s)

---

#### M11-06 — Documentation technique
**Labels :** `docs`, `priority:medium`  
**Description :**
- `README.md` : setup local, structure, scripts
- Variables d'environnement documentées (.env.example commenté)
- Procédure de déploiement
- Procédure de migration DB
- Guide admin CMS (ajout produit, service, article)

**Critères d'acceptation :**
- [ ] Un nouveau développeur peut lancer le projet en < 15 min
- [ ] Procédures de déploiement claires
- [ ] Guide admin utilisable par un non-dev

---

## Résumé — Toutes les issues

| ID | Issue | Milestone | Priority |
|---|---|---|---|
| M1-01 | Init Next.js 15 + TypeScript strict | M1 Setup | Critical |
| M1-02 | Payload CMS v3 embarqué | M1 Setup | Critical |
| M1-03 | Tailwind CSS v4 + tokens | M1 Setup | Critical |
| M1-04 | shadcn/ui + thème custom | M1 Setup | High |
| M1-05 | Biome lint + format | M1 Setup | High |
| M1-06 | next-intl v4 (i18n) | M1 Setup | High |
| M1-07 | CI GitHub Actions | M1 Setup | Medium |
| M1-08 | Docker (dev local complet) | M1 Setup | Critical |
| M1-09 | Polices Geist | M1 Setup | Medium |
| M2-01 | Composants glassmorphism | M2 Design System | Critical |
| M2-02 | Layout (Header, Footer, Container) | M2 Design System | Critical |
| M2-03 | Composants visuels (Reveal, Marquee) | M2 Design System | High |
| M2-04 | Motion (animations) | M2 Design System | Medium |
| M2-05 | Lenis (smooth scroll) | M2 Design System | Medium |
| M2-06 | ThemeProvider dark/light | M2 Design System | Medium |
| M3-01 | Page Home | M3 Vitrine | Critical |
| M3-02 | Page Services catalogue | M3 Vitrine | Critical |
| M3-03 | Page Service détail + pricing | M3 Vitrine | Critical |
| M3-04 | Page À propos | M3 Vitrine | High |
| M3-05 | Page Contact | M3 Vitrine | High |
| M3-06 | Page Demande de devis | M3 Vitrine | High |
| M3-07 | Pages légales (CGV, mentions, etc.) | M3 Vitrine | High |
| M3-08 | Page Lab (lien FoxStudio) | M3 Vitrine | Low |
| M4-01 | Collections Services | M4 CMS | Critical |
| M4-02 | Collections Products | M4 CMS | Critical |
| M4-03 | Collections Orders, Customers, Coupons | M4 CMS | Critical |
| M4-04 | Collections Quotes, Reviews, etc. | M4 CMS | High |
| M4-05 | Globals Settings, Navigation, Shop | M4 CMS | High |
| M4-06 | Script de seed | M4 CMS | High |
| M4-07 | Hooks revalidation ISR | M4 CMS | Medium |
| M5-01 | Page boutique (catalogue) | M5 E-commerce Catalogue | Critical |
| M5-02 | Page produit détail | M5 E-commerce Catalogue | Critical |
| M5-03 | Panier (Zustand + CartDrawer) | M5 E-commerce Catalogue | Critical |
| M5-04 | Recherche produits (Command) | M5 E-commerce Catalogue | Medium |
| M5-05 | Page catégorie produit | M5 E-commerce Catalogue | Medium |
| M6-01 | Intégration Stripe | M6 Checkout | Critical |
| M6-02 | Page checkout (tunnel) | M6 Checkout | Critical |
| M6-03 | Webhook Stripe + création commande | M6 Checkout | Critical |
| M6-04 | Page confirmation commande | M6 Checkout | High |
| M6-05 | Sync produits Payload → Stripe | M6 Checkout | High |
| M7-01 | Intégration Packlink (expédition) | M7 Intégrations | Critical |
| M7-02 | Intégration Gelato (impression) | M7 Intégrations | High |
| M7-03 | Intégration Lulu Direct (livres) | M7 Intégrations | High |
| M7-04 | Intégration Alibaba (signalétique) | M7 Intégrations | Medium |
| M7-05 | Emails transactionnels (Resend) | M7 Intégrations | High |
| M8-01 | Auth client (Payload) | M8 Auth | Critical |
| M8-02 | Dashboard client | M8 Auth | High |
| M8-03 | Historique commandes | M8 Auth | High |
| M8-04 | Carnet d'adresses + paramètres | M8 Auth | Medium |
| M9-01 | Métadonnées dynamiques SEO | M9 SEO & i18n | Critical |
| M9-02 | JSON-LD données structurées | M9 SEO & i18n | High |
| M9-03 | Sitemap + robots.txt | M9 SEO & i18n | High |
| M9-04 | Traductions complètes FR + EN | M9 SEO & i18n | High |
| M9-05 | Blog pages + contenu | M9 SEO & i18n | Medium |
| M10-01 | Tests unitaires (Vitest) | M10 Tests & Perf | Critical |
| M10-02 | Tests E2E (Playwright) | M10 Tests & Perf | Critical |
| M10-03 | Audit de performance | M10 Tests & Perf | High |
| M10-04 | Audit de sécurité | M10 Tests & Perf | High |
| M10-05 | Tests de charge | M10 Tests & Perf | Low |
| M11-01 | Config Vercel production | M11 Production | Critical |
| M11-02 | Config Neon production | M11 Production | Critical |
| M11-03 | Config Stripe production | M11 Production | Critical |
| M11-04 | Config Packlink/Gelato/Lulu | M11 Production | High |
| M11-05 | Smoke test production | M11 Production | Critical |
| M11-06 | Documentation technique | M11 Production | Medium |

**Total : 56 issues réparties sur 11 milestones.**

---

*Document maintenu par FoxCase. Toute modification doit être versionnée (Git) et datée.*
