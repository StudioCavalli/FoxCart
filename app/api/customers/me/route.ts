import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";

function decodeJwtPayload(token: string): { id: string | number; collection: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1]!, "base64url").toString());
    return payload;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-customer-token")?.value;
    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const decoded = decodeJwtPayload(token);
    if (!decoded || decoded.collection !== "customers") {
      return Response.json({ user: null }, { status: 401 });
    }

    const payload = await getPayload({ config });
    const user = await payload.findByID({ collection: "customers", id: decoded.id });

    return Response.json({ user });
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}

export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    "payload-customer-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
  );
  return response;
}
