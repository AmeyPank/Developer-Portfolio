"use server";

import { revalidatePath } from "next/cache";
import { projectIdSchema } from "../project.schema";
import { deleteProjectRecord } from "../project.repository";
import { requireAdmin } from "@/lib/auth";

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  const parsedId = projectIdSchema.safeParse(id);
  if (!parsedId.success) throw new Error("Invalid project identifier.");

  await deleteProjectRecord(parsedId.data);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
