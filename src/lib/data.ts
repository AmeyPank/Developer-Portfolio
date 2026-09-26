export interface Project {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
}

export const SKILLS = {
    backend: ["Node.js", "TypeScript", "NestJS", "Express.js", "REST APIs", "PostgreSQL", "Prisma", "Sequelize"],
    frontend: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "HTML5/CSS3"],
    devops_tools: ["Git", "Docker", "Postman", "VS Code", "GitHub Actions"],
};

export const PROJECTS: Project[] = [
    {
        title: "AI Code Auditor",
        description: "An automated backend auditor analyzing repository pull requests for security vulnerabilities, style compliance, and performance bottlenecks.",
        tech: ["NestJS", "TypeScript", "PostgreSQL", "Gemini API", "Docker"],
        github: "https://github.com",
        live: "https://example.com",
    },
    {
        title: "Enterprise Auth & RBAC Microservice",
        description: "Modular authentication system featuring JWT token rotation, bcrypt password hashing, and granular role/permission route guards.",
        tech: ["Node.js", "TypeScript", "Sequelize", "PostgreSQL"],
        github: "https://github.com",
    },
];