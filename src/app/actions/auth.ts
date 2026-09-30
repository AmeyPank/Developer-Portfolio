"use server";

import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie, removeAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { User } from "@prisma/client";

const loginSchema = z.object({
    email: z.string().trim().email("Please enter a valid email.").max(254),
    password: z.string().min(1, "Enter your password.").max(200),
});

export type AuthState = {
    error?: string;
};

export async function loginAction(
    prevState: AuthState | null,
    formData: FormData
): Promise<AuthState | null> {
    const email = formData.get("email");
    const password = formData.get("password");

    const validated = loginSchema.safeParse({ email, password });
    if (!validated.success) {
        return { error: validated.error.issues[0]?.message || "Invalid inputs" };
    }

    let user: User | null;
    try {
        user = await prisma.user.findUnique({
            where: { email: validated.data.email.toLowerCase() },
        });
    } catch (error) {
        console.error("Admin login lookup failed.", error);
        return { error: "Sign-in is temporarily unavailable. Please try again." };
    }

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

    try {
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        await setAuthCookie(token);
    } catch (error) {
        console.error("Admin session could not be created.", error);
        return { error: "Sign-in is not configured correctly. Please contact the site owner." };
    }

    redirect("/admin");
}

export async function logoutAction() {
    await removeAuthCookie();
    redirect("/login");
}
