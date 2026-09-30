import { Resend } from "resend";

interface ContactEmail {
  name: string;
  email: string;
  html: string;
}

export async function sendContactNotification({ name, email, html }: ContactEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL;
  if (!apiKey || !recipient) return;

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
    to: recipient,
    subject: `New portfolio inquiry from ${name.replace(/[\r\n]+/g, " ")}`,
    replyTo: email,
    html,
  });
}
