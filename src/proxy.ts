import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "portfolio_admin_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !jwtSecret || jwtSecret.length < 32) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jwtVerify(token, secret, {
        issuer: "portfolio",
        audience: "portfolio-admin",
      });

      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const jwtSecret = process.env.JWT_SECRET;
    if (token && jwtSecret && jwtSecret.length >= 32) {
      try {
        const secret = new TextEncoder().encode(jwtSecret);
        const { payload } = await jwtVerify(token, secret, {
          issuer: "portfolio",
          audience: "portfolio-admin",
        });
        if (payload.role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch {
        // Invalid token; proceed to login page.
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
