import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email", () => ({
  sendRfqEmails: vi.fn().mockResolvedValue({ delivered: true }),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    inquiry: {
      create: vi.fn().mockImplementation(({ data }) => Promise.resolve(data)),
    },
    product: {
      findMany: vi.fn().mockResolvedValue([{ id: 1, nameEn: "Crab" }]),
    },
  },
}));

import { submitRfq } from "./actions";
import { sendRfqEmails } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const input = {
  buyerName: "John Doe",
  companyName: "Seafood Trading Co",
  country: "Singapore",
  email: "john@seafood.example",
  preferredIncoterm: "FOB_JAKARTA" as const,
  shippingMode: "SEA_REEFER" as const,
  items: [{ productId: 1, estimatedQuantity: "2 MT" }],
};

describe("submitRfq", () => {
  beforeEach(() => {
    vi.mocked(sendRfqEmails).mockClear();
    vi.mocked(prisma.inquiry.create).mockClear();
  });

  it("creates inquiry with code and returns ok", async () => {
    const r = await submitRfq(input);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.code).toMatch(/^RFQ-\d{8}-[A-Z]{4}$/);
    const data = vi.mocked(prisma.inquiry.create).mock.calls[0][0].data;
    expect(data.inquiryCode).toMatch(/^RFQ-\d{8}-[A-Z]{4}$/);
  });

  it("still saves RFQ when email fails", async () => {
    vi.mocked(sendRfqEmails).mockRejectedValueOnce(new Error("4xx"));
    const r = await submitRfq(input);
    expect(r.ok).toBe(true);
    expect(prisma.inquiry.create).toHaveBeenCalledTimes(1);
  });

  it("rejects empty items with field errors", async () => {
    const r = await submitRfq({ ...input, items: [] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors.items).toBeTruthy();
  });
});
