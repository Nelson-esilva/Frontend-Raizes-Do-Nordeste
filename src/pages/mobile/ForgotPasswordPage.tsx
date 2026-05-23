import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import * as authService from "@/services/authService";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await authService.requestPasswordReset(email);
    setLoading(false);
    setOk(result.ok);
    setMessage(result.message);
  }

  return (
    <section className="mx-auto max-w-md space-y-4 py-4">
      <h1 className="font-display text-2xl font-bold text-ink">
        Recuperar acesso
      </h1>
      <p className="text-sm text-muted">
        Enviaremos um link para redefinir sua senha (simulação).
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="E-mail cadastrado"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && (
          <p
            role="alert"
            className={`rounded-xl px-3 py-2 text-sm font-semibold ${
              ok ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            }`}
          >
            {message}
          </p>
        )}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Enviando..." : "Enviar link"}
        </Button>
      </form>

      <Link to="/login" className="block text-center text-sm font-semibold text-brand">
        ← Voltar ao login
      </Link>
    </section>
  );
}
