import type { ProjectDto } from "@/features/projects/project.dto";

export const PROFILE = {
  name: "Full-Stack Engineer",
  eyebrow: "Backend-minded · Product-focused",
  headline: "I build useful products and the systems behind them.",
  introduction:
    "I’m a full-stack engineer focused on dependable backend systems, thoughtful APIs, and polished web experiences. I enjoy taking a product from its first idea through architecture, implementation, and deployment.",
  availability: "Open to engineering opportunities",
};

export const SKILL_GROUPS = [
  {
    title: "Backend & APIs",
    description: "Services designed for clarity, security, and growth.",
    skills: ["Node.js", "TypeScript", "NestJS", "Express", "REST APIs", "Authentication"],
  },
  {
    title: "Frontend & product",
    description: "Responsive interfaces with a focus on usability.",
    skills: ["React", "Next.js", "Tailwind CSS", "Accessible UI", "Server Components"],
  },
  {
    title: "Data & delivery",
    description: "Practical data modeling and reliable delivery workflows.",
    skills: ["PostgreSQL", "MySQL", "Prisma", "Drizzle ORM", "Docker", "GitHub Actions"],
  },
];

export const PORTFOLIO_PROJECTS: ProjectDto[] = [
  {
    id: "f1a8b3c1-2d4e-4f60-9a71-123456789001",
    title: "CineFlow Studio",
    description:
      "An AI-assisted video creation studio that turns text prompts into video concepts. The product combines Google GenAI, Remotion preview and playback, background workflows, and a typed PostgreSQL data layer.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Google GenAI",
      "Remotion",
      "Inngest",
      "PostgreSQL",
      "Drizzle ORM",
      "NextAuth",
      "Zustand",
      "Swagger UI",
    ],
    githubUrl: null,
    liveUrl: "https://cine-flow-studio.vercel.app/",
    featured: true,
    order: 0,
  },
  {
    id: "f1a8b3c1-2d4e-4f60-9a71-123456789002",
    title: "AI Code Auditor",
    description:
      "A backend-focused code review concept for spotting security risks, style issues, and performance bottlenecks in pull requests.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Gemini API", "Docker"],
    githubUrl: null,
    liveUrl: null,
    featured: false,
    order: 1,
  },
];
