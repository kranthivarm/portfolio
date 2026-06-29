export type ProjectCategory = "client" | "academic";
export type ProjectFilter = "all" | "mobile" | "web" | "backend" | "ai";

export interface ProjectType {
  id: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  type: string;
  tags: string[];
  oneLiner: string;
  modalDescription: string;
  filters: ProjectFilter[];
  /* TODO: replace with actual project links */
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export const projects: ProjectType[] = [
  // ── Client Work ──────────────────────────────────────────────
  {
    id: "killscroll",
    name: "KillScroll",
    category: "client",
    categoryLabel: "Client Work",
    type: "Mobile (Flutter) + Backend",
    tags: ["Flutter", "Spring Boot", "AI", "Habit Tech"],
    oneLiner:
      "A mobile app that detects and limits doomscrolling on Reels and Shorts to help users reclaim their attention.",
    modalDescription:
      "KillScroll is a productivity-focused Android app that monitors usage patterns of short-form video platforms (Instagram Reels, YouTube Shorts) and intervenes with smart nudges, timers, and usage summaries. Built end-to-end — Flutter frontend, Spring Boot backend for usage analytics and user goal-tracking, with AI-driven pattern detection to personalise intervention thresholds per user.",
    filters: ["mobile", "backend", "ai"],
    /* TODO: replace with actual URLs */
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/killscroll.png",
  },
  {
    id: "tunetogether",
    name: "TuneTogether",
    category: "client",
    categoryLabel: "Client Work",
    type: "Mobile (Flutter) + Web (React) + Backend",
    tags: ["Flutter", "React", "Go", "WebRTC", "Spring Boot", "Real-time", "Audio"],
    oneLiner:
      "A multi-device synchronized audio platform that turns a group of phones into a single speaker array — no hardware required.",
    modalDescription:
      "TuneTogether lets users create a Room, invite others by code, and play audio in tight sync across all connected devices (target drift <30ms). The host can broadcast from a local playlist (audio stays on device — only metadata syncs to server) or mirror live device audio from any app (Android). Built with Flutter + React clients, a Go real-time signaling server with NTP-style clock sync, WebRTC SFU for audio relay, and Spring Boot for room/session management. Designed for parties, group listening, or any scenario where a single speaker isn't enough.",
    filters: ["mobile", "web", "backend"],
    /* TODO: replace with actual URLs */
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/tunetogether.png",
  },
  {
    id: "gaminghub",
    name: "GamingHub",
    category: "client",
    categoryLabel: "Client Work",
    type: "Mobile (Flutter)",
    tags: ["Flutter", "Game Development", "Multi-game Platform"],
    oneLiner:
      "A single Flutter app housing a curated collection of casual mini-games — one install, many games.",
    modalDescription:
      "GamingHub is a multi-game mobile platform built entirely in Flutter, offering a growing library of casual mini-games within a single unified app shell. Includes shared progression, a unified leaderboard, and a plug-in architecture so new games can be added as modules without restructuring the core app.",
    filters: ["mobile"],
    /* TODO: replace with actual URLs */
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/gaminghub.png",
  },

  // ── Personal / Academic Projects ─────────────────────────────
  {
    id: "connectify",
    name: "Connectify",
    category: "academic",
    categoryLabel: "Personal / Academic",
    type: "Web / Full-stack",
    /* [FILL IN] Replace placeholder tags with actual stack used */
    tags: ["React", "Node.js", "MongoDB", "Socket.IO"],
    oneLiner:
      "A social connectivity platform built as a college project exploring full-stack web development.",
    /* [FILL IN] Replace placeholder description with actual project details */
    modalDescription:
      "Connectify is a full-stack social platform built during college, focused on real-time social connectivity and user interaction. Stack: React frontend, Node.js backend, MongoDB for data persistence, and Socket.IO for real-time features. Key learning: end-to-end full-stack architecture, real-time communication patterns, and database design for social graphs.",
    filters: ["web", "backend"],
    /* TODO: replace with actual URLs */
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/connectify.png",
  },
  {
    id: "coding-platform",
    name: "Coding Platform",
    category: "academic",
    categoryLabel: "Personal / Academic",
    type: "Web + Backend",
    tags: ["React", "Node.js", "Judge0", "PostgreSQL"],
    oneLiner:
      "A fully functional competitive coding platform with real-time code execution, problem sets, and user rankings.",
    modalDescription:
      "A LeetCode-style platform built from scratch — users can browse problems by difficulty/tag, write and submit code in multiple languages, get real-time execution results via a sandboxed code runner, and track their progress on a personal dashboard. Built end-to-end as a college project to deeply understand backend system design, code execution sandboxing, and real-time feedback loops.",
    filters: ["web", "backend"],
    /* TODO: replace with actual URLs */
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/coding-platform.png",
  },
  {
    id: "bookmind",
    name: "BookMind",
    category: "academic",
    categoryLabel: "Personal / Academic",
    type: "Web + AI Backend",
    tags: ["React", "RAG", "LLM", "Vector DB", "Python"],
    oneLiner:
      "A RAG-powered study tool where school students upload their textbooks and learn through AI chat and auto-generated quizzes.",
    modalDescription:
      "BookMind lets students upload any PDF textbook or study material, then interact with it through an AI chat interface that answers questions grounded strictly in the uploaded content (no hallucination of external facts). Auto-generates topic-wise quizzes from the material to reinforce learning. Built on a Retrieval-Augmented Generation (RAG) pipeline — documents are chunked, embedded into a vector store, and retrieved at query time to ground LLM responses in the actual source material.",
    filters: ["web", "ai"],
    /* TODO: replace with actual URLs */
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/bookmind.png",
  },
];

export const filterLabels: Record<ProjectFilter, string> = {
  all: "All",
  mobile: "Mobile",
  web: "Web",
  backend: "Backend",
  ai: "AI",
};
