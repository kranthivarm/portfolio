"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { skillCategories } from "@/data/skills";

/* ── Skill Icon Mapping ───────────────────────────────────── */
/* Maps skill names to simple SVG icons. Using inline SVGs to
   avoid external dependencies and keep the bundle lean. */
function SkillIcon({ name }: { name: string }) {
  const iconColor = "currentColor";

  const icons: Record<string, React.ReactNode> = {
    Flutter: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm0 11.066L7.93 17.5l6.384 6.432h7.37L14.314 17.5l4.685-4.685-4.685-1.749z" />
      </svg>
    ),
    React: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={iconColor} strokeWidth="1" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={iconColor} strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={iconColor} strokeWidth="1" transform="rotate(120 12 12)" />
      </svg>
    ),
    Docker: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M13 3h2v2h-2V3zm-2 0h2v2h-2V3zm-2 0h2v2H9V3zm6 0h2v2h-2V3zm-8 2h2v2H7V5zm2 0h2v2H9V5zm2 0h2v2h-2V5zm2 0h2v2h-2V5zm-6 2h2v2H7V7zm2 0h2v2H9V7zm2 0h2v2h-2V7zm2 0h2v2h-2V7zM5 9h2v2H5V9zm2 0h2v2H7V9zm2 0h2v2H9V9zm2 0h2v2h-2V9zm2 0h2v2h-2V9zm2 0h2v2h-2V9zM1 11c0 0 1.5 5 7.5 6S21 17 23 15c-1 0-2-.5-2-.5S20 18 14 18s-8-3.5-8-3.5c-2.5-1-5-3.5-5-3.5z" />
      </svg>
    ),
  };

  /* Fallback: first two letters */
  return (
    <div className="w-10 h-10 rounded-lg bg-accent-muted text-accent flex items-center justify-center text-sm font-bold font-display">
      {icons[name] || name.slice(0, 2).toUpperCase()}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="section-label justify-center">Skills & Stack</p>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-subtitle mx-auto">
            Battle-tested tools chosen for reliability, performance, and
            developer velocity — not hype.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div key={category.category} className="glass-card p-5">
              <h3 className="font-display font-semibold text-sm text-accent uppercase tracking-wider mb-4">
                {category.category}
              </h3>
              <motion.div
                className="flex flex-col gap-2.5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-muted/50 transition-colors group"
                    variants={itemVariants}
                  >
                    <SkillIcon name={skill.name} />
                    <span className="text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
