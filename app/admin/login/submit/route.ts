import bcrypt from "bcryptjs";
import { readFileSync } from "node:fs";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/constants";
import { createSessionToken } from "@/lib/session-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_DURATION = 60 * 60 * 12;
const PUBLIC_APP_URL = "https://cesarportal.unsa-servair.fr";
const ADMIN_AUTH_FILE = "/etc/cesarportal/admin-auth.json";

type AdminAuthConfig = {
  username: string;
  passwordHash: string;
};

function redirectTo(path: string) {
  return NextResponse.redirect(new URL(path, PUBLIC_APP_URL), {
    status: 303,
  });
}

function readAdminAuthConfig(): AdminAuthConfig {
  return JSON.parse(readFileSync(ADMIN_AUTH_FILE, "utf8")) as AdminAuthConfig;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const authSecret = process.env.AUTH_SECRET;

  if (!authSecret) {
    return redirectTo("/admin/login?error=server");
  }

  const adminConfig = readAdminAuthConfig();

  const usernameMatches = username === adminConfig.username;
  const passwordMatches = await bcrypt.compare(password, adminConfig.passwordHash);

  if (!usernameMatches || !passwordMatches) {
    return redirectTo("/admin/login?error=invalid");
  }

  const token = await createSessionToken(authSecret, SESSION_DURATION);

  const response = redirectTo("/admin");

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  return response;
}
