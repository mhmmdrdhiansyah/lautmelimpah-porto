import { Resend } from "resend";

export type RfqEmailPayload = {
  code: string;
  buyer: { name: string; email: string };
  items: { name: string; quantity: string }[];
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(p: RfqEmailPayload) {
  const rows = p.items
    .map(
      (i) =>
        `<tr><td>${escapeHtml(i.name)}</td><td>${escapeHtml(i.quantity)}</td></tr>`,
    )
    .join("");
  return `<h2>RFQ ${escapeHtml(p.code)}</h2><p>Buyer: ${escapeHtml(p.buyer.name)} (${escapeHtml(p.buyer.email)})</p><table border="1" cellpadding="6"><tr><th>Product</th><th>Estimated quantity</th></tr>${rows}</table>`;
}

export async function sendRfqEmails(
  payload: RfqEmailPayload,
): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[dev-email]", payload.code, JSON.stringify(payload.items));
    return { delivered: false };
  }
  const resend = new Resend(apiKey);
  const from = "LautMelimpah RFQ <onboarding@resend.dev>";
  await resend.emails.send({
    from,
    to: process.env.RFQ_SALES_INBOX ?? "sales@lautmelimpah.example",
    subject: `New RFQ ${payload.code} from ${payload.buyer.name}`,
    html: buildHtml(payload),
  });
  await resend.emails.send({
    from,
    to: payload.buyer.email,
    subject: `We received your request ${payload.code}`,
    html: `<p>Thank you ${escapeHtml(payload.buyer.name)}, we received your RFQ ${escapeHtml(payload.code)} and will reply with a quotation shortly.</p>`,
  });
  return { delivered: true };
}
