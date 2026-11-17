import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LautMelimpah — Belitung Seafood Exporter",
  description:
    "B2B seafood export and sourcing from Belitung Island, Indonesia. Six commodities, certified cold chain. Prices on request.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400..700&family=Libre+Franklin:wght@400..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
