import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/site/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { id: "asc" },
    take: 3,
  });

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h1 className="font-display text-5xl font-semibold">
          Belitung seafood exporter
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          For international buyers: six commodities from Belitung Island,
          Indonesia. Prices on request.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="accent">
            <Link href="/inquiry">Request a quotation</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/commodities">See the commodities</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-display text-2xl font-semibold">
          Featured commodities
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
