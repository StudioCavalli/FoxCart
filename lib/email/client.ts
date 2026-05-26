import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;

if (!key) {
  console.warn("RESEND_API_KEY is not set — emails will not be sent.");
}

export const resend = key ? new Resend(key) : null;
