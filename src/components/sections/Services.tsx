"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/Animations";
import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="16" height="24" rx="3" />
        <circle cx="14" cy="22" r="1" fill="currentColor" />
        <line x1="10" y1="5" x2="18" y2="5" />
      </svg>
    ),
    title: "Mobile Apps",
    tech: "Flutter",
    description:
      "Cross-platform iOS & Android apps built once, deployed everywhere, with native performance.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="24" height="16" rx="2" />
        <path d="M8 24h12" />
        <path d="M14 20v4" />
      </svg>
    ),
    title: "Web Platforms",
    tech: "React / Next.js",
    description:
      "Fast, SEO-ready web applications from landing pages to full SaaS dashboards.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="20" height="4" rx="1" />
        <rect x="4" y="12" width="20" height="4" rx="1" />
        <rect x="4" y="18" width="20" height="4" rx="1" />
        <circle cx="7" cy="8" r="1" fill="currentColor" />
        <circle cx="7" cy="14" r="1" fill="currentColor" />
        <circle cx="7" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Backend & APIs",
    tech: "Spring Boot / Go / Node.js",
    description:
      "Scalable server architecture, REST/WebSocket APIs, and database design that grows with your product.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h20M4 14h20M4 22h12" />
        <circle cx="22" cy="22" r="4" />
        <path d="M22 20v4M20 22h4" />
      </svg>
    ),
    title: "RAG Systems",
    tech: "LLM + Vector DB",
    description:
      "AI-powered knowledge bases that let your users query documents, manuals, or content in plain language and get accurate answers.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="8" r="4" />
        <path d="M8 18c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M20 12l3 3-3 3" />
        <path d="M8 12l-3 3 3 3" />
        <path d="M14 20v4" />
      </svg>
    ),
    title: "Agentic AI",
    tech: "Autonomous Workflows",
    description:
      "Autonomous AI workflows and agents that handle complex multi-step tasks — research, generation, decision-making — without constant human input.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

export function Services() {
  return (
    <SectionWrapper id="services">
      <div className="section-container">
        {/* Subtle section divider */}
        <div className="section-divider mb-16" />

        <div className="text-center mb-16">
          <p className="section-label justify-center">What I Do</p>
          <h2 className="section-title">
            End-to-end capabilities, one developer
          </h2>
          <p className="section-subtitle mx-auto">
            From the first line of backend code to the final pixel on screen — I
            handle the full stack so you get a cohesive product, not a
            Frankenstein of outsourced parts.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service, i) => (
            <motion.div key={service.title} variants={itemVariants}>
              <GlowCard>
                <div className="p-6 sm:p-7 group">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-accent-muted text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-base transition-colors duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-1">
                    {service.title}
                  </h3>
                  <p className="text-accent text-xs font-medium tracking-wider uppercase mb-3">
                    {service.tech}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Decorative number */}
                  <span className="absolute top-4 right-5 font-display text-6xl font-bold text-accent/[0.04] pointer-events-none select-none">
                    0{i + 1}
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
