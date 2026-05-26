import config from "@/payload.config";
import { getPayload } from "payload";

const RECHERCHE_API = "https://recherche-entreprises.api.gouv.fr/search";

interface ApiResult {
  results: {
    siren: string;
    nom_complet: string;
    nom_raison_sociale: string;
    siege: {
      siret: string;
      adresse: string;
      code_postal: string;
      libelle_commune: string;
      complement_adresse: string;
    };
    activite_principale: string;
    nature_juridique: string;
    tranche_effectif_salarie: string;
    date_creation: string;
    nombre_etablissements: number;
  }[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return Response.json({ results: [] });
  }

  try {
    const res = await fetch(`${RECHERCHE_API}?q=${encodeURIComponent(q)}&per_page=5&page=1`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return Response.json({ results: [] });
    }

    const data: ApiResult = await res.json();

    const results = data.results.map((r) => ({
      siren: r.siren,
      siret: r.siege.siret,
      name: r.nom_complet || r.nom_raison_sociale,
      address: r.siege.adresse,
      postalCode: r.siege.code_postal,
      city: r.siege.libelle_commune,
      naf: r.activite_principale,
      legalForm: r.nature_juridique,
      createdAt: r.date_creation,
    }));

    return Response.json({ results });
  } catch {
    return Response.json({ results: [] });
  }
}

export async function POST(request: Request) {
  const { siret } = await request.json();
  if (!siret) {
    return Response.json({ exists: false });
  }

  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "customers",
    where: { company: { equals: siret } },
    limit: 1,
  });

  return Response.json({ exists: existing.totalDocs > 0 });
}
