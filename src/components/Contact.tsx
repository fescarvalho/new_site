"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Send, ExternalLink, Code2, Mail, MapPin, ArrowUpRight } from "lucide-react";

/* ── Circuit-board SVG background ── */
function CircuitSVG() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLen1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const pathLen2 = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const pathLen3 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const svgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.3, 0.3, 0]);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div style={{ opacity: svgOpacity }}>
        <motion.svg
          viewBox="0 0 800 800"
          fill="none"
          className="w-[min(110vw,900px)] h-[min(110vw,900px)]"
        >
          {/* ── Grid dots ── */}
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`dot-${row}-${col}`}
                cx={120 + col * 62}
                cy={120 + row * 62}
                r="1"
                fill="#1a1a1a"
              />
            ))
          )}

          {/* ── Main circuit traces ── */}
          <motion.g style={{ rotate }} className="origin-center">
            {/* Horizontal traces */}
            <motion.path
              d="M 80 400 L 300 400 L 330 370 L 470 370 L 500 400 L 720 400"
              stroke="#00d4ff"
              strokeWidth="0.6"
              fill="none"
              style={{ pathLength: pathLen1 }}
              strokeLinecap="round"
            />
            <motion.path
              d="M 80 430 L 250 430 L 280 460 L 520 460 L 550 430 L 720 430"
              stroke="#a855f7"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: pathLen2 }}
              strokeLinecap="round"
            />

            {/* Vertical traces */}
            <motion.path
              d="M 400 80 L 400 280 L 370 310 L 370 490 L 400 520 L 400 720"
              stroke="#00d4ff"
              strokeWidth="0.5"
              fill="none"
              style={{ pathLength: pathLen1 }}
              strokeLinecap="round"
            />
            <motion.path
              d="M 430 80 L 430 250 L 460 280 L 460 520 L 430 550 L 430 720"
              stroke="#a855f7"
              strokeWidth="0.4"
              fill="none"
              style={{ pathLength: pathLen3 }}
              strokeLinecap="round"
            />
          </motion.g>

          {/* ── Node intersections ── */}
          {[
            [300, 400], [500, 400], [400, 280], [400, 520],
            [330, 370], [470, 370], [280, 460], [550, 430],
          ].map(([cx, cy], i) => (
            <g key={`node-${i}`}>
              <circle cx={cx} cy={cy} r="4" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4" />
              <circle cx={cx} cy={cy} r="1.5" fill="#00d4ff" opacity="0.6" />
            </g>
          ))}

          {/* ── Outer frame rectangle ── */}
          <motion.rect
            x="100" y="100" width="600" height="600" rx="4"
            stroke="#111"
            strokeWidth="0.4"
            fill="none"
            style={{ pathLength: pathLen1 }}
          />
          <motion.rect
            x="140" y="140" width="520" height="520" rx="2"
            stroke="#00d4ff"
            strokeWidth="0.3"
            fill="none"
            style={{ pathLength: pathLen2 }}
            opacity="0.2"
            strokeDasharray="6 14"
          />

          {/* ── Diagonal connectors ── */}
          <motion.line
            x1="140" y1="140" x2="300" y2="300"
            stroke="#1a1a1a" strokeWidth="0.3"
            style={{ pathLength: pathLen3 }}
          />
          <motion.line
            x1="660" y1="140" x2="500" y2="300"
            stroke="#1a1a1a" strokeWidth="0.3"
            style={{ pathLength: pathLen3 }}
          />
          <motion.line
            x1="140" y1="660" x2="300" y2="500"
            stroke="#1a1a1a" strokeWidth="0.3"
            style={{ pathLength: pathLen3 }}
          />
          <motion.line
            x1="660" y1="660" x2="500" y2="500"
            stroke="#1a1a1a" strokeWidth="0.3"
            style={{ pathLength: pathLen3 }}
          />

          {/* ── Center processor chip ── */}
          <motion.rect
            x="360" y="360" width="80" height="80" rx="3"
            stroke="#00d4ff" strokeWidth="0.6" fill="none"
            style={{ pathLength: pathLen1 }}
            opacity="0.5"
          />
          <motion.rect
            x="375" y="375" width="50" height="50" rx="2"
            stroke="#a855f7" strokeWidth="0.4" fill="none"
            style={{ pathLength: pathLen2 }}
            opacity="0.4"
          />
          <circle cx="400" cy="400" r="3" fill="#00d4ff" opacity="0.7" />

          {/* ── Chip pin lines ── */}
          {Array.from({ length: 5 }).map((_, i) => {
            const offset = 368 + i * 16;
            return (
              <g key={`pin-${i}`}>
                {/* Top pins */}
                <line x1={offset} y1="360" x2={offset} y2="340" stroke="#1a1a1a" strokeWidth="0.4" />
                {/* Bottom pins */}
                <line x1={offset} y1="440" x2={offset} y2="460" stroke="#1a1a1a" strokeWidth="0.4" />
                {/* Left pins */}
                <line x1="360" y1={offset} x2="340" y2={offset} stroke="#1a1a1a" strokeWidth="0.4" />
                {/* Right pins */}
                <line x1="440" y1={offset} x2="460" y2={offset} stroke="#1a1a1a" strokeWidth="0.4" />
              </g>
            );
          })}
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* ── Social link button ── */
function SocialLink({
  href,
  icon: Icon,
  label,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group flex items-center gap-3 px-5 py-4 rounded-lg border border-white/[0.05] bg-white/[0.02]
                 hover:border-cyber/20 hover:bg-white/[0.04] transition-all duration-500"
    >
      <Icon className="w-5 h-5 text-gray-500 group-hover:text-cyber transition-colors duration-300" strokeWidth={1.5} />
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
    </motion.a>
  );
}

/* ── Contact form input ── */
function FormField({
  label,
  id,
  type = "text",
  textarea = false,
}: {
  label: string;
  id: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const baseClasses = `w-full bg-transparent border border-white/[0.06] rounded-lg px-4 py-3
    text-sm text-white placeholder:text-gray-600 outline-none
    focus:border-cyber/30 focus:shadow-[0_0_12px_rgba(0,212,255,0.08)] transition-all duration-400`;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
          focused ? "text-cyber" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          className={`${baseClasses} resize-none`}
          placeholder={`Sua ${label.toLowerCase()}...`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={baseClasses}
          placeholder={`Seu ${label.toLowerCase()}...`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {/* Animated bottom accent */}
      <span
        className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyber to-neon-purple transition-all duration-500 ${
          focused ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

/* ── Main Contact Section ── */
export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  return (
    <section id="contato" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Circuit SVG background */}
      <CircuitSVG />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-20">
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] uppercase text-gray-500">
            // Vamos conversar
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Contato<span className="text-cyber">.</span>
          </h2>
          <p className="mt-6 max-w-lg mx-auto text-gray-400 text-base leading-relaxed">
            Tem um projeto em mente, uma vaga ou simplesmente quer trocar uma ideia?
            Estou sempre aberto a novas conexões.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column — form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 p-8 rounded-xl border border-white/[0.04] bg-white/[0.015]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Nome" id="name" />
                <FormField label="Email" id="email" type="email" />
              </div>
              <FormField label="Assunto" id="subject" />
              <FormField label="Mensagem" id="message" textarea />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative flex items-center justify-center gap-2 w-full py-3.5
                           bg-cyber text-black text-sm font-semibold rounded-lg overflow-hidden
                           hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-shadow duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enviar Mensagem
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right column — info & socials */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-lg border border-white/[0.04] bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-4 h-4 text-cyber" strokeWidth={1.5} />
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-gray-500">
                  Localização
                </span>
              </div>
              <p className="text-white text-sm font-medium">Brasil</p>
              <p className="text-gray-500 text-xs mt-1">Disponível para trabalho remoto mundial</p>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-lg border border-white/[0.04] bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm text-gray-300">Disponível para novos projetos</span>
              </div>
            </motion.div>

            {/* Socials */}
            <div className="flex flex-col gap-3 mt-2">
              <SocialLink href="mailto:seu@email.com" icon={Mail} label="Email" delay={0} />
              <SocialLink href="https://github.com/" icon={Code2} label="GitHub" delay={0.08} />
              <SocialLink href="https://linkedin.com/" icon={ExternalLink} label="LinkedIn" delay={0.16} />
            </div>

            {/* Corner SVG accent */}
            <motion.svg
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              viewBox="0 0 120 120"
              fill="none"
              className="w-24 h-24 self-end mt-auto opacity-20"
            >
              <path d="M 10 110 L 10 10 L 110 10" stroke="#00d4ff" strokeWidth="0.5" />
              <path d="M 30 110 L 30 30 L 110 30" stroke="#00d4ff" strokeWidth="0.3" opacity="0.5" />
              <circle cx="10" cy="10" r="2" fill="#00d4ff" opacity="0.6" />
              <circle cx="10" cy="110" r="2" fill="#00d4ff" opacity="0.4" />
              <circle cx="110" cy="10" r="2" fill="#00d4ff" opacity="0.4" />
            </motion.svg>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 mt-32 border-t border-white/[0.04] pt-8 pb-12"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-gray-600">
            © {new Date().getFullYear()} — Desenhado & desenvolvido com precisão.
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-gray-700">
            // built with Next.js + Framer Motion
          </span>
        </div>
      </motion.div>
    </section>
  );
}
