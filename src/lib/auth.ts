import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "portfolio_admin_token";
const TOKEN_ISSUER = "portfolio";
const TOKEN_AUDIENCE = "portfolio-admin";

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET must be configured with at least 32 characters.");
    }
    return secret;
}

export interface SessionPayload {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
}

export function signToken(payload: SessionPayload): string {
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: "7d",
        issuer: TOKEN_ISSUER,
        audience: TOKEN_AUDIENCE,
    });
}

export function verifyToken(token: string): SessionPayload | null {
    try {
        const payload = jwt.verify(token, getJwtSecret(), {
            issuer: TOKEN_ISSUER,
            audience: TOKEN_AUDIENCE,
        });
        if (
            typeof payload === "string" ||
            typeof payload.userId !== "string" ||
            typeof payload.email !== "string" ||
            (payload.role !== "ADMIN" && payload.role !== "USER")
        ) return null;

        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        };
    } catch {
        return null;
    }
}

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}

export async function removeAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function requireAdmin(): Promise<SessionPayload> {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
        throw new Error("You must be signed in as an admin to perform this action.");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { email: true, role: true },
    });

    if (!user || user.role !== "ADMIN" || user.email !== session.email) {
        throw new Error("Admin access is no longer available for this account.");
    }
    return session;
}
