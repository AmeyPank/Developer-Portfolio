"use server";

import type { ProjectFormState } from "../project.dto";
import { runProjectFormCommand } from "./project-command";
import { requireAdmin } from "@/lib/auth";

export async function createProjectAction(
  _previousState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();
  return runProjectFormCommand(formData);
}
