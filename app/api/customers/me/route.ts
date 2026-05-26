import config from "@/payload.config";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getPayload } from "payload";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-customer-token")?.value;
    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const secret = process.env.PAYLOAD_SECRET;
    if (!secret) {
      return Response.json({ user: null }, { status: 500 });
    }

    const decoded = jwt.verify(token, secret) as { id: string | number; collection: string };
    if (decoded.collection !== "customers") {
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
