const STEPS = [
  {
    title: "Landed & chilled",
    body: "Catch lands in Belitung and goes straight onto ice at certified partner processing units.",
  },
  {
    title: "Certified UPI processing",
    body: "Sorting, grading and packing under HACCP-controlled conditions, sealed with export documentation.",
  },
  {
    title: "Reefer / air freight",
    body: " Reefer container or air cargo carries it to your destination port under the Incoterm you choose.",
  },
];

export function ColdChain() {
  return (
    <section className="mt-10 rounded-md bg-foreground p-8 text-background">
      <h2 className="font-display text-2xl font-semibold">Cold chain</h2>
      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.title}>
            <p className="font-display text-lg">{s.title}</p>
            <p className="mt-1 text-sm text-background/80">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
