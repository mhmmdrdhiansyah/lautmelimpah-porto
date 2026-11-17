import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";

export const dynamic = "force-dynamic";

export default async function CommoditiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { id: "asc" },
    where: {
      ...(params.category
        ? { category: { slug: params.category } }
        : {}),
      ...(params.freezing
        ? { freezingMethods: { contains: params.freezing } }
        : {}),
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">Commodities</h1>
      <p className="mt-2 text-muted-foreground">
        Six commodities from Belitung waters. Prices on request.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <a
          href="/commodities"
          className="rounded-sm border border-border px-3 py-1 hover:bg-secondary"
        >
          All
        </a>
        {["reef-fish", "crustaceans", "cephalopods", "pelagic", "dried-seafood"].map(
          (slug) => (
            <a
              key={slug}
              href={`/commodities?category=${slug}`}
              className={`rounded-sm border border-border px-3 py-1 capitalize hover:bg-secondary ${
                params.category === slug ? "bg-secondary" : ""
              }`}
            >
              {slug.replace(/-/g, " ")}
            </a>
          ),
        )}
        {["IQF", "Block Frozen", "Chilled"].map((f) => (
          <a
            key={f}
            href={`/commodities?freezing=${encodeURIComponent(f)}`}
            className={`rounded-sm border border-border px-3 py-1 hover:bg-secondary ${
              params.freezing === f ? "bg-secondary" : ""
            }`}
          >
            {f}
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.12}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
