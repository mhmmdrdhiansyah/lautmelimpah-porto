import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "LautMelimpah — Belitung Seafood Exporter",
  description:
    "B2B seafood export and sourcing from Belitung Island, Indonesia. Six commodities, certified cold chain. Prices on request.",
  openGraph: {
    title: "LautMelimpah — Belitung Seafood Exporter",
    description:
      "Six commodities from Belitung Island, Indonesia. Certified cold chain. Prices on request.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400..700&family=Libre+Franklin:wght@400..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
