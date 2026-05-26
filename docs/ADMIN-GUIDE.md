# Guide Admin CMS — FoxCart

Acces : `https://foxcase.fr/admin`

---

## Connexion

- Email : `admin@foxcase.fr`
- Mot de passe : celui defini au seed (changer en production)

---

## Ajouter un produit

1. Admin > Products > Create New
2. Remplir :
   - **Name** : nom du produit (FR + EN)
   - **Slug** : URL-friendly (ex: `cartes-visite-500`)
   - **Short Description** : 1 ligne (FR + EN)
   - **Category** : selectionner (Signaletique, Print, Edition, Packaging)
   - **Images** : uploader au moins 1 image
   - **Base Price** : prix en centimes (ex: 2500 = 25,00 EUR)
   - **Tax Rate** : 20 (%)
   - **Fulfillment Type** : `gelato`, `lulu`, `alibaba` ou `internal`
   - **Weight** : poids en grammes
   - **Dimensions** : longueur, largeur, hauteur en cm
3. Status : Published
4. Save

## Ajouter un service

1. Admin > Services > Create New
2. Remplir :
   - **Name**, **Tagline**, **Description** (FR + EN)
   - **Icon** : nom Lucide (ex: `Code2`)
   - **Category** : selectionner
   - **Pricing Type** : fixed, from, quote, hourly
   - **Pricing** : ajouter les tiers (Essentiel, Pro, Enterprise)
   - **Process** : etapes de realisation
3. Status : Published
4. Save

## Publier un article de blog

1. Admin > Blog Posts > Create New
2. Remplir : Title, Slug, Lead, Body (editeur Lexical), Author, Tags
3. Status : Published
4. Save

## Gerer les commandes

1. Admin > Orders
2. Colonnes : numero, client, statut, total, date
3. Cliquer sur une commande pour voir le detail
4. Modifier le statut : pending > confirmed > processing > shipped > delivered
5. Ajouter le tracking number et URL (depuis Packlink)

## Gerer les demandes de devis

1. Admin > Quotes
2. Statuts : new > contacted > quoted > accepted / rejected
3. Ajouter une note interne et le montant propose

## Modifier les globals

- **Settings** : SEO, contact, reseaux sociaux, lien Lab
- **Navigation** : liens header et footer
- **Shop Settings** : devise, taux TVA, seuil livraison gratuite
