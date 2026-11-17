import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  verifySessionToken: vi.fn().mockResolvedValue(null),
  COOKIE_NAME: "admin_session",
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue({ value: "bad-token" }),
  }),
}));

import { updateLeadStatus, createProduct } from "./actions";
import { verifySessionToken } from "@/lib/auth";

describe("admin action guard", () => {
  it("throws when session invalid", async () => {
    await expect(updateLeadStatus(1, "QUOTED")).rejects.toThrow();
    expect(verifySessionToken).toHaveBeenCalled();
  });

  it("throws for createProduct without session", async () => {
    await expect(
      createProduct({} as never),
    ).rejects.toThrow();
  });
});
