import { prisma } from "@/lib/prisma";

export async function findProjects() {
  return prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
}

export function findProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export interface ProjectWriteRecord {
  title: string;
  description: string;
  tags: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
}

export async function createProjectRecord(data: ProjectWriteRecord) {
  return prisma.project.create({ data });
}

export async function updateProjectRecord(id: string, data: ProjectWriteRecord) {
  return prisma.project.update({ where: { id }, data });
}

export async function deleteProjectRecord(id: string) {
  return prisma.project.delete({ where: { id } });
}

export async function toggleFeaturedRecord(id: string) {
  const project = await prisma.project.findUnique({ where: { id }, select: { featured: true } });
  if (!project) throw new Error("Project not found.");
  return prisma.project.update({
    where: { id },
    data: { featured: !project.featured },
  });
}
