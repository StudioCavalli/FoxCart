import { SITE } from "@/lib/site";
import { resend } from "./client";

interface EmailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(input: EmailInput) {
  try {
    const result = await resend.emails.send({
      from: `${SITE.tradeName} <noreply@${SITE.url.replace("https://", "").replace("http://", "")}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo ?? SITE.email,
    });
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, error: err };
  }
}

export function orderConfirmationEmail(orderNumber: string, total: string) {
  return {
    subject: `Commande ${orderNumber} confirmee — ${SITE.tradeName}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:40px 20px;color:#f4f4f4;background:#0a0a0a">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px">Commande confirmee</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Merci pour votre commande <strong style="color:#ff6b00">${orderNumber}</strong>.
          Nous preparons votre colis et vous enverrons un email avec le numero de suivi des l'expedition.
        </p>
        <div style="margin:32px 0;padding:16px;border:1px solid #262626">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#a0a0a0">Total</div>
          <div style="font-size:24px;font-weight:bold;color:#ff6b00;margin-top:4px">${total}</div>
        </div>
        <p style="color:#737373;font-size:12px">
          ${SITE.address.full}<br>${SITE.email}
        </p>
      </div>
    `,
  };
}

export function shippingNotificationEmail(
  orderNumber: string,
  trackingUrl: string,
  carrier: string,
) {
  return {
    subject: `Expedition ${orderNumber} — ${SITE.tradeName}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:40px 20px;color:#f4f4f4;background:#0a0a0a">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px">Colis expedie</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Votre commande <strong style="color:#ff6b00">${orderNumber}</strong> a ete expediee via ${carrier}.
        </p>
        <a href="${trackingUrl}" style="display:inline-block;margin:24px 0;padding:12px 24px;background:#ff6b00;color:#fff;text-decoration:none;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">
          Suivre mon colis
        </a>
        <p style="color:#737373;font-size:12px">${SITE.email}</p>
      </div>
    `,
  };
}

export function quoteReceivedEmail(firstName: string) {
  return {
    subject: `Demande de devis recue — ${SITE.tradeName}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:40px 20px;color:#f4f4f4;background:#0a0a0a">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px">Demande recue</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Bonjour ${firstName}, nous avons bien recu votre demande de devis.
          Nous vous repondrons sous 48 heures ouvrables.
        </p>
        <p style="color:#737373;font-size:12px;margin-top:32px">${SITE.address.full}<br>${SITE.email}</p>
      </div>
    `,
  };
}

export function welcomeEmail(firstName: string) {
  return {
    subject: `Bienvenue chez ${SITE.tradeName}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:40px 20px;color:#f4f4f4;background:#0a0a0a">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#a0a0a0;margin-bottom:24px">${SITE.tradeName}</div>
        <h1 style="font-size:24px;font-weight:bold;margin:0 0 16px">Bienvenue ${firstName}</h1>
        <p style="color:#a0a0a0;font-size:14px;line-height:1.6">
          Votre compte a ete cree avec succes. Vous pouvez desormais passer commande,
          suivre vos livraisons et gerer vos adresses.
        </p>
        <p style="color:#737373;font-size:12px;margin-top:32px">${SITE.email}</p>
      </div>
    `,
  };
}
