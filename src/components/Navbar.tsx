"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Skills", href: "#skills" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group py-2">
          <Image
            src="/logo.png"
            alt="Fernando Carvalho"
            width={240}
            height={80}
            className="h-8 md:h-10 w-auto object-contain scale-[1.5] md:scale-[2] origin-left group-hover:scale-[1.6] md:group-hover:scale-[2.1] transition-transform duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-gray-400 
                         hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-cyber 
                           group-hover:w-3/4 transition-all duration-300"
              />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-white"
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="block w-5 h-px bg-white origin-center"
          />
        </button>
      </div>

      {/* Mobile panel */}
      <motion.nav
        initial={false}
        animate={
          mobileOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden glass"
      >
        <div className="flex flex-col items-center gap-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-300 hover:text-cyber transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
