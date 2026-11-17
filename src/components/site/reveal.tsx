"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// One-shot entrance reveal for a section. The server renders the content
// fully visible; the hidden state is applied after hydration (in an effect,
// never during render), so there is no SSR/CSR style mismatch. Reduced
// motion: content stays visible, only a short opacity fade remains.
export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      reduce ||
      typeof IntersectionObserver === "undefined" ||
      // Already scrolled into view (or restored mid-page): no reveal needed.
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.disconnect();
          }
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
