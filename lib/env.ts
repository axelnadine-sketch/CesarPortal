import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  ADMIN_USERNAME: z.string().min(3),
  ADMIN_PASSWORD_HASH: z.string().min(20),
  AUTH_SECRET: z.string().min(32),
  INTERNAL_API_TOKEN: z.string().min(24),
  APP_URL: z.string().url().default("http://localhost:3000"),
});

const parsedEnv = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  AUTH_SECRET: process.env.AUTH_SECRET,
  INTERNAL_API_TOKEN: process.env.INTERNAL_API_TOKEN,
  APP_URL: process.env.APP_URL,
});

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
