import Link from "next/link";
import { findProjects } from "@/features/projects/project.repository";
import { mapProjectRecord } from "@/features/projects/project.mapper";
import ProjectForm from "@/components/admin/ProjectForm";
import { deleteProjectAction } from "@/features/projects/actions/delete-project.action";
import { toggleFeaturedProjectAction } from "@/features/projects/actions/toggle-featured-project.action";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = (await findProjects()).map(mapProjectRecord);

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Project Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Add and maintain portfolio showcase items and repositories.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin" className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium transition hover:bg-muted">
              Messages Inbox
            </Link>
            <Link href="/" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium transition hover:bg-muted">
              View Live Site
            </Link>
          </div>
        </div>

        {/* Project Creation Form */}
        <ProjectForm />

        {/* Existing Projects List */}
        <Card>
          <CardHeader>
            <CardTitle>Published Projects ({projects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No projects found. Add your first project using the form above.
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-lg">
                          {p.title}
                        </span>
                        {p.featured && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            Featured
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          Priority: {p.order}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {p.description}
                      </p>
                      <div className="flex gap-2 flex-wrap pt-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <form
                        action={toggleFeaturedProjectAction.bind(
                          null,
                          p.id,
                        )}
                      >
                        <Button variant="ghost" size="sm" type="submit">
                          {p.featured ? "Unfeature" : "Make Featured"}
                        </Button>
                      </form>
                      <form action={deleteProjectAction.bind(null, p.id)}>
                        <Button
                          variant="destructive"
                          size="sm"
                          type="submit"
                          className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20"
                        >
                          Delete
                        </Button>
                      </form>
                      <Link href={`/admin/projects/${p.id}/edit`} className="inline-flex h-8 items-center rounded-lg border border-cyan-200/20 bg-cyan-200/[0.08] px-3 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-200/[0.15]">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
