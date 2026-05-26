const BAN_API = "https://api-adresse.data.gouv.fr/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 3) {
    return Response.json({ results: [] });
  }

  try {
    const res = await fetch(`${BAN_API}?q=${encodeURIComponent(q)}&limit=5&autocomplete=1`);
    if (!res.ok) return Response.json({ results: [] });

    const data = await res.json();

    const results = (data.features ?? []).map(
      (f: {
        properties: {
          label: string;
          housenumber?: string;
          street?: string;
          name: string;
          postcode: string;
          city: string;
          context: string;
        };
      }) => ({
        label: f.properties.label,
        street: f.properties.housenumber
          ? `${f.properties.housenumber} ${f.properties.street ?? f.properties.name}`
          : f.properties.name,
        postalCode: f.properties.postcode,
        city: f.properties.city,
        country: "FR",
      }),
    );

    return Response.json({ results });
  } catch {
    return Response.json({ results: [] });
  }
}
