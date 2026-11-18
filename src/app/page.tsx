import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { CommodityStrip } from "@/components/site/commodity-strip";

export const dynamic = "force-dynamic";

const BELITUNG_IMG = "/img/provenance_fishermen_dock.jpg";

export default async function Home() {
  const featured = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { id: "asc" },
    take: 3,
  });

  return (
    <div>
      <CommodityStrip />

      <Reveal>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BELITUNG_IMG}
            alt="Fishing boats at a Belitung dock"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl font-semibold">
            One source: Belitung waters
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Reef fish, crustaceans, cephalopods, pelagic and dried seafood,
            aggregated from Belitung fishermen and certified processing
            partners — handled, chilled and documented for export.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Coral &amp; Tiger Grouper</li>
            <li>Blue Swimming Crab</li>
            <li>Squid &amp; Cuttlefish</li>
            <li>Spanish Mackerel</li>
            <li>Red Snapper &amp; Emperor Fish</li>
            <li>Dried Sea Cucumber</li>
          </ul>
          <Link
            href="/commodities"
            className="mt-6 text-sm underline underline-offset-4"
          >
            See the commodities
          </Link>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="font-display text-2xl font-semibold">
            Featured commodities
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.12}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-foreground px-4 py-16 text-background">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/facility_certified_cold_storage_upi.jpg"
              alt="Reefer containers at a container terminal"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl font-semibold">Cold chain</h2>
            <ol className="mt-6 space-y-6">
              <li>
                <p className="font-display text-lg">Landed &amp; chilled</p>
                <p className="mt-1 text-sm text-background/80">
                  Catch lands in Belitung and goes straight onto ice at
                  certified partner processing units.
                </p>
              </li>
              <li>
                <p className="font-display text-lg">Reefer to your port</p>
                <p className="mt-1 text-sm text-background/80">
                  Sealed under export documentation and shipped reefer or air
                  cargo to your destination port.
                </p>
              </li>
            </ol>
            <div className="mt-8">
              <Link
                href="/inquiry"
                className="inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
              >
                Request a quotation
              </Link>
            </div>
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="font-display text-4xl font-semibold">
            Request a quotation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Build your inquiry list and receive a quotation by email — prices
            follow your specifications, volumes and Incoterms.
          </p>
          <Link
            href="/inquiry"
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Request a quotation
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
