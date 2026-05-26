import { sendEmail } from "@/lib/email/send";
import { SITE } from "@/lib/site";
import type { CollectionAfterChangeHook } from "payload";

export const notifyOnDeliverableStatusChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (!previousDoc || doc.status === previousDoc.status) return doc;

  const payload = req.payload;
  const sub =
    typeof doc.subscription === "object" && doc.subscription
      ? doc.subscription
      : await payload.findByID({
          collection: "subscriptions",
          id: String(doc.subscription),
          depth: 1,
        });

  const customer =
    typeof sub.customer === "object" && sub.customer
      ? sub.customer
      : await payload.findByID({ collection: "customers", id: String(sub.customer) });

  const customerEmail =
    typeof customer === "object" && "email" in customer ? String(customer.email) : "";
  const customerName =
    typeof customer === "object" && "firstName" in customer ? String(customer.firstName) : "";

  if (doc.status === "review" && customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: `Nouveau livrable a valider — ${doc.title}`,
      html: `<div style="font-family:monospace;color:#f4f4f4;background:#0a0a0a;padding:40px;max-width:600px;margin:0 auto">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:20px;font-weight:bold;margin:0 0 16px">Nouveau livrable a valider</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Bonjour ${customerName}, le livrable <strong style="color:#ff6b00">${doc.title}</strong> est pret pour votre validation.
        </p>
        <p style="color:#a0a0a0;font-size:14px;margin-top:12px">Connectez-vous a votre espace client pour l'approuver ou demander une revision.</p>
      </div>`,
    });
  }

  if (doc.status === "delivered" && customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: `Livrable livre — ${doc.title}`,
      html: `<div style="font-family:monospace;color:#f4f4f4;background:#0a0a0a;padding:40px;max-width:600px;margin:0 auto">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:20px;font-weight:bold;margin:0 0 16px">Livrable livre</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Le livrable <strong style="color:#ff6b00">${doc.title}</strong> a ete livre. Vous pouvez le telecharger depuis votre espace client.
        </p>
      </div>`,
    });
  }

  if (doc.status === "revision_requested") {
    await sendEmail({
      to: SITE.email,
      subject: `Revision demandee — ${doc.title}`,
      html: `<div style="font-family:monospace;color:#f4f4f4;background:#0a0a0a;padding:40px;max-width:600px;margin:0 auto">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:20px;font-weight:bold;margin:0 0 16px">Revision demandee</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Le client a demande une revision pour <strong style="color:#ff6b00">${doc.title}</strong>.
        </p>
        ${doc.clientFeedback ? `<p style="color:#a0a0a0;font-size:14px;margin-top:12px">Feedback : "${doc.clientFeedback}"</p>` : ""}
      </div>`,
    });
  }

  return doc;
};
