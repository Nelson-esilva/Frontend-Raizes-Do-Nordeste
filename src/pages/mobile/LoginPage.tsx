import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/services/authService";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await authService.login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.message);
      setPassword("");
      return;
    }
    login(result.user);
    navigate("/unidades");
  }

  return (
    <section className="mx-auto max-w-md space-y-4 py-4">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink">Entrar</h1>
        <p className="text-sm text-muted">Use seu e-mail e senha cadastrados.</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && (
          <p role="alert" className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="text-center text-sm">
        <Link to="/recuperar-senha" className="font-semibold text-brand">
          Esqueci minha senha
        </Link>
      </p>
      <p className="text-center text-sm text-muted">
        <Link to="/cadastro" className="font-semibold text-brand">
          Criar conta
        </Link>
      </p>

      <p className="rounded-xl border-2 border-brand-dark bg-gradient-to-br from-brand via-brand to-accent px-4 py-3.5 text-center text-sm font-bold leading-snug text-white shadow-md sm:text-base">
        Demo: cliente@email.com / Senha@123
      </p>
    </section>
  );
}
