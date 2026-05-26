export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url || !url.includes("alibaba.com")) {
    return Response.json({ error: "Invalid Alibaba URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) {
      return Response.json({ error: `Fetch failed: ${res.status}` }, { status: 500 });
    }

    const html = await res.text();

    const extract = (pattern: RegExp): string => {
      const match = html.match(pattern);
      return match?.[1]?.trim() ?? "";
    };

    const title =
      extract(/<title[^>]*>([^<]+)<\/title>/) ||
      extract(/"subject":"([^"]+)"/) ||
      extract(/class="product-title[^"]*"[^>]*>([^<]+)</) ||
      "";

    const cleanTitle = title
      .replace(/ - Alibaba\.com.*$/, "")
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();

    let minPrice = 0;
    let maxPrice = 0;
    const priceMatch = html.match(/\$(\d+\.?\d*)\s*-\s*\$(\d+\.?\d*)/);
    if (priceMatch) {
      minPrice = Math.round(parseFloat(priceMatch[1]!) * 100);
      maxPrice = Math.round(parseFloat(priceMatch[2]!) * 100);
    } else {
      const singlePrice = html.match(/\$(\d+\.?\d*)/);
      if (singlePrice) {
        minPrice = Math.round(parseFloat(singlePrice[1]!) * 100);
        maxPrice = minPrice;
      }
    }

    const imageMatch = html.match(/"imageUrl":"(https:\/\/[^"]+)"/);
    const image = imageMatch?.[1]?.replace(/\\u002F/g, "/") ?? "";

    const descriptionParts: string[] = [];
    const metaDesc = extract(/<meta\s+name="description"\s+content="([^"]+)"/);
    if (metaDesc) descriptionParts.push(metaDesc.replace(/&amp;/g, "&").replace(/&#39;/g, "'"));

    const keywords = extract(/<meta\s+name="keywords"\s+content="([^"]+)"/);

    const moqMatch = html.match(/(\d+)\s*(piece|set|unit|pcs)/i);
    const moq = moqMatch ? parseInt(moqMatch[1]!) : 1;

    return Response.json({
      name: cleanTitle,
      description: descriptionParts[0] ?? cleanTitle,
      costPrice: minPrice,
      costPriceMax: maxPrice,
      image,
      moq,
      keywords: keywords ?? "",
      supplierUrl: url,
    });
  } catch (err) {
    console.error("Alibaba scrape error:", err);
    return Response.json({ error: "Failed to scrape product" }, { status: 500 });
  }
}
