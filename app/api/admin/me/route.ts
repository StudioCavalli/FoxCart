import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";

function decodeJwt(token: string): { id: number | string; collection: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1]!, "base64url").toString());
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-admin-token")?.value;
    if (!token) return Response.json({ user: null }, { status: 401 });

    const decoded = decodeJwt(token);
    if (!decoded || decoded.collection !== "users") {
      return Response.json({ user: null }, { status: 401 });
    }

    const payload = await getPayload({ config });
    const user = await payload.findByID({ collection: "users", id: decoded.id });
    if ((user as { role?: string }).role !== "admin") {
      return Response.json({ user: null }, { status: 403 });
    }

    return Response.json({ user });
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}

export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    "payload-admin-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
  );
  return response;
}
