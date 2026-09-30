"use server";

import { revalidatePath } from "next/cache";
import { projectIdSchema } from "../project.schema";
import { toggleFeaturedRecord } from "../project.repository";
import { requireAdmin } from "@/lib/auth";

export async function toggleFeaturedProjectAction(id: string) {
  await requireAdmin();
  const parsedId = projectIdSchema.safeParse(id);
  if (!parsedId.success) throw new Error("Invalid project identifier.");

  await toggleFeaturedRecord(parsedId.data);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
