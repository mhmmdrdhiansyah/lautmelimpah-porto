import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SpecTable } from "@/components/site/spec-table";
import { AddToInquiryButton } from "@/components/site/add-to-inquiry-button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-secondary">
          <Image
            src={product.imageUrl}
            alt={product.nameEn}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <Badge>{product.category.nameEn}</Badge>
          <h1 className="mt-3 font-display text-3xl font-semibold">
            {product.nameEn}
          </h1>
          <p className="mt-1 italic text-muted-foreground">{product.latinName}</p>
          <p className="mt-4 text-sm leading-relaxed">{product.descriptionEn}</p>
          <div className="mt-4 flex items-center gap-3">
            <Badge variant="outline">Price upon request</Badge>
            <span className="text-sm text-muted-foreground">
              Origin: {product.originArea}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToInquiryButton product={{ id: product.id, name: product.nameEn }} />
            <Link
              href="/inquiry"
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              Request a quotation
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-md border border-border bg-card p-4">
        <h2 className="font-display text-xl font-semibold">Specifications</h2>
        <div className="mt-2 md:w-6/6">
          <SpecTable product={product} />
        </div>
      </div>
    </div>
  );
}
