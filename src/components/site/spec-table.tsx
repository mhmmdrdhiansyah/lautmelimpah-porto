import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@prisma/client";

export function SpecTable({ product }: { product: Product }) {
  const rows: { label: string; value: string }[] = [
    { label: "HS Code", value: product.hsCode ?? "—" },
    { label: "Size / Grading", value: product.sizeGrades },
    { label: "Product Forms", value: product.processingTypes },
    { label: "Freezing", value: product.freezingMethods },
    { label: "Packaging", value: product.packagingSpec },
    { label: "MOQ", value: product.moqSpec },
    {
      label: "Availability",
      value:
        product.availabilityStatus === "SEASONAL" && product.peakMonths
          ? `Seasonal (peak: ${product.peakMonths})`
          : product.availabilityStatus.charAt(0) +
            product.availabilityStatus.slice(1).toLowerCase(),
    },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Specification</TableHead>
          <TableHead>Detail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.label}>
            <TableCell className="font-medium">{r.label}</TableCell>
            <TableCell>{r.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
