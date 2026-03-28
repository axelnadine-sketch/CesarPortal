"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticateAdmin, type LoginActionState } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: LoginActionState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? "Connexion..." : "Se connecter"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(authenticateAdmin, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-white" htmlFor="username">
          Identifiant
        </label>
        <Input autoComplete="username" id="username" name="username" placeholder="admin" required />
        {state.errors?.username ? (
          <p className="text-xs text-rose-300">{state.errors.username}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-white" htmlFor="password">
          Mot de passe
        </label>
        <Input
          autoComplete="current-password"
          id="password"
          name="password"
          placeholder="Votre mot de passe"
          required
          type="password"
        />
        {state.errors?.password ? (
          <p className="text-xs text-rose-300">{state.errors.password}</p>
        ) : null}
      </div>

      {state.errors?._form ? <p className="text-sm text-rose-300">{state.errors._form}</p> : null}

      <SubmitButton />
    </form>
  );
}
