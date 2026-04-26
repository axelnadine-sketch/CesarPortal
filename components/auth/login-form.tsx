import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormProps = {
  error?: boolean;
};

export function LoginForm({ error = false }: LoginFormProps) {
  return (
    <form action="/admin/login/submit" className="grid gap-5" method="post">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-white" htmlFor="username">
          Identifiant
        </label>
        <Input autoComplete="username" id="username" name="username" placeholder="baladmin" required />
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
      </div>

      {error ? <p className="text-sm text-rose-300">Identifiants invalides.</p> : null}

      <Button className="w-full" type="submit">
        Se connecter
      </Button>
    </form>
  );
}
