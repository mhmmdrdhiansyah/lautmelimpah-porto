import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const leads = await prisma.inquiry.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Leads by status</h2>
      <div className="mt-4 flex flex-wrap gap-4">
        {leads.map((l) => (
          <div
            key={l.status}
            className="rounded-md border border-border bg-card p-4"
          >
            <p className="text-3xl font-semibold">{l._count._all}</p>
            <p className="text-sm text-muted-foreground">{l.status}</p>
          </div>
        ))}
        {leads.length === 0 && (
          <p className="text-sm text-muted-foreground">No leads yet.</p>
        )}
      </div>
    </div>
  );
}
