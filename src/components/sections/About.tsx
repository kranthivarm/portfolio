"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const stats = [
  { label: "Projects Delivered", value: "6+" },
  { label: "Tech Stacks", value: "5+" },
  { label: "Client Satisfaction", value: "100%" },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-container">
        <div className="section-divider mb-16" />

        <div className="max-w-3xl mx-auto">
          <p className="section-label">About</p>
          <h2 className="section-title">Building complete products, solo</h2>

          <div className="mt-8 space-y-6">
            <motion.p
              className="text-text-secondary text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I&apos;m Kranthi — a full-stack developer who builds and ships complete
              digital products end-to-end. Mobile apps in Flutter, web platforms
              in React and Next.js, backend services in Spring Boot, Go, and
              Node.js, and AI-powered systems using RAG pipelines and agentic
              workflows. The projects on this page aren&apos;t concepts or
              tutorials — they&apos;re real products, built for real users, handling
              real complexity.
            </motion.p>

            <motion.p
              className="text-text-secondary text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I work solo, but I deliver with the scope and velocity of a small
              team. That means full ownership — from initial architecture and
              database design through API development, frontend implementation,
              and deployment. Clients get one point of contact who understands
              every layer of the stack, communicates clearly, and iterates fast.
              No handoffs, no miscommunication between departments, no
              surprises.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 sm:p-5 text-center group hover:border-accent/30 transition-colors"
              >
                <motion.p
                  className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-1"
                  whileInView={{ scale: [0.5, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-text-muted text-xs sm:text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Availability badge */}
          <motion.div
            className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-elevated border border-border pulse-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
            </span>
            <span className="text-text-primary text-sm font-medium">
              Currently available for new projects
            </span>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
