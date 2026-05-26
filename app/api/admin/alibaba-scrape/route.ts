export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url || !url.includes("alibaba.com")) {
    return Response.json({ error: "Invalid Alibaba URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html",
      },
    });

    if (!res.ok) {
      return Response.json({ error: `Fetch failed: ${res.status}` }, { status: 500 });
    }

    const html = await res.text();

    // OG tags are the most reliable
    const og = (prop: string) => {
      const m = html.match(new RegExp(`<meta\\s+property="og:${prop}"\\s+content="([^"]*)"`, "i"))
        ?? html.match(new RegExp(`<meta\\s+content="([^"]*)"\\s+property="og:${prop}"`, "i"));
      return m?.[1]?.trim() ?? "";
    };

    let name = og("title") || "";
    // Clean Alibaba suffix
    name = name.replace(/\s*[-|].*alibaba.*$/i, "").replace(/\s*-\s*Buy.*$/i, "").trim();

    const image = og("image") || "";
    const ogDesc = og("description") || "";

    // Price from og:price or regex
    let costPrice = 0;
    const ogPrice = html.match(/property="og:price:amount"\s+content="([^"]+)"/i)
      ?? html.match(/content="([^"]+)"\s+property="og:price:amount"/i);
    if (ogPrice) {
      costPrice = Math.round(parseFloat(ogPrice[1]!) * 100);
    } else {
      // Try USD price patterns
      const pricePatterns = [
        /\$\s*(\d+\.?\d*)\s*-\s*\$\s*(\d+\.?\d*)/,
        /US\s*\$\s*(\d+\.?\d*)/,
        /\$(\d+\.?\d*)/,
      ];
      for (const p of pricePatterns) {
        const m = html.match(p);
        if (m) {
          // Convert USD to EUR cents (approx 0.92)
          const usd = parseFloat(m[1]!);
          costPrice = Math.round(usd * 92);
          break;
        }
      }
    }

    // Dimensions from structured data or description
    let weight = 0;
    let length = 0;
    let width = 0;
    let height = 0;

    // Try common dimension patterns in HTML
    const dimPatterns = [
      /(\d+)\s*[x×]\s*(\d+)\s*(?:cm|CM)/,
      /(\d+)\s*[x×]\s*(\d+)\s*[x×]\s*(\d+)\s*(?:cm|CM)/,
      /size[:\s]*(\d+)\s*[x×]\s*(\d+)/i,
    ];
    for (const p of dimPatterns) {
      const m = html.match(p);
      if (m) {
        length = parseInt(m[1]!) || 0;
        width = parseInt(m[2]!) || 0;
        height = m[3] ? parseInt(m[3]) : 0;
        break;
      }
    }

    // Weight
    const weightMatch = html.match(/(\d+\.?\d*)\s*(?:kg|KG)/);
    if (weightMatch) {
      weight = Math.round(parseFloat(weightMatch[1]!) * 1000);
    } else {
      const weightG = html.match(/(\d+)\s*(?:g|G|gram)/);
      if (weightG) weight = parseInt(weightG[1]!);
    }

    // MOQ
    const moqMatch = html.match(/(\d+)\s*(?:piece|set|unit|pcs|Piece|Set)/i);
    const moq = moqMatch ? parseInt(moqMatch[1]!) : 1;

    // Clean description
    const description = ogDesc
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .substring(0, 200);

    return Response.json({
      name,
      description: description || name,
      costPrice,
      image,
      weight,
      dimensions: { length, width, height },
      moq,
      supplierUrl: url,
    });
  } catch (err) {
    console.error("Alibaba scrape error:", err);
    return Response.json({ error: "Failed to scrape product" }, { status: 500 });
  }
}
