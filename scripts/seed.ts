/* eslint-disable no-console */

/**
 * Seed script — idempotent
 * Run: pnpm payload:seed (or docker compose exec app pnpm payload:seed)
 */

import { getPayload } from "payload";
import config from "../payload.config";

async function seed() {
  const payload = await getPayload({ config });

  console.log("Seeding FoxCart...");

  // ── Admin user ──────────────────────────────────────────────────────────

  const existingAdmin = await payload.find({
    collection: "users",
    where: { email: { equals: "admin@foxcase.fr" } },
  });
  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@foxcase.fr",
        password: "foxcase2026",
        role: "admin",
        firstName: "Christopher",
        lastName: "Cavalli",
      },
    });
    console.log("  + Admin user created");
  }

  // ── Service categories ──────────────────────────────────────────────────

  const serviceCategories = [
    { name: "Strategie", slug: "strategie", icon: "BarChart3", order: 1 },
    { name: "Digital", slug: "digital", icon: "Code2", order: 2 },
    { name: "Communication", slug: "communication", icon: "Megaphone", order: 3 },
    { name: "Gestion", slug: "gestion", icon: "Settings", order: 4 },
    { name: "Formation", slug: "formation", icon: "GraduationCap", order: 5 },
    { name: "Support", slug: "support", icon: "Wrench", order: 6 },
  ];

  for (const cat of serviceCategories) {
    const existing = await payload.find({
      collection: "service-categories",
      where: { slug: { equals: cat.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({ collection: "service-categories", data: cat });
      console.log(`  + Service category: ${cat.name}`);
    }
  }

  // ── Product categories ──────────────────────────────────────────────────

  const productCategories = [
    {
      name: "Signaletique",
      slug: "signaletique",
      description: "Kakemonos, roll-ups, X-banners, totems",
      order: 1,
    },
    {
      name: "Print",
      slug: "print",
      description: "Cartes de visite, flyers, affiches, brochures",
      order: 2,
    },
    { name: "Edition", slug: "edition", description: "Livres, magazines, catalogues", order: 3 },
    {
      name: "Packaging",
      slug: "packaging",
      description: "Boites, sacs, emballages personnalises",
      order: 4,
    },
  ];

  for (const cat of productCategories) {
    const existing = await payload.find({
      collection: "product-categories",
      where: { slug: { equals: cat.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({ collection: "product-categories", data: cat });
      console.log(`  + Product category: ${cat.name}`);
    }
  }

  // ── Testimonials ────────────────────────────────────────────────────────

  const testimonials = [
    {
      name: "Marie Dupont",
      company: "TechStart",
      role: "CEO",
      quote:
        "FoxCase a transforme notre vision en un produit digital concret. Leur approche structuree et leur expertise technique ont fait toute la difference.",
      featured: true,
      order: 1,
    },
    {
      name: "Thomas Bernard",
      company: "GreenCorp",
      role: "Directeur Marketing",
      quote:
        "De la strategie a la realisation, l'equipe a su comprendre nos enjeux et livrer un site qui depasse nos attentes en termes de performance.",
      featured: true,
      order: 2,
    },
    {
      name: "Sophie Laurent",
      company: "Artisan Digital",
      role: "Fondatrice",
      quote:
        "Un accompagnement complet, de la creation de notre identite visuelle jusqu'au deploiement de notre e-commerce. Professionnalisme exemplaire.",
      featured: true,
      order: 3,
    },
    {
      name: "Jean-Pierre Martin",
      company: "Riviera Events",
      role: "Gerant",
      quote:
        "Nos kakemonos et supports de communication sont impeccables. La qualite d'impression et les delais ont ete parfaitement respectes.",
      featured: false,
      order: 4,
    },
    {
      name: "Camille Roux",
      company: "EduTech",
      role: "Directrice pedagogique",
      quote:
        "Les formations dispensees par FoxCase ont permis a nos equipes de monter en competence rapidement sur les outils digitaux.",
      featured: false,
      order: 5,
    },
  ];

  for (const t of testimonials) {
    const existing = await payload.find({
      collection: "testimonials",
      where: { name: { equals: t.name } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({ collection: "testimonials", data: t });
      console.log(`  + Testimonial: ${t.name}`);
    }
  }

  // ── Blog posts ──────────────────────────────────────────────────────────

  const posts = [
    {
      title: "Pourquoi choisir Next.js pour votre site en 2026",
      slug: "pourquoi-nextjs-2026",
      lead: "Next.js s'impose comme le framework de reference pour les sites web modernes. Voici pourquoi.",
      author: "Christopher Cavalli",
      tags: [{ tag: "tech" }, { tag: "web" }],
      readingTimeMinutes: 5,
      publishedAt: "2026-05-01T10:00:00Z",
    },
    {
      title: "E-commerce : les cles d'une boutique qui convertit",
      slug: "ecommerce-boutique-qui-convertit",
      lead: "UX, performance, confiance — les trois piliers d'un e-commerce rentable.",
      author: "Christopher Cavalli",
      tags: [{ tag: "ecommerce" }, { tag: "strategie" }],
      readingTimeMinutes: 7,
      publishedAt: "2026-04-15T10:00:00Z",
    },
    {
      title: "Identite visuelle : bien plus qu'un logo",
      slug: "identite-visuelle-plus-quun-logo",
      lead: "Votre identite visuelle raconte qui vous etes. Comment la construire avec intention.",
      author: "Christopher Cavalli",
      tags: [{ tag: "design" }, { tag: "branding" }],
      readingTimeMinutes: 4,
      publishedAt: "2026-03-20T10:00:00Z",
    },
  ];

  for (const p of posts) {
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: p.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({ collection: "blog-posts", data: { ...p, _status: "published" } });
      console.log(`  + Blog post: ${p.title}`);
    }
  }

  // ── Globals ─────────────────────────────────────────────────────────────

  await payload.updateGlobal({
    slug: "settings",
    data: {
      seo: {
        title: "FoxCase — Agence digitale",
        description:
          "FoxCase accompagne les professionnels et particuliers dans leurs projets digitaux.",
      },
      contact: {
        email: "contact@foxcase.fr",
        address: "45 Boulevard de la Croisette, 06400 Cannes, France",
      },
      labUrl: "https://studio.foxcase.fr",
    },
  });
  console.log("  + Global: Settings");

  await payload.updateGlobal({
    slug: "shop-settings",
    data: {
      currency: "EUR",
      defaultTaxRate: 20,
      freeShippingThreshold: 10000,
      cartMessage: "Livraison gratuite des 100 EUR d'achat",
    },
  });
  console.log("  + Global: ShopSettings");

  console.log("\nSeed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
