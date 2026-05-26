import { sendEmail, welcomeEmail } from "@/lib/email/send";
import config from "@/payload.config";
import { getPayload } from "payload";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, type } = await request.json();
    const payload = await getPayload({ config });

    const customer = await payload.create({
      collection: "customers",
      data: { email, password, firstName, lastName, type: type ?? "individual" },
    });

    const result = await payload.login({
      collection: "customers",
      data: { email, password },
    });

    const welcome = welcomeEmail(firstName);
    await sendEmail({ to: email, ...welcome });

    const response = Response.json({ user: customer });
    if (result.token) {
      response.headers.set(
        "Set-Cookie",
        `payload-customer-token=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
      );
    }
    return response;
  } catch (err) {
    console.error("Register error:", err);
    return Response.json({ error: "Registration failed" }, { status: 400 });
  }
}
