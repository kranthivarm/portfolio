"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { skillCategories } from "@/data/skills";

/* ── Skill Icon with Animated Hover ───────────────────────── */
function SkillIcon({ name }: { name: string }) {
  return (
    <motion.div
      className="w-10 h-10 rounded-lg bg-accent-muted text-accent flex items-center justify-center text-sm font-bold font-display"
      whileHover={{ scale: 1.15, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {name.slice(0, 2).toUpperCase()}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="section-container">
        <div className="section-divider mb-16" />

        <div className="text-center mb-16">
          <p className="section-label justify-center">Skills & Stack</p>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-subtitle mx-auto">
            Battle-tested tools chosen for reliability, performance, and
            developer velocity — not hype.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              className="glass-card p-5 group"
              variants={cardVariants}
            >
              <h3 className="font-display font-semibold text-sm text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {category.category}
              </h3>
              <motion.div
                className="flex flex-col gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-muted/50 transition-all duration-300 group/item cursor-default"
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <SkillIcon name={skill.name} />
                    <span className="text-text-secondary text-sm font-medium group-hover/item:text-text-primary transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
