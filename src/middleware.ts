import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";
const COOKIE_NAME = "portfolio_admin_token";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes
    if (pathname.startsWith("/admin")) {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (!token) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const secret = new TextEncoder().encode(JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            if (payload.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/login", request.url));
            }

            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect authenticated admins away from /login straight to /admin
    if (pathname === "/login") {
        const token = request.cookies.get(COOKIE_NAME)?.value;
        if (token) {
            try {
                const secret = new TextEncoder().encode(JWT_SECRET);
                await jwtVerify(token, secret);
                return NextResponse.redirect(new URL("/admin", request.url));
            } catch {
                // Invalid token; proceed to login page
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};