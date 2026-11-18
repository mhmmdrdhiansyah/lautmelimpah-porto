"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InquiryDrawer } from "./inquiry-drawer";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the home page the navbar stays hidden until the visitor scrolls past
  // the full-screen CommodityStrip hero, then slides in.
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (isHome) {
    return (
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-border bg-background transition-transform duration-300 ${
          pastHero ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavbarContent />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <NavbarContent />
    </header>
  );
}

function NavbarContent() {
  return (
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3">
      <Link href="/" className="flex items-center text-foreground">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-dark.svg" alt="LautMelimpah" className="h-9 w-auto" />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-6 text-sm md:flex">
        <Link href="/commodities" className="hover:underline">
          Commodities
        </Link>
        <Link href="/quality-legality" className="hover:underline">
          Quality &amp; Legality
        </Link>
        <Link href="/logistics" className="hover:underline">
          Logistics
        </Link>
      </nav>

      <div className="flex items-center gap-1.5">
        <span className="hidden sm:block">
          <InquiryDrawer
            trigger={
              <button
                type="button"
                className="rounded-sm border border-border px-2 py-1.5 text-sm hover:bg-secondary"
              >
                Inquiry
              </button>
            }
          />
        </span>
        <Button
          asChild
          variant="accent"
          className="px-2.5 text-xs sm:px-4 sm:text-sm"
        >
          <Link href="/inquiry">Request a quotation</Link>
        </Button>
      </div>
    </div>
  );
}
