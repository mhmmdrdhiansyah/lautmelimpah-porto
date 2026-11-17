import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const ROUTES = {
  sea: [
    {
      port: "Tanjung Priok, Jakarta (IDJKT)",
      incoterm: "FOB Jakarta",
      use: "Feeder reefer from Belitung, then direct vessels to the US, Europe, Japan, China and the Middle East.",
    },
    {
      port: "Tanjung Pandan, Belitung (IDTJQ)",
      incoterm: "FOB Belitung",
      use: "Direct regional feeder for Singapore and Malaysia, short transit.",
    },
    {
      port: "Your destination port",
      incoterm: "CIF / CNF",
      use: "We carry cost (and insurance) through to the port of destination.",
    },
  ],
  air: [
    {
      port: "H.A.S. Hanandjoeddin (TJQ) to Soekarno-Hatta (CGK)",
      incoterm: "FOB Jakarta (air)",
      use: "Domestic air cargo hop from Belitung to the international hub.",
    },
    {
      port: "CGK onward to destination",
      incoterm: "FOB / CIF (air)",
      use: "Hong Kong, Singapore, Taiwan, Japan and the Middle East within 24-36 hours.",
    },
  ],
};

export default function LogisticsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">Export logistics</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Sea reefer containers in 20ft and 40ft, or air cargo for live and
        chilled premium products.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Sea freight</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Incoterm</TableHead>
                  <TableHead>Typical use</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROUTES.sea.map((r) => (
                  <TableRow key={r.port}>
                    <TableCell className="font-medium">{r.port}</TableCell>
                    <TableCell>{r.incoterm}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.use}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </Reveal>

        <Reveal delay={0.15}>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Air freight</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Incoterm</TableHead>
                  <TableHead>Typical use</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROUTES.air.map((r) => (
                  <TableRow key={r.port}>
                    <TableCell className="font-medium">{r.port}</TableCell>
                    <TableCell>{r.incoterm}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.use}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </Reveal>
      </div>

      <div className="mt-10">
        <Button asChild variant="accent">
          <Link href="/inquiry">Request a quotation</Link>
        </Button>
      </div>
    </div>
  );
}
