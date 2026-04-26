import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/constants";
import { verifySessionToken } from "@/lib/session-token";

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret) {
      return false;
    }

    const payload = await verifySessionToken(token, secret);
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login" || pathname === "/admin/login/submit") {
    const authenticated = await isAuthenticated(request);

    if (authenticated && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  const authenticated = await isAuthenticated(request);

  if (!authenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
