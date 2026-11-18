"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InquiryDrawer } from "./inquiry-drawer";

export function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
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
    </header>
  );
}
