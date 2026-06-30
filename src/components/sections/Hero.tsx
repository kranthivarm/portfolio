"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CursorThreads } from "@/components/ui/CursorThreads";
import { Magnetic } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/Animations";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Thread-based interactive background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <CursorThreads />
      </div>

      {/* Gradient overlays for depth — kept light so threads show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base/50 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
        {/* pointer-events-none on content so canvas beneath receives mouse events */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent-muted text-accent text-sm font-medium mb-8 shimmer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TextReveal delay={0.3}>
            Kranthi
          </TextReveal>
        </motion.h1>

        <motion.p
          className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary/90 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          I build products end-to-end —{" "}
          <span className="gradient-text">mobile, web, AI.</span>
        </motion.p>

        <motion.p
          className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          Solo full-stack developer delivering complete digital products — from
          architecture and backend to polished mobile and web interfaces.
          One person, full-team output.
        </motion.p>


        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Magnetic strength={0.2}>
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="pulse-glow"
            >
              See My Work
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3v10M3 8l5 5 5-5" />
              </svg>
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
            >
              Let&apos;s Talk
            </Button>
          </Magnetic>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-text-muted flex items-start justify-center p-1.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
