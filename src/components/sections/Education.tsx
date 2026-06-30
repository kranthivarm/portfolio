"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Education() {
  return (
    <SectionWrapper id="education">
      <div className="section-container">
        <div className="section-divider mb-16" />

        <div className="max-w-3xl mx-auto">
          <p className="section-label">Education</p>
          <h2 className="section-title text-2xl">Academic background</h2>

          <motion.div
            className="mt-8 glass-card p-6 sm:p-8 hover:border-accent/30 transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-accent-muted text-accent flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 0 3 3 6 3s6-3 6-3v-5" />
                </svg>
              </motion.div>
              <div>
                {/* [FILL IN] Replace with actual degree, institution, and year */}
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  Bachelor of Technology (B.Tech)
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  Computer Science & Engineering
                </p>
                <p className="text-text-muted text-sm mt-1">
                  [Institution Name] — [Graduation Year]
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
