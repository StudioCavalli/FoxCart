const PACKLINK_BASE = "https://apisandbox.packlink.com/v1";

function getHeaders(): Record<string, string> {
  const key = process.env.PACKLINK_API_KEY;
  if (!key) console.warn("PACKLINK_API_KEY is not set");
  return {
    Authorization: key ?? "",
    "Content-Type": "application/json",
  };
}

export async function packlinkFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${PACKLINK_BASE}${path}`, {
    ...opts,
    headers: { ...getHeaders(), ...opts?.headers },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Packlink ${res.status}: ${text}`);
  }
  return res.json();
}
