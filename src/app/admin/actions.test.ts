import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  verifySessionToken: vi.fn().mockResolvedValue({ email: "a@b.c" }),
  COOKIE_NAME: "admin_session",
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue({ value: "good-token" }),
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn().mockImplementation((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    inquiry: {
      update: vi.fn().mockResolvedValue({}),
    },
  },
}));

import { updateLeadStatus } from "./actions";
import { verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

describe("admin action guard", () => {
  it("throws when session invalid", async () => {
    vi.mocked(verifySessionToken).mockResolvedValueOnce(null);
    await expect(updateLeadStatus(1, "QUOTED")).rejects.toThrow("REDIRECT:");
    expect(verifySessionToken).toHaveBeenCalled();
  });

  it("rejects an invalid status without touching the DB", async () => {
    await expect(updateLeadStatus(1, "HACKED")).rejects.toThrow();
    expect(prisma.inquiry.update).not.toHaveBeenCalled();
  });

  it("updates with a valid status", async () => {
    await updateLeadStatus(1, "QUOTED");
    expect(prisma.inquiry.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });
});
