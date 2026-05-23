const metrics = [
  { label: "Vendas hoje (Recife, Centro)", value: "R$ 4.280,00" },
  { label: "Pedidos no período", value: "186" },
  { label: "Produto mais vendido", value: "Tapioca de Frango" },
  { label: "Pontos emitidos (fidelidade)", value: "2.340 pts" },
];

export function ManagerDashboardPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink">
          Painel do gerente
        </h1>
        <p className="mt-1 text-sm text-muted">
          Indicadores de vendas e fidelização da rede (dados simulados).
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-line bg-paper p-4 shadow-sm"
          >
            <p className="text-xs font-semibold text-muted">{m.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-brand">
              {m.value}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
