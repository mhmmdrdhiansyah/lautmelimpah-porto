"use client";

import Link from "next/link";

type Card = {
  src?: string;
  alt?: string;
  label: string;
  href: string;
};

const ROW_ONE: Card[] = [
  { src: "/img/commodity_coral_tiger_grouper.jpg", alt: "Coral and tiger grouper", label: "Coral & Tiger Grouper", href: "/commodities" },
  { src: "/img/commodity_blue_swimming_crab.jpg", alt: "Blue swimming crab", label: "Blue Swimming Crab", href: "/commodities" },
  { src: "/img/commodity_squid_cuttlefish.jpg", alt: "Squid and cuttlefish", label: "Squid & Cuttlefish", href: "/commodities" },
  { src: "/img/commodity_spanish_mackerel.jpg", alt: "Spanish mackerel", label: "Spanish Mackerel", href: "/commodities" },
  { src: "/img/commodity_red_snapper_emperor.jpg", alt: "Red snapper and emperor fish", label: "Red Snapper & Emperor", href: "/commodities" },
];

const ROW_TWO: Card[] = [
  { src: "/img/commodity_dried_sea_cucumber.jpg", alt: "Dried sea cucumber", label: "Dried Sea Cucumber", href: "/commodities" },
  { src: "/img/processing_upi_cleanroom.jpg", alt: "Certified processing cleanroom", label: "HACCP / SKP / HC processing", href: "/quality-legality" },
  { src: "/img/logistics_40ft_reefer_container.jpg", alt: "40ft reefer container", label: "Reefer containers, MOQ from 1", href: "/logistics" },
  { src: "/img/logistics_port_tanjung_pandan.jpg", alt: "Port of Tanjung Pandan", label: "Ports Tanjung Priok & Tanjung Pandan", href: "/logistics" },
  { src: "/img/provenance_fishermen_dock.jpg", alt: "Fishing boats at a Belitung dock", label: "Origin: Belitung Island", href: "/commodities" },
];

function MarqueeRow({ cards, reverse }: { cards: Card[]; reverse?: boolean }) {
  // List rendered twice; CSS keyframes translate one copy, so it loops seamlessly.
  const list = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 gap-4 pr-4"
    >
      {cards.map((card, i) => (
        <li key={i}>
          <Link
            href={card.href}
            tabIndex={hidden ? -1 : undefined}
            className="group relative block h-40 w-60 overflow-hidden rounded-md border border-white/15 md:h-48 md:w-72"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.src}
              alt={hidden ? "" : card.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-white">
              {card.label}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {list(false)}
      {list(true)}
      <style jsx>{`
        .marquee > ul:first-child {
          animation: marquee 40s linear infinite;
          animation-direction: ${reverse ? "reverse" : "normal"};
        }
        .marquee:hover > ul:first-child {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee > ul:first-child {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export function HeroCards() {
  return (
    <div className="relative z-10 flex flex-col gap-4 py-10">
      <MarqueeRow cards={ROW_ONE} />
      <MarqueeRow cards={ROW_TWO} reverse />
    </div>
  );
}
