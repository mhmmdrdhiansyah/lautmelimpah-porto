import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateLeadStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "QUOTED", "NEGOTIATING", "CLOSED_WON", "CLOSED_LOST"];

export default async function AdminLeadsPage() {
  const leads = await prisma.inquiry.findMany({
    orderBy: { id: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Leads</h2>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Incoterm / mode</TableHead>
            <TableHead className="w-40">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-mono text-sm">{lead.inquiryCode}</TableCell>
              <TableCell>
                <p className="font-medium">{lead.buyerName}</p>
                <p className="text-sm text-muted-foreground">
                  {lead.companyName}, {lead.country}
                </p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </TableCell>
              <TableCell className="text-sm">
                {lead.items.map((i) => (
                  <p key={i.id}>
                    {i.product.nameEn} — {i.estimatedQuantity}
                  </p>
                ))}
              </TableCell>
              <TableCell className="text-sm">
                {lead.preferredIncoterm} / {lead.shippingMode}
              </TableCell>
              <TableCell>
                <form
                  action={async (formData: FormData) => {
                    "use server";
                    await updateLeadStatus(
                      lead.id,
                      String(formData.get("status")),
                    );
                  }}
                >
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="rounded-sm border border-input px-2 py-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="ml-2 text-sm underline underline-offset-4"
                  >
                    Save
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {leads.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">No leads yet.</p>
      )}
    </div>
  );
}
