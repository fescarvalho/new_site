"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface MarqueeStripProps {
  variant?: "tech" | "values";
}

const techItems = [
  "NEXT.JS",
  "TYPESCRIPT",
  "PYTHON",
  "REACT",
  "SQL",
  "POWER BI",
  "MACHINE LEARNING",
  "ETL PIPELINES",
  "REST APIs",
  "DOCKER",
  "TAILWIND CSS",
  "NODE.JS",
  "PANDAS",
  "POSTGRESQL",
  "DATA VISUALIZATION",
  "GIT",
];

const valueItems = [
  "LÓGICA",
  "PRECISÃO",
  "INOVAÇÃO",
  "PERFORMANCE",
  "ESCALABILIDADE",
  "CLEAN CODE",
  "DATA-DRIVEN",
  "AUTOMAÇÃO",
  "IMPACTO",
  "QUALIDADE",
];

function ScrollRow({
  items,
  separator,
  reverse = false,
}: {
  items: string[];
  separator: string;
  reverse?: boolean;
}) {
  // Use 4 copies to ensure it's wide enough for any screen, and shift by 50% (2 copies) for a seamless loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <motion.div
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        duration: reverse ? 45 : 35, // Adjust duration for scrolling speed
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex shrink-0 whitespace-nowrap w-max"
    >
      {repeated.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="px-4 md:px-6 text-sm md:text-base font-medium tracking-wide text-gray-600 hover:text-white transition-colors duration-300 cursor-default">
            {item}
          </span>
          <span className="text-cyber/20 text-xs">{separator}</span>
        </span>
      ))}
    </motion.div>
  );
}

export default function MarqueeStrip({ variant = "tech" }: MarqueeStripProps) {
  const primary = variant === "tech" ? techItems : valueItems;
  const secondary = variant === "tech" ? valueItems : techItems;

  return (
    <div className="relative py-8 md:py-12 overflow-hidden border-y border-white/[0.03]">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#050505] to-transparent" />

      <div className="flex flex-col gap-4 overflow-hidden">
        <ScrollRow items={primary} separator="◆" />
        <ScrollRow items={secondary} separator="●" reverse />
      </div>
    </div>
  );
}
