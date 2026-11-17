import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { ColdChain } from "@/components/site/cold-chain";
import { Reveal } from "@/components/site/reveal";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  COMPANY_LEGALITY: "Company legality",
  FOOD_SAFETY: "Food safety",
  EXPORT_CERTIFICATE: "Export certificate",
};

export default async function QualityLegalityPage() {
  const documents = await prisma.complianceDocument.findMany({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });

  const groups = ["COMPANY_LEGALITY", "FOOD_SAFETY", "EXPORT_CERTIFICATE"] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">
        Quality &amp; legality
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Every document below is part of the standard export file for each
        shipment.
      </p>

      <ColdChain />

      {groups.map((type) => {
        const docs = documents.filter((d) => d.documentType === type);
        if (docs.length === 0) return null;
        return (
          <section key={type} className="mt-10">
            <h2 className="font-display text-2xl font-semibold">
              {TYPE_LABEL[type]}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {docs.map((d, di) => (
                <Reveal key={d.id} delay={(di % 3) * 0.12}>
                <div className="rounded-md border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium leading-snug">{d.titleEn}</h3>
                    <Badge variant="outline" className="shrink-0">
                      {TYPE_LABEL[d.documentType]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{d.issuer}</p>
                  <p className="mt-3 text-sm leading-relaxed">
                    {d.descriptionEn}
                  </p>
                  {d.badgeIconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={d.badgeIconUrl}
                      alt={`${d.titleEn} certificate`}
                      className="mt-3 w-full rounded-sm border border-border object-cover"
                    />
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    {d.registrationNumber ?? "Registered"}
                  </p>
                </div>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
