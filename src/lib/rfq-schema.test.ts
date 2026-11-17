import { describe, it, expect } from "vitest";
import { rfqSchema } from "./rfq-schema";

const valid = {
  buyerName: "John Doe",
  companyName: "Seafood Trading Co",
  country: "Singapore",
  email: "john@seafood.example",
  phoneWhatsapp: "+65 9123 4567",
  preferredIncoterm: "FOB_JAKARTA",
  shippingMode: "SEA_REEFER",
  destinationPort: "Singapore",
  additionalNotes: "",
  items: [{ productId: 1, estimatedQuantity: "2 MT" }],
};

describe("rfq schema", () => {
  it("accepts a valid payload", () => {
    const r = rfqSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("rejects empty items", () => {
    const r = rfqSchema.safeParse({ ...valid, items: [] });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path.includes("items"))).toBe(true);
    }
  });

  it("rejects bad email", () => {
    const r = rfqSchema.safeParse({ ...valid, email: "no-at-sign" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path.includes("email"))).toBe(true);
    }
  });

  it("rejects empty estimatedQuantity in an item", () => {
    const r = rfqSchema.safeParse({
      ...valid,
      items: [{ productId: 1, estimatedQuantity: "" }],
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(
        r.error.issues.some((i) => i.path.includes("estimatedQuantity")),
      ).toBe(true);
    }
  });
});
