import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollSVG from "@/components/ScrollSVG";
import SkillsPreview from "@/components/SkillsPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import MarqueeStrip from "@/components/MarqueeStrip";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative selection:bg-cyber selection:text-black">
      <Navbar />

      {/* ── Scroll-driven SVG container ──
          The SVG is sticky inside this wrapper.
          The wrapper's total height (hero + spacer) drives the animation. */}
      <div className="relative" style={{ height: "300vh" }}>
        <ScrollSVG />

        {/* Hero overlays the SVG in the first viewport */}
        <Hero />

        {/* Extra scroll space to drive the SVG animation */}
        <section className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-6">
            // continue scrolling
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white/80 tracking-tight max-w-2xl">
            Cada linha de código é uma decisão.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber to-neon-purple">
              Cada dado conta uma história.
            </span>
          </h2>
        </section>
      </div>

      {/* ── About ── */}
      <About />

      {/* ── Horizontal marquee — tech stack ── */}
      <MarqueeStrip variant="tech" />

      {/* ── Skills ── */}
      <SkillsPreview />

      {/* ── Projetos ── */}
      <Projects />

      {/* ── Contato ── */}
      <Contact />
    </main>
  );
}
