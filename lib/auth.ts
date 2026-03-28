import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { env } from "@/lib/env";
import { ADMIN_SESSION_COOKIE } from "@/lib/constants";
import { createSessionToken, verifySessionToken } from "@/lib/session-token";

const SESSION_DURATION = 60 * 60 * 12;

export async function verifyAdminCredentials(username: string, password: string) {
  const usernameMatches = username === env.ADMIN_USERNAME;
  const passwordMatches = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);

  return usernameMatches && passwordMatches;
}

export async function createAdminSession() {
  const token = await createSessionToken(env.AUTH_SECRET, SESSION_DURATION);

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token, env.AUTH_SECRET);
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
