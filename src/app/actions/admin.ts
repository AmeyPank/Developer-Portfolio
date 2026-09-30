"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const messageIdSchema = z.string().uuid();

export async function toggleMessageReadStatus(id: string) {
    await requireAdmin();
    const parsedId = messageIdSchema.safeParse(id);
    if (!parsedId.success) throw new Error("Invalid message identifier.");
    const message = await prisma.contactMessage.findUnique({
        where: { id: parsedId.data },
        select: { read: true },
    });
    if (!message) throw new Error("Message not found.");
    await prisma.contactMessage.update({
        where: { id: parsedId.data },
        data: { read: !message.read },
    });
    revalidatePath("/admin");
}

export async function deleteContactMessage(id: string) {
    await requireAdmin();
    const parsedId = messageIdSchema.safeParse(id);
    if (!parsedId.success) throw new Error("Invalid message identifier.");
    await prisma.contactMessage.delete({
        where: { id: parsedId.data },
    });
    revalidatePath("/admin");
}
