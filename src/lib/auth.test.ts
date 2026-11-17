import { describe, it, expect, afterEach, vi } from "vitest";
import { createSessionToken, verifySessionToken } from "./auth";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("session token", () => {
  it("creates and verifies a JWT", async () => {
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret-32-chars-long-xxxxxx");
    const token = await createSessionToken("a@b.c");
    expect(token.split(".").length).toBe(3);
    const payload = await verifySessionToken(token);
    expect(payload).toEqual({ email: "a@b.c" });
  });

  it("returns null with a different secret", async () => {
    vi.stubEnv("ADMIN_SESSION_SECRET", "secret-one-32-chars-long-xxxxxxxx");
    const token = await createSessionToken("a@b.c");
    vi.stubEnv("ADMIN_SESSION_SECRET", "secret-two-32-chars-long-xxxxxxxx");
    const payload = await verifySessionToken(token);
    expect(payload).toBeNull();
  });
});
