import dotenv from "dotenv";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const rawPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail) {
    throw new Error("Set ADMIN_EMAIL before seeding.");
  }

  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    if (!rawPassword || rawPassword.length < 8) {
      throw new Error("Set an ADMIN_PASSWORD of at least 8 characters to create the admin account.");
    }
    const hashedPassword = await bcrypt.hash(rawPassword, 12);
    admin = await prisma.user.create({
      data: {
      email: adminEmail,
      name: "Portfolio Admin",
      password: hashedPassword,
      role: Role.ADMIN,
      },
    });
  } else if (admin.role !== Role.ADMIN) {
    admin = await prisma.user.update({
      where: { id: admin.id },
      data: { role: Role.ADMIN },
    });
  }

  const initialProjects = [
    {
      id: "f1a8b3c1-2d4e-4f60-9a71-123456789001",
      title: "CineFlow Studio",
      description:
        "An AI-assisted video creation studio that turns text prompts into video concepts. The product combines Google GenAI, Remotion preview and playback, background workflows, and a typed PostgreSQL data layer.",
      tags: "Next.js 16,React 19,TypeScript,Tailwind CSS 4,Google GenAI,Remotion,Inngest,PostgreSQL,Drizzle ORM,NextAuth,Zustand,Swagger UI",
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
      tags: "NestJS,TypeScript,PostgreSQL,Gemini API,Inngest,NextAuth,Zustand,Swagger UI",
      githubUrl: "https://github.com/AmeyPank/AI-Code-Auditor-FE",
      liveUrl: "https://ai-code-auditor-fe.vercel.app/",
      featured: false,
      order: 1,
    },
  ];

  for (const project of initialProjects) {
    const existingProject = await prisma.project.findFirst({
      where: { title: project.title },
      select: { id: true },
    });
    if (!existingProject) await prisma.project.create({ data: project });
  }

  console.log(`Admin account ready (${admin.role}); existing passwords are preserved.`);
  console.log(`Project defaults checked (${initialProjects.length}).`);
}

main()
  .catch((error) => {
    console.error("Unable to seed the admin account.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
