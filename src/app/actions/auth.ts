"use server";

import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie, removeAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

export type AuthState = {
    error?: string;
};

export async function loginAction(
    prevState: AuthState | null,
    formData: FormData
): Promise<AuthState | null> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validated = loginSchema.safeParse({ email, password });
    if (!validated.success) {
        return { error: validated.error.issues[0]?.message || "Invalid inputs" };
    }

    const user = await prisma.user.findUnique({
        where: { email: validated.data.email },
    });

    if (!user) {
        return { error: "Invalid email or password." };
    }

    const isPasswordValid = await bcrypt.compare(validated.data.password, user.password);
    if (!isPasswordValid) {
        return { error: "Invalid email or password." };
    }

    if (user.role !== "ADMIN") {
        return { error: "Access denied. Admin credentials required." };
    }

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    await setAuthCookie(token);

    redirect("/admin");
}

export async function logoutAction() {
    await removeAuthCookie();
    redirect("/login");
}