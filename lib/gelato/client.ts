const GELATO_BASE = "https://api.gelato.com/v3";

function getHeaders(): Record<string, string> {
  const key = process.env.GELATO_API_KEY;
  if (!key) console.warn("GELATO_API_KEY is not set");
  return {
    "X-API-KEY": key ?? "",
    "Content-Type": "application/json",
  };
}

export async function gelatoFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${GELATO_BASE}${path}`, {
    ...opts,
    headers: { ...getHeaders(), ...opts?.headers },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gelato ${res.status}: ${text}`);
  }
  return res.json();
}
