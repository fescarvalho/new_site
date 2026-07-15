"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Code2, BarChart3, Layers } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Desenvolvimento de Sistemas",
    description:
      "Arquitetura e construção de aplicações web completas com foco em performance, escalabilidade e experiência do usuário.",
  },
  {
    icon: Database,
    title: "Data Science",
    description:
      "Análise exploratória, modelagem preditiva e machine learning para extrair insights acionáveis de grandes volumes de dados.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description:
      "Dashboards interativos, ETL e storytelling com dados para transformar métricas em decisões estratégicas de negócio.",
  },
  {
    icon: Layers,
    title: "Full Stack",
    description:
      "Do banco de dados à interface: APIs robustas, front-ends modernos e pipelines de dados — tudo integrado.",
  },
];

export default function SkillsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

  return (
    <section id="skills" ref={sectionRef} className="relative z-10 py-32 px-6">
      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] uppercase text-gray-500">
            O que eu faço
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Competências<span className="text-cyber">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-8 rounded-lg border border-white/[0.04] bg-white/[0.02]
                         hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-500"
            >
              <skill.icon
                className="w-6 h-6 text-cyber mb-5 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold text-white mb-3">
                {skill.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {skill.description}
              </p>
              {/* Subtle corner accent */}
              <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyber/10 rounded-tr-lg 
                               group-hover:border-cyber/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
