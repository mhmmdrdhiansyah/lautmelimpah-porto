import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-light.svg" alt="LautMelimpah" className="h-12 w-auto" />
          <p className="mt-2 text-sm opacity-80">
            Seafood export trading and sourcing partner, Tanjung Pandan, Belitung,
            Indonesia.
          </p>
        </div>
        <nav aria-label="Site" className="text-sm">
          <p className="font-semibold">Site</p>
          <ul className="mt-2 space-y-1 opacity-90">
            <li><Link href="/commodities" className="hover:underline">Commodities</Link></li>
            <li><Link href="/quality-legality" className="hover:underline">Quality &amp; Legality</Link></li>
            <li><Link href="/logistics" className="hover:underline">Logistics</Link></li>
            <li><Link href="/inquiry" className="hover:underline">Request a quotation</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="font-semibold">Contact</p>
          <p className="mt-2 opacity-90">sales@lautmelimpah.example</p>
          <p className="opacity-90">Tanjung Pandan, Belitung, Indonesia</p>
        </div>
      </div>
      <div className="border-t border-background/20 py-4 text-center text-xs opacity-70">
        © 2026 LautMelimpah
      </div>
    </footer>
  );
}
