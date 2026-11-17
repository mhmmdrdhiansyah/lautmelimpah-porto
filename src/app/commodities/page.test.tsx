// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CommoditiesPage from "./page";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    product: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 1,
          slug: "blue-swimming-crab",
          nameEn: "Blue Swimming Crab",
          latinName: "Portunus pelagicus",
          imageUrl: "/img/placeholder.svg",
          availabilityStatus: "AVAILABLE",
          peakMonths: null,
          category: { slug: "crustaceans", nameEn: "Crustaceans" },
        },
      ]),
    },
  },
}));

describe("commodities list page", () => {
  it("renders product name and price badge", async () => {
    const Page = await CommoditiesPage({ searchParams: Promise.resolve({}) });
    render(Page);
    expect(screen.getByText("Blue Swimming Crab")).toBeTruthy();
    expect(screen.getByText("Price upon request")).toBeTruthy();
  });
});
