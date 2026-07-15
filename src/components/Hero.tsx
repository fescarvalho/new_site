"use client";

import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const roles = [
    ">_ Desenvolvedor Fullstack",
    ">_ Data Scientist",
    ">_ Especialista em BI",
  ];

  return (
    <section className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        {/* Tag line */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-8"
        >
          Analista &amp; Desenvolvedor de Sistemas — Data Science &amp; BI
        </motion.span>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
        >
          Lógica de Sistemas.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-neon-purple">
            Precisão de Dados.
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-8"
        >
          <Typewriter texts={roles} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 max-w-xl text-gray-400 text-base md:text-lg leading-relaxed"
        >
          Transformando dados complexos em decisões claras e lógica de
          programação em experiências digitais imersivas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projetos"
            className="group relative px-8 py-3.5 bg-cyber text-black text-sm font-semibold rounded 
                       overflow-hidden transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(0,212,255,0.35)]"
          >
            <span className="relative z-10">Ver Projetos</span>
            <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </a>
          <a
            href="#contato"
            className="px-8 py-3.5 border border-white/10 text-sm font-medium rounded text-gray-300
                       hover:border-white/30 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
          >
            Entrar em Contato
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.25em] uppercase text-gray-600">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
