import type { ContactSubmissionDto } from "./contact.dto";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export function mapContactToEmailHtml(contact: ContactSubmissionDto) {
  const name = escapeHtml(contact.name);
  const email = escapeHtml(contact.email);
  const message = escapeHtml(contact.message).replace(/\n/g, "<br />");

  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172033">
    <h2>New portfolio inquiry</h2>
    <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
    <p style="white-space:normal;line-height:1.6">${message}</p>
  </div>`;
}
