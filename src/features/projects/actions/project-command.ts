import { revalidatePath } from "next/cache";
import type { ProjectFormState } from "../project.dto";
import { mapProjectFormData } from "../project.mapper";
import { createProjectSchema } from "../project.schema";
import { saveProject } from "../project.service";

export async function runProjectFormCommand(
  formData: FormData,
  projectId?: string,
): Promise<ProjectFormState> {
  const validated = createProjectSchema.safeParse(mapProjectFormData(formData));
  if (!validated.success) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const result = await saveProject(validated.data, projectId);
  if (result.success) {
    revalidatePath("/admin/projects");
    revalidatePath("/");
    if (projectId) revalidatePath(`/admin/projects/${projectId}/edit`);
  }
  return result;
}
