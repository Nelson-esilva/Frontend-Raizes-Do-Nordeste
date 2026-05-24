import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import * as authService from "@/services/authService";
import * as menuService from "@/services/menuService";
import type { Unit } from "@/types";

const metricsByUnit: Record<
  string,
  { sales: string; orders: string; top: string; points: string }
> = {
  "recife-centro": {
    sales: "R$ 4.280,00",
    orders: "186",
    top: "Tapioca de Frango",
    points: "2.340 pts",
  },
  "recife-boa-viagem": {
    sales: "R$ 3.120,00",
    orders: "142",
    top: "Cuscuz Recheado",
    points: "1.890 pts",
  },
  "fortaleza-aldeota": {
    sales: "R$ 2.950,00",
    orders: "118",
    top: "Café da Manhã Nordestino",
    points: "1.560 pts",
  },
};

const defaultMetrics = {
  sales: "R$ 0,00",
  orders: "0",
  top: "—",
  points: "0 pts",
};

export function ManagerDashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [unitId, setUnitId] = useState("");

  useEffect(() => {
    menuService.listUnits().then((data) => {
      setUnits(data);
      if (data[0]) setUnitId(data[0].id);
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    const ok = await authService.verifyManagerAccess(email, password);
    setLoading(false);
    if (!ok) {
      setLoginError("Credenciais de gerente inválidas.");
      return;
    }
    setAuthed(true);
  }

  if (!authed) {
    return (
      <section className="mx-auto max-w-md space-y-4">
        <header>
          <h1 className="font-display text-2xl font-bold text-ink">
            Painel do gerente (RF13)
          </h1>
          <p className="mt-1 text-sm text-muted">
            Acesso restrito. Demo: gerente@raizes.com / Gerente@123
          </p>
        </header>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loginError && (
            <p className="text-sm text-danger" role="alert">
              {loginError}
            </p>
          )}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Verificando..." : "Entrar no painel"}
          </Button>
        </form>
        <Link to="/inicio" className="block text-center text-sm text-brand">
          ← Voltar
        </Link>
      </section>
    );
  }

  if (!unitId) return <Spinner />;

  const selected = units.find((u) => u.id === unitId);
  const m = metricsByUnit[unitId] ?? defaultMetrics;

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            Painel do gerente
          </h1>
          <p className="mt-1 text-sm text-muted">
            Métricas por unidade (dados simulados).
          </p>
        </div>
        <Button variant="ghost" onClick={() => setAuthed(false)}>
          Sair
        </Button>
      </header>

      <label className="block text-sm">
        <span className="font-semibold text-ink">Unidade</span>
        <select
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="mt-1 w-full max-w-md rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} · {u.city}
            </option>
          ))}
        </select>
      </label>

      {selected && (
        <p className="text-sm text-muted">
          {selected.address} · {selected.hours}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Vendas hoje", value: m.sales },
          { label: "Pedidos no período", value: m.orders },
          { label: "Produto mais vendido", value: m.top },
          { label: "Pontos emitidos (fidelidade)", value: m.points },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-line bg-paper p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-muted">{item.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-brand">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <Link to="/inicio" className="text-sm font-semibold text-brand">
        ← Voltar ao início
      </Link>
    </section>
  );
}
