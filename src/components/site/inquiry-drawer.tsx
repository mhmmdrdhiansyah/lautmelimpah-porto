"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useInquiryStore } from "@/lib/inquiry-store";

export function InquiryDrawer({ trigger }: { trigger: React.ReactNode }) {
  const items = useInquiryStore((s) => s.items);
  const remove = useInquiryStore((s) => s.remove);

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="left-auto right-0 mt-0 h-full w-[360px] rounded-none">
        <DrawerHeader>
          <DrawerTitle>Inquiry list</DrawerTitle>
          <DrawerDescription>Products you want to quote.</DrawerDescription>
        </DrawerHeader>
        {items.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">
            Your inquiry list is empty.
          </p>
        ) : (
          <ul className="flex-1 space-y-2 px-4">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between gap-2 rounded-sm border border-border p-2 text-sm"
              >
                <span>{item.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => remove(item.productId)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="p-4">
          <Button asChild variant="accent" className="w-full">
            <Link href="/inquiry">Request a quotation</Link>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
