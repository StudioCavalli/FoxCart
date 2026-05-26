import config from "@/payload.config";
import { getPayload } from "payload";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const payload = await getPayload({ config });

    const result = await payload.login({ collection: "users", data: { email, password } });
    if (!result.token) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = result.user as { role?: string };
    if (user.role !== "admin") {
      return Response.json({ error: "Not an admin" }, { status: 403 });
    }

    const response = Response.json({ user: result.user });
    response.headers.set(
      "Set-Cookie",
      `payload-admin-token=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
    );
    return response;
  } catch {
    return Response.json({ error: "Login failed" }, { status: 401 });
  }
}
