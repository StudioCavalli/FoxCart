# Deployment Guide — FoxCart

## Prerequisites

- Vercel account
- Neon account (PostgreSQL)
- Stripe account (live mode activated)
- Packlink PRO account
- Gelato account
- Lulu Direct account
- Resend account
- Domain: foxcase.fr (or foxcart.fr)

---

## 1. Neon — Base de donnees

1. Creer un projet Neon (region `eu-central-1`)
2. Creer une database `foxcart`
3. Copier la connection string (`DATABASE_URL`)
4. Activer Point-in-Time Recovery (PITR)

## 2. Vercel — Deploiement

1. Importer le repo `StudioCavalli/FoxCart` sur Vercel
2. Framework preset: **Next.js**
3. Region: **cdg1** (Paris)
4. Configurer les variables d'environnement :

```
DATABASE_URL=postgresql://...@ep-xxx.eu-central-1.aws.neon.tech/foxcart?sslmode=require
PAYLOAD_SECRET=<openssl rand -hex 32>
NEXT_PUBLIC_SITE_URL=https://foxcase.fr
NEXT_PUBLIC_SITE_NAME=FoxCart

STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

PACKLINK_API_KEY=xxx
GELATO_API_KEY=xxx
LULU_API_KEY=xxx
LULU_API_SECRET=xxx

RESEND_API_KEY=re_xxx

BLOB_READ_WRITE_TOKEN=vercel_blob_xxx
```

5. Deployer
6. Configurer le domaine custom (foxcase.fr)
7. Activer Speed Insights

## 3. Stripe — Paiement

1. Activer le mode live (verification identite)
2. Creer le webhook :
   - Endpoint: `https://foxcase.fr/api/stripe/webhooks`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
3. Copier le webhook secret dans `STRIPE_WEBHOOK_SECRET`
4. Sync initiale des produits : `POST https://foxcase.fr/api/seed`

## 4. Packlink PRO

1. Creer un compte Packlink PRO
2. Configurer l'adresse d'expedition (45 Bd de la Croisette, 06400 Cannes)
3. Copier l'API key dans `PACKLINK_API_KEY`

## 5. Gelato

1. Creer un compte Gelato
2. Copier l'API key dans `GELATO_API_KEY`

## 6. Lulu Direct

1. Creer un compte Lulu Direct
2. Creer une application OAuth2 (client credentials)
3. Copier client_id et client_secret dans `LULU_API_KEY` et `LULU_API_SECRET`

## 7. Resend

1. Creer un compte Resend
2. Verifier le domaine foxcase.fr
3. Copier l'API key dans `RESEND_API_KEY`

## 8. Seed production

```bash
curl -X POST https://foxcase.fr/api/seed
```

Cree : admin user, categories, produits, temoignages, globals.

## 9. Smoke test

- [ ] `/fr` — Home charge correctement
- [ ] `/fr/shop` — Produits affiches depuis la BDD
- [ ] `/fr/account/login` — Connexion avec test@foxcase.fr
- [ ] `/fr/shop/print/cartes-visite-250` — Fiche produit, ajout panier
- [ ] Panier — Modifier quantite, supprimer
- [ ] Checkout — Tunnel complet (email, adresse, transporteur, paiement)
- [ ] `/admin` — Payload CMS accessible
- [ ] Emails — Verification Mailpit ou Resend logs
- [ ] Switch FR/EN — Traductions completes
- [ ] Mobile — Navigation responsive

---

## Rollback

Vercel deploie automatiquement sur chaque push `main`. Pour rollback :
1. Aller dans Vercel > Deployments
2. Cliquer sur le deployment precedent
3. "Promote to Production"

## Migrations DB

```bash
# Payload gere les migrations automatiquement au demarrage
# Pour forcer : acceder a /admin une fois apres deploiement
```
