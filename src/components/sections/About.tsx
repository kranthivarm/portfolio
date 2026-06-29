"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <p className="section-label">About</p>
          <h2 className="section-title">Building complete products, solo</h2>

          <div className="mt-8 space-y-6">
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              I&apos;m Kranthi — a full-stack developer who builds and ships complete
              digital products end-to-end. Mobile apps in Flutter, web platforms
              in React and Next.js, backend services in Spring Boot, Go, and
              Node.js, and AI-powered systems using RAG pipelines and agentic
              workflows. The projects on this page aren&apos;t concepts or
              tutorials — they&apos;re real products, built for real users, handling
              real complexity.
            </p>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              I work solo, but I deliver with the scope and velocity of a small
              team. That means full ownership — from initial architecture and
              database design through API development, frontend implementation,
              and deployment. Clients get one point of contact who understands
              every layer of the stack, communicates clearly, and iterates fast.
              No handoffs, no miscommunication between departments, no
              surprises.
            </p>
          </div>

          {/* Availability badge */}
          <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-elevated border border-border">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
            </span>
            <span className="text-text-primary text-sm font-medium">
              Currently available for new projects
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
