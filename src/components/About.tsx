"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Briefcase, Cpu, TrendingUp } from "lucide-react";

/* ── Animated HUD SVG background ── */
function HudSVG() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const pathLen = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const pathLen2 = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 1, 1.1]);
  const svgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.4, 0.4, 0]);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div style={{ scale, opacity: svgOpacity }}>
        <motion.svg
          viewBox="0 0 600 600"
          fill="none"
          className="w-[min(100vw,600px)] h-[min(100vw,600px)]"
        >
          {/* Outer octagon */}
          <motion.g style={{ rotate }} className="origin-center">
            <motion.polygon
              points="300,40 460,120 520,280 460,440 300,520 140,440 80,280 140,120"
              stroke="#00d4ff"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: pathLen }}
              strokeLinecap="round"
            />
            {/* Corner dots */}
            {[
              [300, 40], [460, 120], [520, 280], [460, 440],
              [300, 520], [140, 440], [80, 280], [140, 120],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#00d4ff" opacity="0.5" />
            ))}
          </motion.g>

          {/* Inner diamond */}
          <motion.g style={{ rotate: rotateReverse }} className="origin-center">
            <motion.polygon
              points="300,150 420,300 300,450 180,300"
              stroke="#a855f7"
              strokeWidth="0.4"
              fill="none"
              style={{ pathLength: pathLen2 }}
              strokeLinecap="round"
            />
            <motion.polygon
              points="300,180 400,300 300,420 200,300"
              stroke="#a855f7"
              strokeWidth="0.3"
              fill="none"
              style={{ pathLength: pathLen2 }}
              strokeLinecap="round"
              opacity="0.4"
            />
          </motion.g>

          {/* Scan lines */}
          <motion.g style={{ rotate }} className="origin-center">
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              return (
                <motion.line
                  key={`scan-${i}`}
                  x1={300 + 60 * Math.cos(angle)}
                  y1={300 + 60 * Math.sin(angle)}
                  x2={300 + 260 * Math.cos(angle)}
                  y2={300 + 260 * Math.sin(angle)}
                  stroke="#1a1a1a"
                  strokeWidth="0.3"
                  style={{ pathLength: pathLen }}
                />
              );
            })}
          </motion.g>

          {/* Center ring */}
          <motion.circle
            cx="300" cy="300" r="40"
            stroke="#00d4ff" strokeWidth="0.5"
            fill="none"
            style={{ pathLength: pathLen }}
            strokeDasharray="3 8"
          />
          <circle cx="300" cy="300" r="3" fill="#00d4ff" opacity="0.8" />

          {/* Data arc segments */}
          <motion.g style={{ rotate: rotateReverse }} className="origin-center">
            <motion.path
              d="M 300 80 A 220 220 0 0 1 520 300"
              stroke="#00d4ff"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="4 12"
              style={{ pathLength: pathLen }}
              opacity="0.3"
            />
            <motion.path
              d="M 300 520 A 220 220 0 0 1 80 300"
              stroke="#a855f7"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="4 12"
              style={{ pathLength: pathLen2 }}
              opacity="0.25"
            />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* ── Stat counter card ── */
function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 border border-white/[0.04] rounded-lg bg-white/[0.02] group
                 hover:border-cyber/20 transition-colors duration-500"
    >
      <span className="block text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-mono)]">
        {value}
      </span>
      <span className="block mt-2 text-xs text-gray-500 tracking-wider uppercase">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyber to-transparent group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

/* ── Scroll-driven Timeline item (Appears sequentially) ── */
function TimelineItem({
  icon: Icon,
  title,
  subtitle,
  description,
  index,
  total,
  containerProgress,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  index: number;
  total: number;
  containerProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Timeline items reveal sequentially between 15% and 85% of the container scroll
  const timelineStart = 0.15;
  const timelineEnd = 0.85;
  const timelineRange = timelineEnd - timelineStart;
  const sliceSize = timelineRange / total;
  const start = timelineStart + index * sliceSize;
  const end = start + sliceSize * 0.7;

  const opacity = useTransform(containerProgress, [start, end, 1], [0, 1, 1], { clamp: true });
  const y = useTransform(containerProgress, [start, end, 1], [20, 0, 0], { clamp: true });
  const x = useTransform(
    containerProgress,
    [start, end, 1],
    [index % 2 === 0 ? -10 : 10, 0, 0],
    { clamp: true }
  );

  const lineStart = end;
  const lineEnd = Math.min(start + sliceSize, 1);
  const lineScale = useTransform(containerProgress, [lineStart, lineEnd, 1], [0, 1, 1], { clamp: true });

  const nodeGlow = useTransform(containerProgress, [start, end, 1], [0, 1, 1], { clamp: true });
  const nodeBorder = useTransform(
    nodeGlow,
    [0, 1],
    ["rgba(255,255,255,0.06)", "rgba(0,212,255,0.8)"]
  );
  const nodeShadow = useTransform(
    nodeGlow,
    [0, 1],
    ["0 0 0px rgba(0,212,255,0)", "0 0 20px rgba(0,212,255,0.4)"]
  );

  return (
    <motion.div
      style={{ opacity, y, x }}
      className="relative flex gap-4 group"
    >
      {/* Vertical connector line + icon node */}
      <div className="flex flex-col items-center">
        <motion.div
          style={{
            borderColor: nodeBorder,
            boxShadow: nodeShadow,
          }}
          className="w-7 h-7 rounded-full border bg-white/[0.03] flex items-center justify-center
                      transition-colors duration-500 z-10 bg-black shrink-0"
        >
          <Icon className="w-3.5 h-3.5 text-cyber" strokeWidth={1.5} />
        </motion.div>
        {index < total - 1 && (
          <div className="relative w-px flex-1 my-1 bg-white/[0.04]">
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-cyber/30"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pb-6">
        <span className="font-[family-name:var(--font-mono)] text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-cyber">
          {subtitle}
        </span>
        <h3 className="text-base font-bold text-white group-hover:text-cyber transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-gray-300 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function MobileTimelineItem({
  icon: Icon,
  title,
  subtitle,
  description,
  index,
  total,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative flex gap-4 group"
    >
      <div className="flex flex-col items-center">
        <div
          className="w-7 h-7 rounded-full border border-white/[0.06] bg-white/[0.03] flex items-center justify-center
                      transition-colors duration-500 z-10 bg-black shrink-0 group-hover:border-cyber/80 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
        >
          <Icon className="w-3.5 h-3.5 text-cyber" strokeWidth={1.5} />
        </div>
        {index < total - 1 && (
          <div className="relative w-px flex-1 my-1 bg-white/[0.04]">
            <div className="absolute inset-0 bg-cyber/30" />
          </div>
        )}
      </div>

      <div className="pb-8">
        <span className="font-[family-name:var(--font-mono)] text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-cyber">
          {subtitle}
        </span>
        <h3 className="text-base font-bold text-white group-hover:text-cyber transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-300 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main About Section (Sticky Scroll on Desktop, Normal on Mobile) ── */
export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const timeline = [
    {
      icon: GraduationCap,
      title: "Pós-Graduação em Data Science & BI",
      subtitle: "Formação Acadêmica",
      description:
        "Especialização em análise de dados, modelagem estatística, machine learning e business intelligence para tomada de decisão orientada a dados.",
    },
    {
      icon: Briefcase,
      title: "Analista & Desenvolvedor de Sistemas",
      subtitle: "Atuação Profissional",
      description:
        "Projetando e construindo soluções de software escaláveis — da arquitetura de banco de dados ao deploy em produção — com foco em qualidade e performance.",
    },
    {
      icon: Cpu,
      title: "Automação & Integração de Dados",
      subtitle: "Especialidade Técnica",
      description:
        "Pipelines ETL, APIs RESTful, microsserviços e automação de processos complexos que conectam sistemas e eliminam gargalos operacionais.",
    },
    {
      icon: TrendingUp,
      title: "Dashboards & Storytelling com Dados",
      subtitle: "Impacto nos Negócios",
      description:
        "Transformando métricas brutas em narrativas visuais claras — dashboards interativos, KPIs em tempo real e relatórios que movem decisões de negócio.",
    },
  ];

  return (
    <section id="sobre">
      <div ref={wrapperRef} className="relative md:h-[250vh]">
        <div className="md:sticky md:top-0 md:h-screen overflow-hidden flex flex-col md:flex-row items-start md:items-center pt-20 pb-10 md:pt-0 md:pb-0">
          <HudSVGSticky scrollYProgress={scrollYProgress} />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
            {/* Section header */}
            <div className="text-center mb-12 md:mb-8">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase text-gray-500">
                // Quem sou eu
              </span>
              <h2 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight text-white">
                Sobre<span className="text-cyber">.</span>
              </h2>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12">
              {/* Left — Bio & Stats */}
              <div>
                <div>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Sou um profissional movido pela interseção entre{" "}
                    <span className="text-white font-medium">lógica de sistemas</span> e{" "}
                    <span className="text-white font-medium">inteligência de dados</span>.
                    Minha formação em Análise e Desenvolvimento de Sistemas,
                    combinada com pós-graduação em Data Science e BI, me permite
                    enxergar problemas de ponta a ponta.
                  </p>
                  <p className="mt-4 text-gray-400 leading-relaxed text-sm">
                    Acredito que o melhor software nasce quando a engenharia
                    encontra o pensamento analítico — quando cada funcionalidade
                    é desenhada não apenas para funcionar, mas para gerar impacto
                    mensurável no negócio.
                  </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <StatCard value="5+" label="Anos de experiência" delay={0} />
                  <StatCard value="30+" label="Projetos entregues" delay={0} />
                  <StatCard value="10+" label="Dashboards BI" delay={0} />
                  <StatCard value="99%" label="Uptime em produção" delay={0} />
                </div>
              </div>

              {/* Right — Timeline */}
              <div className="flex flex-col">
                {/* Desktop timeline */}
                <div className="hidden md:flex flex-col">
                  {timeline.map((item, i) => (
                    <TimelineItem
                      key={item.title}
                      {...item}
                      index={i}
                      total={timeline.length}
                      containerProgress={scrollYProgress}
                    />
                  ))}
                </div>

                {/* Mobile timeline */}
                <div className="flex md:hidden flex-col">
                  {timeline.map((item, i) => (
                    <MobileTimelineItem
                      key={item.title}
                      {...item}
                      index={i}
                      total={timeline.length}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * HUD SVG variant that accepts external scrollYProgress
 * (since sticky layout shares the wrapper's scroll)
 */
function HudSVGSticky({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const pathLen = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const pathLen2 = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.7, 1, 1.15]);
  const svgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.15, 0.3, 0.3, 0.15]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div style={{ scale, opacity: svgOpacity }}>
        <motion.svg
          viewBox="0 0 600 600"
          fill="none"
          className="w-[min(90vw,550px)] h-[min(90vw,550px)]"
        >
          {/* Outer octagon */}
          <motion.g style={{ rotate }} className="origin-center">
            <motion.polygon
              points="300,40 460,120 520,280 460,440 300,520 140,440 80,280 140,120"
              stroke="#00d4ff"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: pathLen }}
              strokeLinecap="round"
            />
            {[
              [300, 40], [460, 120], [520, 280], [460, 440],
              [300, 520], [140, 440], [80, 280], [140, 120],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#00d4ff" opacity="0.5" />
            ))}
          </motion.g>

          {/* Inner diamond */}
          <motion.g style={{ rotate: rotateReverse }} className="origin-center">
            <motion.polygon
              points="300,150 420,300 300,450 180,300"
              stroke="#a855f7"
              strokeWidth="0.4"
              fill="none"
              style={{ pathLength: pathLen2 }}
              strokeLinecap="round"
            />
            <motion.polygon
              points="300,180 400,300 300,420 200,300"
              stroke="#a855f7"
              strokeWidth="0.3"
              fill="none"
              style={{ pathLength: pathLen2 }}
              strokeLinecap="round"
              opacity="0.4"
            />
          </motion.g>

          {/* Scan lines */}
          <motion.g style={{ rotate }} className="origin-center">
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              return (
                <motion.line
                  key={`scan-${i}`}
                  x1={300 + 60 * Math.cos(angle)}
                  y1={300 + 60 * Math.sin(angle)}
                  x2={300 + 260 * Math.cos(angle)}
                  y2={300 + 260 * Math.sin(angle)}
                  stroke="#1a1a1a"
                  strokeWidth="0.3"
                  style={{ pathLength: pathLen }}
                />
              );
            })}
          </motion.g>

          {/* Center ring */}
          <motion.circle
            cx="300" cy="300" r="40"
            stroke="#00d4ff" strokeWidth="0.5"
            fill="none"
            style={{ pathLength: pathLen }}
            strokeDasharray="3 8"
          />
          <circle cx="300" cy="300" r="3" fill="#00d4ff" opacity="0.8" />

          {/* Data arcs */}
          <motion.g style={{ rotate: rotateReverse }} className="origin-center">
            <motion.path
              d="M 300 80 A 220 220 0 0 1 520 300"
              stroke="#00d4ff"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="4 12"
              style={{ pathLength: pathLen }}
              opacity="0.3"
            />
            <motion.path
              d="M 300 520 A 220 220 0 0 1 80 300"
              stroke="#a855f7"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="4 12"
              style={{ pathLength: pathLen2 }}
              opacity="0.25"
            />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  );
}

