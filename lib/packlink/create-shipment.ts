import { SITE } from "@/lib/site";
import { packlinkFetch } from "./client";

interface ShipmentInput {
  orderId: string;
  carrier: string;
  service: string;
  recipient: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
    email?: string;
  };
  packages: { weight: number; length: number; width: number; height: number }[];
}

interface ShipmentResult {
  shipmentId: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

export async function createShipment(input: ShipmentInput): Promise<ShipmentResult> {
  const result = await packlinkFetch<{
    reference: string;
    tracking_number?: string;
    tracking_url?: string;
  }>("/shipments", {
    method: "POST",
    body: JSON.stringify({
      from: {
        name: SITE.legal.director,
        company: SITE.tradeName,
        street1: SITE.address.street,
        zip_code: SITE.address.postalCode,
        city: SITE.address.city,
        country: "FR",
        email: SITE.email,
      },
      to: {
        name: `${input.recipient.firstName} ${input.recipient.lastName}`,
        street1: input.recipient.address1,
        zip_code: input.recipient.postalCode,
        city: input.recipient.city,
        country: input.recipient.country,
        phone: input.recipient.phone,
        email: input.recipient.email,
      },
      packages: input.packages.map((p) => ({
        weight: p.weight / 1000,
        length: p.length,
        width: p.width,
        height: p.height,
      })),
      service: input.service,
      carrier: input.carrier,
      content: `Commande ${input.orderId}`,
    }),
  });

  return {
    shipmentId: result.reference,
    trackingNumber: result.tracking_number,
    trackingUrl: result.tracking_url,
  };
}
