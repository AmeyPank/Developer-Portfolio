"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleMessageReadStatus(id: string, currentStatus: boolean) {
    await prisma.contactMessage.update({
        where: { id },
        data: { read: !currentStatus },
    });
    revalidatePath("/admin");
}

export async function deleteContactMessage(id: string) {
    await prisma.contactMessage.delete({
        where: { id },
    });
    revalidatePath("/admin");
}