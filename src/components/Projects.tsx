"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Database, Code2, LineChart, FileText } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

const projects = [
  {
    title: "BetMind Analytics",
    githubUrl: "https://github.com/fescarvalho/betmind",
    icon: LineChart,
    description:
      "Plataforma de análise preditiva e automação para o mercado esportivo. Processamento de dados em tempo real com interface de alta performance para tomada de decisão ágil.",
    tags: ["Next.js", "TypeScript", "Data Analysis", "API"],
    highlight: "Processamento em Tempo Real",
  },
  {
    title: "Sistema PDV Cloud",
    githubUrl: "https://github.com/fescarvalho/SistemaPDV",
    icon: Database,
    description:
      "Sistema completo de Ponto de Venda (PDV) com controle rigoroso de estoque, fechamento de caixa automatizado e painel de métricas financeiras (BI).",
    tags: ["React", "Node.js", "Dashboard", "PostgreSQL"],
    highlight: "Gestão & BI",
  },
  {
    title: "Plataforma Cifras",
    githubUrl: "https://github.com/fescarvalho/Cifras",
    icon: FileText,
    description:
      "Sistema avançado para processamento, formatação e renderização dinâmica de dados. Implementação robusta em TypeScript focada em performance, parse de texto estruturado e UX.",
    tags: ["TypeScript", "Frontend", "Parsing", "Engine"],
    highlight: "Renderização Dinâmica",
  },
  {
    title: "Allegre Backend Core",
    githubUrl: "https://github.com/fescarvalho/AllegreBackend",
    icon: Code2,
    description:
      "Arquitetura backend escalável projetada para sistemas de alta demanda, englobando pipelines de dados integrados, microsserviços e autenticação segura.",
    tags: ["Node.js", "Express", "TypeScript", "Arquitetura"],
    highlight: "Backend Escalável",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1.2", "1 1"], // triggers slightly earlier
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="group relative flex flex-col justify-between h-full p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyber/30 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Icon & Highlight */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-cyber group-hover:scale-110 transition-transform duration-500">
            <project.icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-gray-500 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">
            {project.highlight}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyber transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
          {project.description}
        </p>
      </div>

      {/* Bottom Footer: Tags & Links */}
      <div className="mt-auto pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all hover:scale-110"
            title="Ver no GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          {/* Mock live link button for aesthetic completeness */}
          <button
            className="w-10 h-10 rounded-full bg-cyber/10 border border-cyber/20 flex items-center justify-center text-cyber hover:bg-cyber hover:text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all hover:scale-110"
            title="Deploy (Demonstração)"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase text-gray-500">
            // Meu Trabalho
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Projetos Selecionados<span className="text-cyber">.</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Uma seleção de aplicações e sistemas construídos com foco em
            performance, integração de dados e arquiteturas robustas.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        {/* GitHub Full Link */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/fescarvalho"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/[0.05] rounded-full hover:border-cyber/50 transition-all duration-300"
          >
            <GithubIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Ver todos os repositórios no GitHub
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
