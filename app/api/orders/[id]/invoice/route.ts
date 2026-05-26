import { SITE } from "@/lib/site";
import { formatPrice } from "@/lib/utils";
import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayload({ config });

  let order;
  try {
    order = await payload.findByID({ collection: "orders", id, depth: 1 });
  } catch {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const items = (order.items ?? []) as {
    product: { name?: string; slug?: string } | string;
    variantSku?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];

  const itemsHtml = items
    .map((item) => {
      const name =
        typeof item.product === "object" && item.product?.name
          ? String(item.product.name)
          : String(item.product);
      return `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #262626">${name}${item.variantSku ? ` (${item.variantSku})` : ""}</td>
        <td style="padding:8px 0;border-bottom:1px solid #262626;text-align:center">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #262626;text-align:right">${formatPrice(item.unitPrice)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #262626;text-align:right">${formatPrice(item.totalPrice)}</td>
      </tr>`;
    })
    .join("");

  const addr = order.shippingAddress as {
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  } | null;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Facture ${order.orderNumber}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Courier New',monospace; color:#f4f4f4; background:#0a0a0a; padding:60px; font-size:12px; }
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:60px; }
  .logo { font-size:14px; font-weight:bold; letter-spacing:0.3em; text-transform:uppercase; }
  .accent { color:#ff6b00; }
  .meta { text-align:right; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; color:#a0a0a0; line-height:2; }
  .section { margin-bottom:40px; }
  .section-title { font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#a0a0a0; margin-bottom:12px; }
  table { width:100%; border-collapse:collapse; }
  th { font-size:10px; text-transform:uppercase; letter-spacing:0.15em; color:#a0a0a0; padding:8px 0; border-bottom:2px solid #262626; text-align:left; }
  th:nth-child(2),th:nth-child(3),th:nth-child(4) { text-align:right; }
  th:nth-child(2) { text-align:center; }
  .totals { margin-top:20px; text-align:right; }
  .totals .row { display:flex; justify-content:flex-end; gap:40px; padding:4px 0; }
  .totals .total { font-size:18px; font-weight:bold; color:#ff6b00; margin-top:8px; padding-top:8px; border-top:2px solid #262626; }
  .footer { margin-top:60px; padding-top:20px; border-top:1px solid #262626; font-size:10px; color:#737373; line-height:1.8; }
</style></head>
<body>
  <div class="header">
    <div>
      <div class="logo">FoxCase<span class="accent">.</span></div>
      <div style="margin-top:8px;font-size:10px;color:#a0a0a0;text-transform:uppercase;letter-spacing:0.15em">Facture</div>
    </div>
    <div class="meta">
      <div>N<span class="accent">.</span> ${order.orderNumber}</div>
      <div>Date : ${new Date(order.createdAt).toLocaleDateString("fr-FR")}</div>
      <div>Statut : ${order.paymentStatus === "paid" ? "Payée" : order.paymentStatus}</div>
    </div>
  </div>

  <div style="display:flex;gap:60px;margin-bottom:40px">
    <div class="section" style="flex:1">
      <div class="section-title">Vendeur</div>
      <div>${SITE.tradeName}</div>
      <div style="color:#a0a0a0">${SITE.legalName}</div>
      <div style="color:#a0a0a0">SIRET ${SITE.legal.siret}</div>
      <div style="color:#a0a0a0">TVA ${SITE.legal.tva}</div>
      <div style="color:#a0a0a0;margin-top:4px">${SITE.address.full}</div>
      <div style="color:#a0a0a0">${SITE.email}</div>
    </div>
    <div class="section" style="flex:1">
      <div class="section-title">Client</div>
      ${
        addr
          ? `
      <div>${addr.firstName ?? ""} ${addr.lastName ?? ""}</div>
      ${addr.company ? `<div style="color:#a0a0a0">${addr.company}</div>` : ""}
      <div style="color:#a0a0a0">${addr.address1 ?? ""}</div>
      <div style="color:#a0a0a0">${addr.postalCode ?? ""} ${addr.city ?? ""}, ${addr.country ?? ""}</div>
      `
          : `<div style="color:#a0a0a0">${order.guestEmail ?? "—"}</div>`
      }
    </div>
  </div>

  <div class="section">
    <div class="section-title">Articles</div>
    <table>
      <thead><tr><th>Désignation</th><th style="text-align:center">Qté</th><th style="text-align:right">P.U. HT</th><th style="text-align:right">Total HT</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
  </div>

  <div class="totals">
    <div class="row"><span style="color:#a0a0a0">Sous-total HT</span><span>${formatPrice(order.subtotal)}</span></div>
    <div class="row"><span style="color:#a0a0a0">Livraison</span><span>${formatPrice(order.shippingCost)}</span></div>
    <div class="row"><span style="color:#a0a0a0">TVA (20%)</span><span>${formatPrice(order.taxAmount)}</span></div>
    ${order.discountAmount ? `<div class="row"><span style="color:#a0a0a0">Remise</span><span>-${formatPrice(order.discountAmount)}</span></div>` : ""}
    <div class="row total"><span>Total TTC</span><span>${formatPrice(order.total)}</span></div>
  </div>

  <div class="footer">
    ${SITE.legalName} — ${SITE.legal.form}<br>
    SIRET ${SITE.legal.siret} — TVA ${SITE.legal.tva} — NAF ${SITE.legal.naf}<br>
    ${SITE.address.full} — ${SITE.email}
  </div>
</body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="facture-${order.orderNumber}.html"`,
    },
  });
}
