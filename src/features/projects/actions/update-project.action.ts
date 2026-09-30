"use server";

import { projectIdSchema } from "../project.schema";
import type { ProjectFormState } from "../project.dto";
import { runProjectFormCommand } from "./project-command";
import { requireAdmin } from "@/lib/auth";

export async function updateProjectAction(
  id: string,
  _previousState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();
  const parsedId = projectIdSchema.safeParse(id);
  if (!parsedId.success) throw new Error("Invalid project identifier.");

  return runProjectFormCommand(formData, parsedId.data);
}
