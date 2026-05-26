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

async function getCustomerId(): Promise<number | string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-customer-token")?.value;
  if (!token) return null;
  const decoded = decodeJwt(token);
  if (!decoded || decoded.collection !== "customers") return null;
  return decoded.id;
}

export async function GET() {
  const customerId = await getCustomerId();
  if (!customerId) return Response.json({ addresses: [] }, { status: 401 });

  const payload = await getPayload({ config });
  const customer = await payload.findByID({ collection: "customers", id: customerId });

  return Response.json({ addresses: customer.addresses ?? [] });
}

export async function POST(request: Request) {
  const customerId = await getCustomerId();
  if (!customerId) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const payload = await getPayload({ config });
  const customer = await payload.findByID({ collection: "customers", id: customerId });
  const body = await request.json();

  const existingAddresses = (customer.addresses ?? []) as Record<string, unknown>[];

  const isDuplicate = existingAddresses.some(
    (a) =>
      a.address1 === body.address1 &&
      a.postalCode === body.postalCode &&
      a.city === body.city &&
      a.addressType === body.addressType,
  );

  if (isDuplicate) {
    return Response.json({ ok: true, message: "Address already saved" });
  }

  if (body.isDefault) {
    for (const addr of existingAddresses) {
      if (addr.addressType === body.addressType) {
        addr.isDefault = false;
      }
    }
  }

  const updatedAddresses = [...existingAddresses, body];

  await payload.update({
    collection: "customers",
    id: customerId,
    data: { addresses: updatedAddresses },
  });

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const customerId = await getCustomerId();
  if (!customerId) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const { addressId } = await request.json();
  const payload = await getPayload({ config });
  const customer = await payload.findByID({ collection: "customers", id: customerId });

  const filtered = ((customer.addresses ?? []) as { id?: string }[]).filter(
    (a) => a.id !== addressId,
  );

  await payload.update({
    collection: "customers",
    id: customerId,
    data: { addresses: filtered },
  });

  return Response.json({ ok: true });
}
