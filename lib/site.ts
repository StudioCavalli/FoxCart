export const SITE = {
  name: "FoxCase",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  labUrl: "https://foxstudio.fr",
  email: "contact@foxcase.fr",
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
