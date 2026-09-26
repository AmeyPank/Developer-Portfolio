"use client";

import { useActionState, useEffect, useRef } from "react";
import { createProject, ProjectFormState } from "@/app/actions/projects";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialState: ProjectFormState = { success: false, message: "" };

export default function ProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-xl">Add New Project</CardTitle>
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
              <label className="text-sm font-medium">Title</label>
              <input
                name="title"
                required
                placeholder="E.g., DevPlatform SaaS"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
              {state?.errors?.title && (
                <p className="text-xs text-destructive mt-1">
                  {state.errors.title[0]}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Tags (Comma-separated)
              </label>
              <input
                name="tags"
                required
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
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              required
              rows={3}
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
              <label className="text-sm font-medium">
                GitHub Repository URL (Optional)
              </label>
              <input
                name="githubUrl"
                type="url"
                placeholder="https://github.com/your-username/repo"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Live Demo URL (Optional)
              </label>
              <input
                name="liveUrl"
                type="url"
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
                className="rounded border-input text-primary focus:ring-ring"
              />
              Feature this project on landing hero
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Display Priority:</label>
              <input
                name="order"
                type="number"
                defaultValue={0}
                className="w-20 px-2 py-1 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? "Saving Project..." : "Save Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
