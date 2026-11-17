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
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const data = parsed.data;
  const products = await prisma.product.findMany({
    where: { id: { in: data.items.map((i) => i.productId) } },
  });
  const knownIds = new Set(products.map((p) => p.id));
  const validItems = data.items.filter((i) => knownIds.has(i.productId));
  if (validItems.length === 0) {
    return {
      ok: false,
      fieldErrors: {
        items: "None of the requested products is available anymore.",
      },
    };
  }
  const names = new Map(products.map((p) => [p.id, p.nameEn]));

  const createData = (code: string) => ({
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
      create: validItems.map((i) => ({
        productId: i.productId,
        requestedForm: i.requestedForm || null,
        requestedSize: i.requestedSize || null,
        estimatedQuantity: i.estimatedQuantity,
      })),
    },
  });

  const code = makeCode();
  try {
    await prisma.inquiry.create({ data: createData(code) });
  } catch (e) {
    // Retry once on a unique-constraint collision of the generated code.
    const isP2002 =
      typeof e === "object" && e !== null && "code" in e && e.code === "P2002";
    if (isP2002) {
      await prisma.inquiry.create({ data: createData(makeCode()) });
    } else {
      throw e;
    }
  }

  try {
    await sendRfqEmails({
      code,
      buyer: { name: data.buyerName, email: data.email },
      items: validItems.map((i) => ({
        name: names.get(i.productId) ?? `Product #${i.productId}`,
        quantity: i.estimatedQuantity,
      })),
    });
  } catch (e) {
    console.error("RFQ email failed (RFQ still saved):", e);
  }

  return { ok: true, code };
}
