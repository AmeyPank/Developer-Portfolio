"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const projectSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    tags: z.string().min(1, "Please provide at least one tag."),
    githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    liveUrl: z.string().url("Invalid Live URL").optional().or(z.literal("")),
    featured: z.boolean().default(false),
    order: z.coerce.number().default(0),
});

export type ProjectFormState = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
};

export async function createProject(
    prevState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    const raw = {
        title: formData.get("title"),
        description: formData.get("description"),
        tags: formData.get("tags"),
        githubUrl: formData.get("githubUrl") || undefined,
        liveUrl: formData.get("liveUrl") || undefined,
        featured: formData.get("featured") === "on",
        order: formData.get("order") || 0,
    };

    const validated = projectSchema.safeParse(raw);
    if (!validated.success) {
        return {
            success: false,
            message: "Validation failed. Please verify your fields.",
            errors: validated.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.project.create({
            data: {
                title: validated.data.title,
                description: validated.data.description,
                tags: validated.data.tags,
                githubUrl: validated.data.githubUrl || null,
                liveUrl: validated.data.liveUrl || null,
                featured: validated.data.featured,
                order: validated.data.order,
            },
        });

        revalidatePath("/admin/projects");
        revalidatePath("/");
        return { success: true, message: "Project created successfully!" };
    } catch (err) {
        console.error("Create project error:", err);
        return { success: false, message: "Failed to create project in database." };
    }
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function toggleFeaturedProject(id: string, current: boolean) {
    await prisma.project.update({
        where: { id },
        data: { featured: !current },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
}