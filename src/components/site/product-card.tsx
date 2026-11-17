import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Product, Category } from "@prisma/client";
import { AddToInquiryButton } from "./add-to-inquiry-button";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="relative aspect-[4/3] bg-secondary">
        <Image
          src={product.imageUrl}
          alt={product.nameEn}
          fill
          className="object-cover"
        />
        <Badge className="absolute left-3 top-3">{product.category.nameEn}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold">{product.nameEn}</h3>
        <p className="text-sm italic text-muted-foreground">{product.latinName}</p>
        <Badge variant="outline" className="w-fit">
          Price upon request
        </Badge>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <AddToInquiryButton product={{ id: product.id, name: product.nameEn }} />
          <Link
            href={`/commodities/${product.slug}`}
            className="text-sm underline underline-offset-4 hover:text-muted-foreground"
          >
            View specifications
          </Link>
        </div>
      </div>
    </div>
  );
}
