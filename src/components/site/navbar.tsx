"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InquiryDrawer } from "./inquiry-drawer";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" />
            <rect x="4" y="10" width="10" height="4" rx="1" fill="currentColor" />
            <rect x="4" y="16" width="6" height="4" rx="1" fill="currentColor" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight">
            LautMelimpah
          </span>
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

        <div className="flex items-center gap-2">
          <InquiryDrawer
            trigger={
              <button
                type="button"
                className="rounded-sm border border-border px-3 py-1.5 text-sm hover:bg-secondary"
              >
                Inquiry
              </button>
            }
          />
          <Button asChild variant="accent">
            <Link href="/inquiry">Request a quotation</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
