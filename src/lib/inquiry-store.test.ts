import { describe, it, expect, beforeEach } from "vitest";
import { useInquiryStore } from "./inquiry-store";

describe("inquiry store", () => {
  beforeEach(() => {
    useInquiryStore.getState().clear();
  });

  it("adds two distinct products", () => {
    const { add } = useInquiryStore.getState();
    add(1, "Grouper");
    add(2, "Squid");
    expect(useInquiryStore.getState().items.length).toBe(2);
  });

  it("does not duplicate the same product", () => {
    const { add } = useInquiryStore.getState();
    add(1, "Grouper");
    add(1, "Grouper");
    const items = useInquiryStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].name).toBe("Grouper");
  });

  it("removes a product", () => {
    const { add, remove } = useInquiryStore.getState();
    add(1, "Grouper");
    add(2, "Squid");
    remove(1);
    const items = useInquiryStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].productId).toBe(2);
  });

  it("sets quantity by product id", () => {
    const { add, setQuantity } = useInquiryStore.getState();
    add(1, "Grouper");
    setQuantity(1, "2 MT");
    expect(useInquiryStore.getState().items[0].estimatedQuantity).toBe("2 MT");
  });
});
