"use server";

import { prisma } from "@/lib/prisma";
import { rfqSchema, type RfqInput } from "@/lib/rfq-schema";
import { sendRfqEmails } from "@/lib/email";

export type SubmitRfqResult =
  | { ok: true; code: string }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof RfqInput | "items", string>>;
    };

function makeCode(): string {
  const date = new Date();
  const ymd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rand = "";
  for (let i = 0; i < 4; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  return `RFQ-${ymd}-${rand}`;
}

export async function submitRfq(input: unknown): Promise<SubmitRfqResult> {
  const parsed = rfqSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: SubmitRfqResult extends never ? never : Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const data = parsed.data;
  const code = makeCode();
  const products = await prisma.product.findMany({
    where: { id: { in: data.items.map((i) => i.productId) } },
  });
  const names = new Map(products.map((p) => [p.id, p.nameEn]));

  await prisma.inquiry.create({
    data: {
      inquiryCode: code,
      buyerName: data.buyerName,
      companyName: data.companyName,
      country: data.country,
      email: data.email,
      phoneWhatsapp: data.phoneWhatsapp || null,
      preferredIncoterm: data.preferredIncoterm,
      shippingMode: data.shippingMode,
      destinationPort: data.destinationPort || null,
      additionalNotes: data.additionalNotes || null,
      items: {
        create: data.items.map((i) => ({
          productId: i.productId,
          requestedForm: i.requestedForm || null,
          requestedSize: i.requestedSize || null,
          estimatedQuantity: i.estimatedQuantity,
        })),
      },
    },
  });

  try {
    await sendRfqEmails({
      code,
      buyer: { name: data.buyerName, email: data.email },
      items: data.items.map((i) => ({
        name: names.get(i.productId) ?? `Product #${i.productId}`,
        quantity: i.estimatedQuantity,
      })),
    });
  } catch (e) {
    console.error("RFQ email failed (RFQ still saved):", e);
  }

  return { ok: true, code };
}
