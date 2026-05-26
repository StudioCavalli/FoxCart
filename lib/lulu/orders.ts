import { luluFetch } from "./client";

interface LuluPrintJobInput {
  orderReferenceId: string;
  contactEmail: string;
  interiorFileUrl: string;
  coverFileUrl: string;
  podPackageId: string;
  quantity: number;
  shippingAddress: {
    name: string;
    street1: string;
    city: string;
    stateCode?: string;
    postcode: string;
    countryCode: string;
    phoneNumber?: string;
  };
  shippingLevel: "MAIL" | "PRIORITY_MAIL" | "GROUND" | "EXPEDITED" | "EXPRESS";
}

interface LuluPrintJobResult {
  id: number;
  status: { name: string };
}

export async function createPrintJob(input: LuluPrintJobInput): Promise<LuluPrintJobResult> {
  return luluFetch<LuluPrintJobResult>("/print-jobs/", {
    method: "POST",
    body: JSON.stringify({
      contact_email: input.contactEmail,
      external_id: input.orderReferenceId,
      line_items: [
        {
          external_id: `${input.orderReferenceId}-book`,
          printable_normalization: {
            interior: { source_url: input.interiorFileUrl },
            cover: { source_url: input.coverFileUrl },
            pod_package_id: input.podPackageId,
          },
          quantity: input.quantity,
        },
      ],
      shipping_address: input.shippingAddress,
      shipping_level: input.shippingLevel,
    }),
  });
}

export async function getPrintJobStatus(jobId: number): Promise<{ status: { name: string } }> {
  return luluFetch<{ status: { name: string } }>(`/print-jobs/${jobId}/`);
}
