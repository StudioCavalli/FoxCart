import "@payloadcms/next/css";
import type React from "react";

export const metadata = {
  title: "FoxCart Admin",
};

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
