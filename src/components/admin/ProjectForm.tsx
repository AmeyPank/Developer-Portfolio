"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { createProjectAction } from "@/features/projects/actions/create-project.action";
import { updateProjectAction } from "@/features/projects/actions/update-project.action";
import type { ProjectDto, ProjectFormState } from "@/features/projects/project.dto";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialState: ProjectFormState = { success: false, message: "" };

export default function ProjectForm({ project }: { project?: ProjectDto }) {
  const formId = useId().replace(/:/g, "");
  const action = project ? updateProjectAction.bind(null, project.id) : createProjectAction;
  const [state, formAction, isPending] = useActionState(
    action,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success && !project) {
      formRef.current?.reset();
    }
  }, [project, state?.success]);

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-xl">{project ? "Edit Project" : "Add New Project"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          {state?.message && (
            <div
              className={`p-3 rounded text-sm ${
                state.success
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {state.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${formId}-title`} className="text-sm font-medium">Title</label>
              <input
                id={`${formId}-title`}
                name="title"
                required
                defaultValue={project?.title}
                placeholder="E.g., CineFlow Studio"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
              {state?.errors?.title && (
                <p className="text-xs text-destructive mt-1">
                  {state.errors.title[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-tags`} className="text-sm font-medium">
                Tags (Comma-separated)
              </label>
              <input
                id={`${formId}-tags`}
                name="tags"
                required
                defaultValue={project?.tags.join(", ")}
                placeholder="Next.js, TypeScript, Tailwind"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
              {state?.errors?.tags && (
                <p className="text-xs text-destructive mt-1">
                  {state.errors.tags[0]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-description`} className="text-sm font-medium">Description</label>
            <textarea
              id={`${formId}-description`}
              name="description"
              required
              rows={3}
              maxLength={1200}
              defaultValue={project?.description}
              placeholder="High-level overview of the architectural decisions and features..."
              className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
            />
            {state?.errors?.description && (
              <p className="text-xs text-destructive mt-1">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${formId}-github`} className="text-sm font-medium">
                GitHub Repository URL (Optional)
              </label>
              <input
                id={`${formId}-github`}
                name="githubUrl"
                type="url"
                defaultValue={project?.githubUrl ?? ""}
                placeholder="https://github.com/your-username/repo"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-live`} className="text-sm font-medium">
                Live Demo URL (Optional)
              </label>
              <input
                id={`${formId}-live`}
                name="liveUrl"
                type="url"
                defaultValue={project?.liveUrl ?? ""}
                placeholder="https://yourproject.com"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={project?.featured ?? false}
                className="rounded border-input text-primary focus:ring-ring"
              />
              Feature this project on landing hero
            </label>

            <div className="flex items-center gap-2">
              <label htmlFor={`${formId}-order`} className="text-sm font-medium">Display Priority:</label>
              <input
                id={`${formId}-order`}
                name="order"
                type="number"
                min={0}
                max={10000}
                defaultValue={project?.order ?? 0}
                className="w-20 px-2 py-1 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? "Saving Project..." : project ? "Save Changes" : "Save Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
