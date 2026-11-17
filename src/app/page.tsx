import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/site/product-card";
import { Bubbles } from "@/components/site/bubbles";
import { Reveal } from "@/components/site/reveal";

export const dynamic = "force-dynamic";

const HERO_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Coral_Outcrop_Flynn_Reef.jpg?width=1600";
const BELITUNG_IMG =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Tanjung_Tinggi_Beach.jpg?width=1600";

const FACTS = [
  "Origin Belitung Island",
  "Export ports Tanjung Priok & Tanjung Pandan",
  "Compliance HACCP / SKP / HC",
  "MOQ from 1 reefer container",
];

export default async function Home() {
  const featured = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { id: "asc" },
    take: 3,
  });

  return (
    <div>
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt="Coral reef in the clear waters around Belitung"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <Bubbles />
        <div className="relative m-6 max-w-xl rounded-md bg-foreground p-8 text-background">
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Belitung seafood exporter
          </h1>
          <p className="mt-4 text-white/90">
            For international buyers: six commodities from Belitung Island,
            Indonesia. Prices on request.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/inquiry"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Request a quotation
            </Link>
            <Link
              href="/commodities"
              className="rounded-md border border-white/60 px-5 py-2.5 text-sm text-white hover:bg-white/10"
            >
              See the commodities
            </Link>
          </div>
        </div>
        <div className="relative bg-black/50 px-6 py-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/90">
            {FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BELITUNG_IMG}
            alt="Tanjung Tinggi beach, Belitung Island"
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
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Container-Terminal_Bremerhaven_02.jpg?width=1600"
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
