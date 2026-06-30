"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  projects,
  filterLabels,
  type ProjectType,
  type ProjectFilter,
} from "@/data/projects";

/* ── Filter Bar ───────────────────────────────────────────── */
function FilterBar({
  active,
  onSelect,
}: {
  active: ProjectFilter;
  onSelect: (f: ProjectFilter) => void;
}) {
  const filters: ProjectFilter[] = ["all", "mobile", "web", "backend", "ai"];
  return (
    <div className="flex flex-wrap gap-2 mb-10 justify-center" role="tablist" aria-label="Filter projects">
      {filters.map((f) => (
        <button
          key={f}
          role="tab"
          aria-selected={active === f}
          onClick={() => onSelect(f)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer overflow-hidden ${
            active === f
              ? "bg-accent text-base shadow-lg shadow-accent/20"
              : "bg-surface-elevated text-text-secondary hover:text-text-primary"
          }`}
        >
          {active !== f && (
            <span className="absolute inset-0 bg-accent/0 hover:bg-accent/10 transition-colors duration-300 rounded-full" />
          )}
          <span className="relative z-10">{filterLabels[f]}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Tilt Project Card ────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectType;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="tilt-card"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card overflow-hidden group cursor-pointer tilt-card-inner"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Image placeholder with gradient */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface-elevated to-surface" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-display font-bold text-3xl text-accent/15 group-hover:text-accent/30 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
            >
              {project.name}
            </motion.span>
          </div>
          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-base/70 backdrop-blur-sm text-text-secondary border border-glass-border">
            {project.categoryLabel}
          </span>
          {/* Hover shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
            <motion.svg
              className="w-5 h-5 text-text-muted group-hover:text-accent flex-shrink-0 mt-1"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              whileHover={{ x: 3, y: -3 }}
            >
              <path d="M5 15L15 5M15 5H8M15 5v7" />
            </motion.svg>
          </div>

          <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-2">
            {project.type}
          </p>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {project.oneLiner}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} className="text-[11px] px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs text-text-muted self-center ml-1">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Modal ────────────────────────────────────────── */
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: ProjectType | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name}>
      <div className="pr-6">
        {/* Header */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent-muted text-accent mb-4">
          {project.categoryLabel}
        </span>
        <h3 className="font-display font-bold text-2xl text-text-primary mb-1">
          {project.name}
        </h3>
        <p className="text-sm text-text-muted uppercase tracking-wider font-medium mb-4">
          {project.type}
        </p>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-6">
          {project.modalDescription}
        </p>

        {/* Tags */}
        <div className="mb-6">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-text-secondary hover:text-accent border border-border hover:border-accent transition-colors text-sm font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source Code
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-base hover:bg-accent-hover transition-colors text-sm font-semibold"
            >
              Live Demo
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 15L15 5M15 5H8M15 5v7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ── Projects Section ─────────────────────────────────────── */
export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.filters.includes(filter));
  }, [filter]);

  /* Sort: client work first */
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.category === "client" && b.category !== "client") return -1;
      if (a.category !== "client" && b.category === "client") return 1;
      return 0;
    });
  }, [filteredProjects]);

  return (
    <SectionWrapper id="projects">
      <div className="section-container">
        <div className="section-divider mb-16" />

        <div className="text-center mb-12">
          <p className="section-label justify-center">Projects</p>
          <h2 className="section-title">Work that ships</h2>
          <p className="section-subtitle mx-auto">
            Real products built for real users — from client engagements to
            deep technical explorations.
          </p>
        </div>

        <FilterBar active={filter} onSelect={setFilter} />

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {sortedProjects.length === 0 && (
          <p className="text-center text-text-muted py-12">
            No projects in this category yet.
          </p>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </SectionWrapper>
  );
}
