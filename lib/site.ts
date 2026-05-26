export const SITE = {
  name: "FoxCase",
  legalName: "MONSIEUR CHRISTOPHER CAVALLI",
  tradeName: "FoxCase",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  labUrl: "https://studio.foxcase.fr",
  email: "contact@foxcase.fr",
  address: {
    street: "45 Boulevard de la Croisette",
    city: "Cannes",
    postalCode: "06400",
    country: "France",
    full: "45 Boulevard de la Croisette, 06400 Cannes, France",
    lat: 43.5507,
    lng: 7.0128,
  },
  legal: {
    siren: "834 802 407",
    siret: "834 802 407 00033",
    tva: "FR26834802407",
    naf: "6201Z",
    form: "Entrepreneur individuel",
    convention: "SYNTEC (1486)",
    director: "Christopher Cavalli",
    created: "07 novembre 2025",
  },
} as const;

export const NAV = {
  header: [
    { href: "/services", labelKey: "Nav.services" },
    { href: "/shop", labelKey: "Nav.shop" },
    { href: "/about", labelKey: "Nav.about" },
    { href: "/blog", labelKey: "Nav.blog" },
    { href: "/contact", labelKey: "Nav.contact" },
  ],
  footer: {
    services: [
      { href: "/services", labelKey: "Footer.services" },
      { href: "/shop", labelKey: "Footer.shop" },
      { href: "/quote", labelKey: "Nav.quote" },
    ],
    company: [
      { href: "/about", labelKey: "Footer.about" },
      { href: "/blog", labelKey: "Footer.blog" },
      { href: "/contact", labelKey: "Footer.contact" },
      { href: "/lab", labelKey: "Footer.lab" },
    ],
    legal: [
      { href: "/legal/mentions", labelKey: "Footer.mentions" },
      { href: "/legal/privacy", labelKey: "Footer.privacy" },
      { href: "/legal/cgv", labelKey: "Footer.cgv" },
      { href: "/legal/returns", labelKey: "Footer.returns" },
    ],
  },
} as const;
