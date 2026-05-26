export async function POST(request: Request) {
  const { url, manualData } = await request.json();

  // If manual data is provided (from bookmarklet), use it directly
  if (manualData) {
    return Response.json({
      name: manualData.name ?? "",
      description: manualData.description ?? "",
      costPrice: manualData.costPrice ?? 0,
      image: manualData.image ?? "",
      weight: manualData.weight ?? 0,
      dimensions: manualData.dimensions ?? { length: 0, width: 0, height: 0 },
      moq: manualData.moq ?? 1,
      supplierUrl: url ?? "",
    });
  }

  if (!url || !url.includes("alibaba.com")) {
    return Response.json({ error: "Invalid Alibaba URL" }, { status: 400 });
  }

  // Try scraping — Alibaba blocks most server requests, so this is best-effort
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,fr;q=0.8",
      },
      redirect: "follow",
    });

    const html = await res.text();

    const og = (prop: string) => {
      const m = html.match(new RegExp(`property="og:${prop}"\\s+content="([^"]*)"`, "i"))
        ?? html.match(new RegExp(`content="([^"]*)"\\s+property="og:${prop}"`, "i"));
      return m?.[1]?.trim() ?? "";
    };

    let name = og("title") || "";
    name = name.replace(/\s*[-|].*alibaba.*$/i, "").replace(/\s*-\s*Buy.*$/i, "").trim();

    const image = og("image") || "";

    let costPrice = 0;
    const priceMatch = html.match(/\$\s*(\d+\.?\d*)/);
    if (priceMatch) {
      costPrice = Math.round(parseFloat(priceMatch[1]!) * 92); // USD to EUR cents
    }

    // If we got nothing useful, return empty — the form will show the manual entry fields
    return Response.json({
      name,
      description: og("description")?.substring(0, 200) ?? name,
      costPrice,
      image,
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      moq: 1,
      supplierUrl: url,
      scraped: !!(name || costPrice), // tell the frontend if scrape worked
    });
  } catch {
    return Response.json({
      name: "",
      description: "",
      costPrice: 0,
      image: "",
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      moq: 1,
      supplierUrl: url,
      scraped: false,
    });
  }
}
