"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COUNT = 12;

export function Bubbles() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [seeds, setSeeds] = useState<
    { left: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setSeeds(
      Array.from({ length: COUNT }, () => ({
        left: Math.random() * 100,
        size: 6 + Math.random() * 18,
        duration: 9 + Math.random() * 5,
        delay: Math.random() * 6,
      })),
    );
  }, []);

  return (
    <div aria-hidden={true} className="pointer-events-none absolute inset-0 overflow-hidden">
      {reduce ? null : seeds.map((s, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full border border-white/60 bg-white/20"
          style={{ left: `${s.left}%`, width: s.size, height: s.size }}
          initial={{ y: "110vh" }}
          animate={paused ? undefined : { y: "-10vh" }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="pointer-events-auto absolute bottom-4 right-4 rounded-sm border border-white/60 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur hover:bg-black/60"
      >
        {paused ? "Play bubbles" : "Pause bubbles"}
      </button>
    </div>
  );
}
