"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A complex geometric SVG with concentric rings, orbital arcs, data-node dots,
 * and intersecting polygonal lines — all driven by scroll position.
 */
export default function ScrollSVG() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── Derived transforms ── */
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.3, 0.5, 0.1]);
  const pathLen1 = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const pathLen2 = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const pathLen3 = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const dashOffset = useTransform(scrollYProgress, [0, 1], [600, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div style={{ scale, opacity }}>
          <motion.svg
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[min(90vw,700px)] h-[min(90vw,700px)]"
          >
            {/* ────────── Outer ring ────────── */}
            <motion.g style={{ rotate: rotate1 }} className="origin-center">
              <circle
                cx="400"
                cy="400"
                r="350"
                stroke="#1a1a1a"
                strokeWidth="0.5"
              />
              <motion.circle
                cx="400"
                cy="400"
                r="350"
                stroke="#00d4ff"
                strokeWidth="0.8"
                strokeDasharray="8 20"
                style={{ pathLength: pathLen1 }}
                strokeLinecap="round"
              />
              {/* Orbital dots on outer ring */}
              {[0, 60, 120, 180, 240, 300].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <circle
                    key={`outer-dot-${angle}`}
                    cx={400 + 350 * Math.cos(rad)}
                    cy={400 + 350 * Math.sin(rad)}
                    r="2.5"
                    fill="#00d4ff"
                    opacity="0.4"
                  />
                );
              })}
            </motion.g>

            {/* ────────── Middle ring ────────── */}
            <motion.g style={{ rotate: rotate2 }} className="origin-center">
              <circle
                cx="400"
                cy="400"
                r="250"
                stroke="#111"
                strokeWidth="0.5"
              />
              <motion.circle
                cx="400"
                cy="400"
                r="250"
                stroke="#a855f7"
                strokeWidth="0.6"
                strokeDasharray="4 16"
                style={{ pathLength: pathLen2 }}
                strokeLinecap="round"
              />
              {/* Arc segment */}
              <motion.path
                d="M 400 150 A 250 250 0 0 1 650 400"
                stroke="#a855f7"
                strokeWidth="1"
                style={{ pathLength: pathLen2 }}
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Orbital dots */}
              {[30, 90, 150, 210, 270, 330].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <circle
                    key={`mid-dot-${angle}`}
                    cx={400 + 250 * Math.cos(rad)}
                    cy={400 + 250 * Math.sin(rad)}
                    r="2"
                    fill="#a855f7"
                    opacity="0.35"
                  />
                );
              })}
            </motion.g>

            {/* ────────── Inner ring ────────── */}
            <motion.g style={{ rotate: rotate3 }} className="origin-center">
              <circle
                cx="400"
                cy="400"
                r="140"
                stroke="#1a1a1a"
                strokeWidth="0.5"
              />
              <motion.circle
                cx="400"
                cy="400"
                r="140"
                stroke="#00d4ff"
                strokeWidth="0.5"
                strokeDasharray="2 12"
                style={{ pathLength: pathLen3 }}
                strokeLinecap="round"
              />
            </motion.g>

            {/* ────────── Hexagonal geometry ────────── */}
            <motion.g style={{ rotate: rotate1 }} className="origin-center">
              <motion.polygon
                points="400,300 487,350 487,450 400,500 313,450 313,350"
                stroke="#ffffff"
                strokeWidth="0.4"
                fill="none"
                style={{ pathLength: pathLen1 }}
                opacity="0.15"
              />
              <motion.polygon
                points="400,270 470,320 470,480 400,530 330,480 330,320"
                stroke="#00d4ff"
                strokeWidth="0.3"
                fill="none"
                style={{ pathLength: pathLen2 }}
                opacity="0.1"
              />
            </motion.g>

            {/* ────────── Cross-hairs ────────── */}
            <motion.line
              x1="400"
              y1="50"
              x2="400"
              y2="750"
              stroke="#111"
              strokeWidth="0.3"
              style={{ pathLength: pathLen1 }}
            />
            <motion.line
              x1="50"
              y1="400"
              x2="750"
              y2="400"
              stroke="#111"
              strokeWidth="0.3"
              style={{ pathLength: pathLen1 }}
            />

            {/* ────────── Diagonal data-lines ────────── */}
            <motion.line
              x1="150"
              y1="150"
              x2="650"
              y2="650"
              stroke="#00d4ff"
              strokeWidth="0.3"
              style={{ pathLength: pathLen3 }}
              opacity="0.15"
            />
            <motion.line
              x1="650"
              y1="150"
              x2="150"
              y2="650"
              stroke="#a855f7"
              strokeWidth="0.3"
              style={{ pathLength: pathLen3 }}
              opacity="0.15"
            />

            {/* ────────── Pulsing center ────────── */}
            <circle cx="400" cy="400" r="4" fill="#00d4ff" opacity="0.6" />
            <circle cx="400" cy="400" r="8" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" />

            {/* ────────── Data ticks on outer ring ────────── */}
            <motion.g style={{ rotate: rotate2 }} className="origin-center">
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 10 * Math.PI) / 180;
                const inner = 340;
                const outer = i % 3 === 0 ? 360 : 348;
                return (
                  <line
                    key={`tick-${i}`}
                    x1={400 + inner * Math.cos(angle)}
                    y1={400 + inner * Math.sin(angle)}
                    x2={400 + outer * Math.cos(angle)}
                    y2={400 + outer * Math.sin(angle)}
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                );
              })}
            </motion.g>

            {/* ────────── Sweeping dashed arc ────────── */}
            <motion.g style={{ rotate: rotate3 }} className="origin-center">
              <motion.path
                d="M 400 100 A 300 300 0 0 1 700 400"
                stroke="#00d4ff"
                strokeWidth="0.6"
                strokeDasharray="3 9"
                fill="none"
                style={{
                  strokeDashoffset: dashOffset,
                }}
                opacity="0.25"
              />
              <motion.path
                d="M 400 700 A 300 300 0 0 1 100 400"
                stroke="#a855f7"
                strokeWidth="0.6"
                strokeDasharray="3 9"
                fill="none"
                style={{
                  strokeDashoffset: dashOffset,
                }}
                opacity="0.2"
              />
            </motion.g>
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}
