"use client";

import { useState, useMemo } from "react";
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
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
            active === f
              ? "bg-accent text-base shadow-lg shadow-accent/20"
              : "bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-border-hover"
          }`}
        >
          {filterLabels[f]}
        </button>
      ))}
    </div>
  );
}

/* ── Project Card ─────────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectType;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="glass-card overflow-hidden group cursor-pointer"
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
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-surface-elevated to-surface overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-3xl text-accent/20 group-hover:text-accent/40 transition-colors duration-300">
            {project.name}
          </span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-base/70 backdrop-blur-sm text-text-secondary border border-glass-border">
          {project.categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <svg
            className="w-5 h-5 text-text-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 15L15 5M15 5H8M15 5v7" />
          </svg>
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
