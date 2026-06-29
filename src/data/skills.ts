export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Mobile",
    items: [
      { name: "Flutter" },
      { name: "Dart" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "HTML/CSS" },
      { name: "Tailwind" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Spring Boot" },
      { name: "Go" },
      { name: "Node.js" },
      { name: "Express" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "LangChain" },
      { name: "RAG Pipelines" },
      { name: "Vector DBs" },
      { name: "OpenAI API" },
      { name: "Agentic AI" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
    ],
  },
  {
    category: "DevOps / Infra",
    items: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Vercel" },
      { name: "AWS" },
    ],
  },
  {
    category: "Real-time",
    items: [
      { name: "WebRTC" },
      { name: "WebSockets" },
    ],
  },
];
