"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";

export type LoginActionState = {
  success: boolean;
  errors?: {
    username?: string;
    password?: string;
    _form?: string;
  };
};

export async function authenticateAdmin(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      errors: {
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  const isValid = await verifyAdminCredentials(parsed.data.username, parsed.data.password);

  if (!isValid) {
    return {
      success: false,
      errors: {
        _form: "Identifiants invalides.",
      },
    };
  }

  await createAdminSession();
  redirect("/admin");
}
