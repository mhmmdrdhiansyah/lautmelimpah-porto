import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl:
    process.env.TEST_DATABASE_URL ??
    "mysql://app:app@127.0.0.1:3306/lautmelimpah",
});

describe("seed", () => {
  it("has 5 categories", async () => {
    expect(await prisma.category.count()).toBe(5);
  });
  it("has 6 products", async () => {
    expect(await prisma.product.count()).toBe(6);
  });
  it("has at least 6 compliance documents", async () => {
    expect(await prisma.complianceDocument.count()).toBeGreaterThanOrEqual(6);
  });
  afterAll(() => prisma.$disconnect());
});
