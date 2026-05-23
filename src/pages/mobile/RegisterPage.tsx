import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConsentBlock } from "@/components/lgpd/ConsentBlock";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/services/authService";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [notifyOrderStatus, setNotifyOrderStatus] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "email") setEmailError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!authService.isValidEmail(form.email)) {
      setEmailError("Insira um endereço de e-mail válido.");
      return;
    }
    if (!privacyAccepted) return;

    setLoading(true);
    const result = await authService.register({
      ...form,
      privacyAccepted,
      marketingConsent,
      notifyOrderStatus,
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }
    login(result.user);
    navigate("/unidades");
  }

  return (
    <section className="mx-auto max-w-md space-y-4 py-4">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink">Cadastro</h1>
        <p className="text-sm text-muted">
          Nome, e-mail, telefone, data de nascimento e aceite LGPD.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nome completo"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
        <Input
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={emailError}
          required
        />
        <Input
          label="Telefone"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
        />
        <Input
          label="Data de nascimento"
          type="date"
          value={form.birthDate}
          onChange={(e) => update("birthDate", e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          required
          minLength={6}
        />

        <ConsentBlock
          privacyAccepted={privacyAccepted}
          marketingConsent={marketingConsent}
          notifyOrderStatus={notifyOrderStatus}
          onPrivacyChange={setPrivacyAccepted}
          onMarketingChange={setMarketingConsent}
          onNotifyOrderChange={setNotifyOrderStatus}
        />

        {error && (
          <p role="alert" className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <Button type="submit" fullWidth disabled={!privacyAccepted || loading}>
          {loading ? "Criando..." : "Criar conta"}
        </Button>
      </form>

      <p className="text-center text-sm">
        <Link to="/login" className="font-semibold text-brand">
          Já tenho conta
        </Link>
      </p>
    </section>
  );
}
