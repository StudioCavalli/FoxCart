import config from "@/payload.config";
import { getPayload } from "payload";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Seed disabled in production" }, { status: 403 });
  }

  const payload = await getPayload({ config });
  const log: string[] = [];

  // ── Admin user
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
    log.push("Admin user created");
  }

  // ── Test customer
  const existingCustomer = await payload.find({
    collection: "customers",
    where: { email: { equals: "test@foxcase.fr" } },
  });
  if (existingCustomer.totalDocs === 0) {
    await payload.create({
      collection: "customers",
      data: {
        email: "test@foxcase.fr",
        password: "test2026",
        firstName: "Jean",
        lastName: "Dupont",
        type: "individual",
      },
    });
    log.push("Test customer created (test@foxcase.fr / test2026)");
  }

  // ── Service categories
  const serviceCategories = [
    { name: "Strategie", slug: "strategie", icon: "BarChart3", order: 1 },
    { name: "Digital", slug: "digital", icon: "Code2", order: 2 },
    { name: "Communication", slug: "communication", icon: "Megaphone", order: 3 },
    { name: "Gestion", slug: "gestion", icon: "Settings", order: 4 },
    { name: "Formation", slug: "formation", icon: "GraduationCap", order: 5 },
    { name: "Support", slug: "support", icon: "Wrench", order: 6 },
  ];
  for (const cat of serviceCategories) {
    const ex = await payload.find({
      collection: "service-categories",
      where: { slug: { equals: cat.slug } },
    });
    if (ex.totalDocs === 0) {
      await payload.create({ collection: "service-categories", data: cat });
      log.push(`ServiceCat: ${cat.name}`);
    }
  }

  // ── Services
  const svcCatMap: Record<string, number | string> = {};
  const allSvcCats = await payload.find({ collection: "service-categories", limit: 50 });
  for (const c of allSvcCats.docs) svcCatMap[c.slug] = c.id;

  const servicesList = [
    { slug: "business-plan", name: "Business Plan", tagline: "Structurez votre projet", icon: "BarChart3", category: "strategie", pricingType: "fixed" as const },
    { slug: "business-model", name: "Business Model Canvas", tagline: "Définissez votre modèle économique", icon: "BarChart3", category: "strategie", pricingType: "fixed" as const },
    { slug: "etude-de-marche", name: "Étude de marché", tagline: "Analysez votre marché et la concurrence", icon: "BarChart3", category: "strategie", pricingType: "fixed" as const },
    { slug: "site-vitrine", name: "Site vitrine", tagline: "Un site web professionnel", icon: "Code2", category: "digital", pricingType: "from" as const },
    { slug: "site-ecommerce", name: "Site e-commerce", tagline: "Vendez en ligne", icon: "Code2", category: "digital", pricingType: "from" as const },
    { slug: "application-mobile", name: "Application mobile", tagline: "Apps iOS et Android", icon: "Code2", category: "digital", pricingType: "quote" as const },
    { slug: "application-saas", name: "Application SaaS", tagline: "Plateformes web sur mesure", icon: "Code2", category: "digital", pricingType: "quote" as const },
    { slug: "identite-visuelle", name: "Identité visuelle", tagline: "Logo, charte graphique, univers de marque", icon: "Megaphone", category: "communication", pricingType: "from" as const },
    { slug: "community-management", name: "Community management", tagline: "Gestion de vos réseaux sociaux", icon: "Megaphone", category: "communication", pricingType: "from" as const },
    { slug: "strategie-com", name: "Stratégie de communication", tagline: "Plan de communication global", icon: "Megaphone", category: "communication", pricingType: "from" as const },
    { slug: "erp-crm", name: "ERP/CRM sur mesure", tagline: "Outils de gestion internes", icon: "Settings", category: "gestion", pricingType: "quote" as const },
    { slug: "chefferie-projet", name: "Chefferie de projet", tagline: "Pilotage de vos projets digitaux", icon: "Settings", category: "gestion", pricingType: "hourly" as const },
    { slug: "consulting", name: "Consulting digital", tagline: "Audit, conseil et accompagnement", icon: "Settings", category: "gestion", pricingType: "hourly" as const },
    { slug: "formation-dev", name: "Formation développement", tagline: "Formations techniques pour écoles et entreprises", icon: "GraduationCap", category: "formation", pricingType: "hourly" as const },
    { slug: "formation-outils", name: "Formation outils digitaux", tagline: "Maîtrisez les outils essentiels", icon: "GraduationCap", category: "formation", pricingType: "hourly" as const },
    { slug: "maintenance", name: "Maintenance", tagline: "Maintenance corrective et évolutive", icon: "Wrench", category: "support", pricingType: "from" as const },
    { slug: "hebergement", name: "Hébergement", tagline: "Haute disponibilité, sécurisé et monitoré", icon: "Wrench", category: "support", pricingType: "from" as const },
    { slug: "support-technique", name: "Support technique", tagline: "Assistance réactive", icon: "Wrench", category: "support", pricingType: "from" as const },
  ];

  for (const svc of servicesList) {
    const ex = await payload.find({ collection: "services", where: { slug: { equals: svc.slug } } });
    if (ex.totalDocs === 0) {
      const catId = svcCatMap[svc.category];
      if (!catId) continue;
      await payload.create({
        collection: "services",
        data: {
          name: svc.name,
          slug: svc.slug,
          tagline: svc.tagline,
          icon: svc.icon,
          category: catId,
          pricingType: svc.pricingType,
          featured: false,
          order: 0,
          _status: "published",
        },
      });
      log.push(`Service: ${svc.name}`);
    }
  }

  // ── Product categories
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
    const ex = await payload.find({
      collection: "product-categories",
      where: { slug: { equals: cat.slug } },
    });
    if (ex.totalDocs === 0) {
      await payload.create({ collection: "product-categories", data: cat });
      log.push(`ProductCat: ${cat.name}`);
    }
  }

  // ── Marketing Digital category
  const existingMktg = await payload.find({
    collection: "product-categories",
    where: { slug: { equals: "marketing-digital" } },
  });
  if (existingMktg.totalDocs === 0) {
    await payload.create({
      collection: "product-categories",
      data: {
        name: "Marketing Digital",
        slug: "marketing-digital",
        description: "Packs mensuels de marketing digital",
        order: 5,
      },
    });
    log.push("ProductCat: Marketing Digital");
  }

  // ── Products
  const catMap: Record<string, number | string> = {};
  const allCats = await payload.find({ collection: "product-categories", limit: 50 });
  for (const c of allCats.docs) catMap[c.slug] = c.id;

  const products = [
    {
      slug: "kakemono-85x200",
      name: "Kakemono 85x200 cm",
      shortDescription: "Roll-up retractable, impression HD, structure aluminium.",
      category: "signaletique",
      basePrice: 8900,
      fulfillmentType: "alibaba" as const,
      featured: true,
      weight: 3500,
      dimensions: { length: 90, width: 10, height: 10 },
    },
    {
      slug: "kakemono-100x200",
      name: "Kakemono 100x200 cm",
      shortDescription: "Grand format, ideal salons et evenements.",
      category: "signaletique",
      basePrice: 11900,
      fulfillmentType: "alibaba" as const,
      featured: false,
      weight: 4200,
      dimensions: { length: 105, width: 10, height: 10 },
    },
    {
      slug: "x-banner-60x160",
      name: "X-Banner 60x160 cm",
      shortDescription: "Support X-Banner leger et economique.",
      category: "signaletique",
      basePrice: 4900,
      fulfillmentType: "alibaba" as const,
      featured: false,
      weight: 1500,
      dimensions: { length: 65, width: 8, height: 8 },
    },
    {
      slug: "totem-carton-180",
      name: "Totem carton 180 cm",
      shortDescription: "PLV carton rigide, impression recto/verso.",
      category: "signaletique",
      basePrice: 12900,
      fulfillmentType: "alibaba" as const,
      featured: false,
      weight: 5000,
      dimensions: { length: 50, width: 50, height: 185 },
    },
    {
      slug: "drapeau-voile-3m",
      name: "Drapeau voile 3 m",
      shortDescription: "Voile publicitaire avec mat telescopique.",
      category: "signaletique",
      basePrice: 15900,
      fulfillmentType: "alibaba" as const,
      featured: true,
      weight: 3000,
      dimensions: { length: 15, width: 15, height: 310 },
    },
    {
      slug: "cartes-visite-250",
      name: "Cartes de visite x250",
      shortDescription: "350g couche, recto/verso, quadri.",
      category: "print",
      basePrice: 2500,
      fulfillmentType: "gelato" as const,
      featured: true,
      weight: 200,
      dimensions: { length: 9, width: 5, height: 2 },
    },
    {
      slug: "cartes-visite-500",
      name: "Cartes de visite x500",
      shortDescription: "350g couche, recto/verso, quadri.",
      category: "print",
      basePrice: 4000,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 400,
      dimensions: { length: 9, width: 5, height: 4 },
    },
    {
      slug: "flyers-a5-250",
      name: "Flyers A5 x250",
      shortDescription: "Impression quadri recto/verso, 135g.",
      category: "print",
      basePrice: 3500,
      fulfillmentType: "gelato" as const,
      featured: true,
      weight: 500,
      dimensions: { length: 22, width: 15, height: 3 },
    },
    {
      slug: "flyers-a5-500",
      name: "Flyers A5 x500",
      shortDescription: "Impression quadri recto/verso, 135g.",
      category: "print",
      basePrice: 5500,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 1000,
      dimensions: { length: 22, width: 15, height: 5 },
    },
    {
      slug: "flyers-dl-250",
      name: "Flyers DL x250",
      shortDescription: "Format DL (10x21 cm), ideal mailing.",
      category: "print",
      basePrice: 2900,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 350,
      dimensions: { length: 22, width: 11, height: 3 },
    },
    {
      slug: "affiche-a3",
      name: "Affiche A3",
      shortDescription: "Impression HD, papier 170g couche.",
      category: "print",
      basePrice: 1500,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 50,
      dimensions: { length: 42, width: 30, height: 1 },
    },
    {
      slug: "affiche-a2",
      name: "Affiche A2",
      shortDescription: "Grand format, papier 170g couche.",
      category: "print",
      basePrice: 2500,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 80,
      dimensions: { length: 60, width: 42, height: 1 },
    },
    {
      slug: "brochure-a5-12p",
      name: "Brochure A5 12 pages",
      shortDescription: "Agrafee, couverture 350g, interieur 135g.",
      category: "print",
      basePrice: 8500,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 60,
      dimensions: { length: 22, width: 15, height: 1 },
    },
    {
      slug: "stickers-rond-5cm-100",
      name: "Stickers ronds 5cm x100",
      shortDescription: "Vinyle adhesif, resistant eau et UV.",
      category: "print",
      basePrice: 1900,
      fulfillmentType: "gelato" as const,
      featured: false,
      weight: 100,
      dimensions: { length: 10, width: 10, height: 2 },
    },
    {
      slug: "livre-broche-a5-100p",
      name: "Livre broche A5 100 pages",
      shortDescription: "Dos carre colle, couverture souple 300g.",
      category: "edition",
      basePrice: 1600,
      fulfillmentType: "lulu" as const,
      featured: true,
      weight: 250,
      dimensions: { length: 22, width: 15, height: 1 },
    },
    {
      slug: "livre-relie-a5-100p",
      name: "Livre relie A5 100 pages",
      shortDescription: "Couverture rigide, finition premium.",
      category: "edition",
      basePrice: 3500,
      fulfillmentType: "lulu" as const,
      featured: false,
      weight: 400,
      dimensions: { length: 22, width: 15, height: 2 },
    },
    {
      slug: "magazine-a4-24p",
      name: "Magazine A4 24 pages",
      shortDescription: "Agrafe, couverture 250g brillante.",
      category: "edition",
      basePrice: 950,
      fulfillmentType: "lulu" as const,
      featured: false,
      weight: 150,
      dimensions: { length: 30, width: 21, height: 1 },
    },
    {
      slug: "magazine-a4-48p",
      name: "Magazine A4 48 pages",
      shortDescription: "Agrafe, couverture 250g, interieur 135g.",
      category: "edition",
      basePrice: 1550,
      fulfillmentType: "lulu" as const,
      featured: false,
      weight: 280,
      dimensions: { length: 30, width: 21, height: 1 },
    },
    {
      slug: "catalogue-a4-40p",
      name: "Catalogue A4 40 pages",
      shortDescription: "Dos carre colle, couverture pelliculee.",
      category: "edition",
      basePrice: 15000,
      fulfillmentType: "lulu" as const,
      featured: false,
      weight: 350,
      dimensions: { length: 30, width: 21, height: 1 },
    },
    {
      slug: "marketing-starter",
      name: "Pack Starter",
      shortDescription: "4 posts réseaux/mois, 1 visuel, rapport mensuel.",
      category: "marketing-digital",
      basePrice: 2990,
      fulfillmentType: "internal" as const,
      featured: true,
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      isSubscription: true,
    },
    {
      slug: "marketing-business",
      name: "Pack Business",
      shortDescription: "12 posts/mois, 4 visuels, 1 vidéo, community management, rapport.",
      category: "marketing-digital",
      basePrice: 7990,
      fulfillmentType: "internal" as const,
      featured: true,
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      isSubscription: true,
    },
    {
      slug: "marketing-premium",
      name: "Pack Premium",
      shortDescription: "Posts illimités, 8 visuels, 3 vidéos, CM complet, newsletter, media kit.",
      category: "marketing-digital",
      basePrice: 14990,
      fulfillmentType: "internal" as const,
      featured: true,
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      isSubscription: true,
    },
    {
      slug: "marketing-enterprise",
      name: "Pack Enterprise",
      shortDescription: "Tout Premium + stratégie, ads, SEO, A/B testing, dashboard analytics.",
      category: "marketing-digital",
      basePrice: 29990,
      fulfillmentType: "internal" as const,
      featured: false,
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      isSubscription: true,
    },
  ];

  for (const p of products) {
    const ex = await payload.find({ collection: "products", where: { slug: { equals: p.slug } } });
    if (ex.totalDocs === 0) {
      const catId = catMap[p.category];
      if (!catId) continue;
      await payload.create({
        collection: "products",
        data: {
          name: p.name,
          slug: p.slug,
          shortDescription: p.shortDescription,
          category: catId,
          basePrice: p.basePrice,
          taxRate: 20,
          fulfillmentType: p.fulfillmentType,
          featured: p.featured,
          weight: p.weight,
          dimensions: p.dimensions,
          hasVariants: false,
          isSubscription: (p as { isSubscription?: boolean }).isSubscription ?? false,
          subscriptionInterval: (p as { isSubscription?: boolean }).isSubscription
            ? "monthly"
            : undefined,
          publishedAt: new Date().toISOString(),
          _status: "published",
        },
      });
      log.push(`Product: ${p.name}`);
    }
  }

  // ── Testimonials
  const testimonials = [
    {
      name: "Marie Dupont",
      company: "TechStart",
      role: "CEO",
      quote: "FoxCase a transforme notre vision en un produit digital concret.",
      featured: true,
      order: 1,
    },
    {
      name: "Thomas Bernard",
      company: "GreenCorp",
      role: "Directeur Marketing",
      quote: "L'equipe a su comprendre nos enjeux et livrer un site qui depasse nos attentes.",
      featured: true,
      order: 2,
    },
    {
      name: "Sophie Laurent",
      company: "Artisan Digital",
      role: "Fondatrice",
      quote: "Accompagnement complet, de l'identite visuelle au deploiement e-commerce.",
      featured: true,
      order: 3,
    },
  ];
  for (const t of testimonials) {
    const ex = await payload.find({
      collection: "testimonials",
      where: { name: { equals: t.name } },
    });
    if (ex.totalDocs === 0) {
      await payload.create({ collection: "testimonials", data: t });
      log.push(`Testimonial: ${t.name}`);
    }
  }

  // ── Globals
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
  log.push("Global: Settings");

  await payload.updateGlobal({
    slug: "shop-settings",
    data: {
      currency: "EUR",
      defaultTaxRate: 20,
      freeShippingThreshold: 10000,
      cartMessage: "Livraison gratuite des 100 EUR d'achat",
    },
  });
  log.push("Global: ShopSettings");

  return Response.json({ ok: true, log });
}
