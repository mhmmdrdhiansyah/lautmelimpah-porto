import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category, Product } from "@prisma/client";
import { deleteProduct, toggleFeatured } from "../actions";
import { ProductForm } from "./product-form";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products: (Product & { category: Category })[] =
    await prisma.product.findMany({ include: { category: true }, orderBy: { id: "asc" } });
  const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Products</h2>
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
              New product
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New product</DialogTitle>
            </DialogHeader>
            <ProductForm categories={categories} />
          </DialogContent>
        </Dialog>
      </div>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.nameEn}</TableCell>
              <TableCell>{p.category.nameEn}</TableCell>
              <TableCell>{p.availabilityStatus}</TableCell>
              <TableCell>
                <form
                  action={async () => {
                    "use server";
                    await toggleFeatured(p.id, !p.isFeatured);
                  }}
                >
                  <button className="underline underline-offset-4 text-sm">
                    {p.isFeatured ? "Yes" : "No"}
                  </button>
                </form>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-sm underline underline-offset-4">Edit</button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit {p.nameEn}</DialogTitle>
                      </DialogHeader>
                      <ProductForm categories={categories} product={p} />
                    </DialogContent>
                  </Dialog>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProduct(p.id);
                    }}
                  >
                    <button className="text-sm text-destructive underline underline-offset-4">
                      Delete
                    </button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
