import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/features/projects/project.service";
import { projectIdSchema } from "@/features/projects/project.schema";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const parsedId = projectIdSchema.safeParse(id);
  if (!parsedId.success) notFound();

  const project = await getProjectById(parsedId.data);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl space-y-7">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Back to projects
        </Link>
        <header className="border-b border-border/40 pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Project management</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Edit {project.title}</h1>
          <p className="mt-2 text-muted-foreground">Update the project information shown on your portfolio.</p>
        </header>
        <ProjectForm project={project} />
      </div>
    </main>
  );
}
