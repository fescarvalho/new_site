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
  return (
    <div className="w-[85vw] md:w-[380px] lg:w-[420px] shrink-0 group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.05] hover:border-cyber/30 transition-colors duration-500 overflow-hidden min-h-[380px]">
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Icon & Highlight */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-cyber group-hover:scale-110 transition-transform duration-500">
            <project.icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] uppercase text-gray-500 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">
            {project.highlight}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyber transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Bottom Footer: Tags & Links */}
      <div className="mt-auto pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-gray-400 bg-white/[0.03] px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all hover:scale-110"
            title="Ver no GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <button
            className="w-9 h-9 rounded-full bg-cyber/10 border border-cyber/20 flex items-center justify-center text-cyber hover:bg-cyber hover:text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all hover:scale-110"
            title="Deploy (Demonstração)"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Moves the slider to the left as you scroll down
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section id="projetos" ref={targetRef} className="relative h-[300vh] bg-black">
      {/* Sticky container that stays on screen while scrolling the 300vh height */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Header - Positioned cleanly above the slider */}
        <div className="relative z-20 px-6 md:px-12 lg:px-24 mb-10">
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase text-gray-500">
            // Meu Trabalho
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Projetos Selecionados<span className="text-cyber">.</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl text-sm md:text-base">
            Uma seleção de aplicações e sistemas construídos com foco em
            performance, integração de dados e arquiteturas robustas.
          </p>
        </div>

        {/* Horizontal Slider Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-24 items-center relative z-10"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}

          {/* See more card */}
          <div className="w-[85vw] md:w-[300px] h-[380px] shrink-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] border-dashed hover:border-cyber/30 transition-colors duration-500 group">
            <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-cyber/10">
              <GithubIcon className="w-6 h-6 text-gray-500 group-hover:text-cyber transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">Explorar mais</h3>
            <p className="text-sm text-gray-500 text-center mb-8">Veja todos os repositórios no GitHub.</p>
            <a
              href="https://github.com/fescarvalho"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.05] text-sm text-gray-300 hover:text-white hover:border-cyber/50 transition-all"
            >
              Acessar GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
