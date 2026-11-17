"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useInquiryStore } from "@/lib/inquiry-store";

export function AddToInquiryButton({
  product,
}: {
  product: { id: number; name: string };
}) {
  const add = useInquiryStore((s) => s.add);
  return (
    <Button
      variant="accent"
      onClick={() => {
        add(product.id, product.name);
        toast("Added to inquiry list");
      }}
    >
      Add to Inquiry List
    </Button>
  );
}
