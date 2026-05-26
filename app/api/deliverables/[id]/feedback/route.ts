import { sendEmail } from "@/lib/email/send";
import { SITE } from "@/lib/site";
import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";

function decodeJwt(token: string): { id: number | string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1]!, "base64url").toString());
  } catch {
    return null;
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-customer-token")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const decoded = decodeJwt(token);
  if (!decoded) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const payload = await getPayload({ config });
  const body = await request.json();
  const { action, feedback } = body as {
    action: "approve" | "request_revision";
    feedback?: string;
  };

  const deliverable = await payload.findByID({ collection: "deliverables", id, depth: 1 });

  const sub =
    typeof deliverable.subscription === "object" && deliverable.subscription
      ? deliverable.subscription
      : await payload.findByID({
          collection: "subscriptions",
          id: String(deliverable.subscription),
        });

  const customerId =
    typeof sub.customer === "object" && sub.customer ? sub.customer.id : sub.customer;
  if (String(customerId) !== String(decoded.id)) {
    return Response.json({ error: "Not authorized" }, { status: 403 });
  }

  const newStatus = action === "approve" ? "approved" : "revision_requested";
  await payload.update({
    collection: "deliverables",
    id,
    data: {
      status: newStatus,
      clientFeedback: feedback ?? deliverable.clientFeedback ?? "",
      ...(action === "approve" ? { deliveredAt: new Date().toISOString() } : {}),
    },
  });

  if (action === "request_revision") {
    await sendEmail({
      to: SITE.email,
      subject: `Révision demandée — ${deliverable.title}`,
      html: `<div style="font-family:monospace;color:#f4f4f4;background:#0a0a0a;padding:40px">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0">FoxCase</div>
        <h1 style="font-size:20px;margin:16px 0">Révision demandée</h1>
        <p style="color:#a0a0a0">Le client a demandé une révision pour <strong style="color:#ff6b00">${deliverable.title}</strong>.</p>
        ${feedback ? `<p style="color:#a0a0a0;margin-top:12px">Feedback : "${feedback}"</p>` : ""}
      </div>`,
    });
  }

  return Response.json({ ok: true, status: newStatus });
}
