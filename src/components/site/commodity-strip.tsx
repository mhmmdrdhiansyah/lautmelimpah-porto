"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Sparkle } from "lucide-react";
import { InquiryDrawer } from "./inquiry-drawer";

const IMAGES = [
  { src: "/img/commodity_coral_tiger_grouper.jpg", alt: "Coral and tiger grouper" },
  { src: "/img/commodity_blue_swimming_crab.jpg", alt: "Blue swimming crab" },
  { src: "/img/commodity_squid_cuttlefish.jpg", alt: "Squid and cuttlefish" },
  { src: "/img/commodity_spanish_mackerel.jpg", alt: "Spanish mackerel" },
  { src: "/img/commodity_red_snapper_emperor.jpg", alt: "Red snapper and emperor fish" },
  { src: "/img/commodity_dried_sea_cucumber.jpg", alt: "Dried sea cucumber" },
  { src: "/img/provenance_fishermen_dock.jpg", alt: "Fishing boats at a Belitung dock" },
  { src: "/img/processing_upi_cleanroom.jpg", alt: "Certified processing cleanroom" },
  { src: "/img/logistics_40ft_reefer_container.jpg", alt: "40ft reefer container" },
];

const HEADLINE =
  "Six commodity groups from Belitung Island, Indonesia — landed, chilled, documented and shipped to your port.";

const NAV_LINKS = [
  { label: "Commodities", href: "/commodities" },
  { label: "Quality & Legality", href: "/quality-legality" },
  { label: "Logistics", href: "/logistics" },
];

const WORDS = HEADLINE.split(" ");

// One set = 9 cards x (260px + 16px gap) = 2484px; the array is doubled, so
// x: [0, -2484] wraps seamlessly.
const MARQUEE_OFFSET = -2484;

// Frosted pill shared by nav links and the Inquiry trigger.
const PILL_CLASSES =
  "rounded-full border border-white/30 bg-white/10 px-[24px] py-[12px] text-[14px] font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20";

export function CommodityStrip() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start 0.85", "end 0.2"],
  });

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pb-[100px] pt-[100px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/hero_bg.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Slight lift so the dark photo does not swallow the text; keeps ≥4.5:1 with white */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D2A1C]/20 via-transparent to-[#0D2A1C]/50" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <div className="mb-8 flex items-center gap-1.5">
          <div className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <motion.div
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={reducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkle size={18} className="fill-[#F6E016] text-[#F6E016]" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-[12px] py-[12px] backdrop-blur-sm">
            <span className="whitespace-nowrap px-3 text-[16px] font-medium text-white">
              What we export
            </span>
          </div>
        </div>

        <h2
          ref={headlineRef}
          className="mb-8 flex max-w-[690px] flex-wrap justify-center px-4 text-center font-display text-[27px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[36px] md:mb-[48px] md:px-0 md:text-[45px]"
        >
          {WORDS.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / WORDS.length, i / WORDS.length + 1 / WORDS.length]}>
              {word}
            </Word>
          ))}
        </h2>

        <div className="mb-10 flex flex-wrap justify-center gap-2 md:mb-[80px]">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={PILL_CLASSES}>
              {link.label}
            </Link>
          ))}
          <InquiryDrawer
            trigger={
              <button type="button" className={`cursor-pointer ${PILL_CLASSES}`}>
                Inquiry
              </button>
            }
          />
          <Link
            href="/inquiry"
            className="rounded-full bg-[#F6E016] px-[24px] py-[12px] text-[14px] font-bold text-[#0D2A1C] transition-all hover:bg-white"
          >
            Request a quotation
          </Link>
        </div>
      </div>

      <div className="relative w-full">
        <motion.div
          className="flex w-max select-none gap-[16px]"
          animate={reducedMotion ? undefined : { x: [0, MARQUEE_OFFSET] }}
          transition={reducedMotion ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...IMAGES, ...IMAGES].map((image, i) => (
            <div
              key={i}
              className={`w-[260px] flex-shrink-0 overflow-hidden rounded-[32px] shadow-lg ring-1 ring-white/20 ${
                i % 3 === 0
                  ? "mt-10 h-[240px] self-start"
                  : i % 3 === 1
                    ? "h-[320px] self-center"
                    : "mb-10 h-[280px] self-end"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-all duration-700 hover:scale-110"
                referrerPolicy="no-referrer"
                loading={i < IMAGES.length ? "eager" : "lazy"}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ["#9DB3A8", "#F7F7F7"]);
  return (
    <span className="mr-3 inline-block lg:mr-4">
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  );
}
