type Props = {
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string | null;
  pointsUsed?: number;
};

function brl(v: number) {
  return v.toFixed(2).replace(".", ",");
}

export function CartSummary({
  subtotal,
  discount,
  total,
  promoCode,
  pointsUsed = 0,
}: Props) {
  return (
    <div className="rounded-2xl bg-paper p-5 shadow-sm">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted">
        Resumo do pedido
      </p>
      <dl className="space-y-1.5 text-sm">
        <Row label="Subtotal" value={`R$ ${brl(subtotal)}`} />
        {promoCode && (
          <Row label={`Cupom ${promoCode}`} value="aplicado" highlight />
        )}
        {pointsUsed > 0 && (
          <Row
            label="Pontos resgatados"
            value={`- R$ ${brl(pointsUsed / 100)}`}
            highlight
          />
        )}
        {discount > 0 && (
          <Row label="Desconto" value={`- R$ ${brl(discount)}`} highlight />
        )}
      </dl>
      <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
        <span className="text-sm font-semibold text-ink">Total</span>
        <span className="font-display text-2xl font-bold text-brand">
          R$ {brl(total)}
        </span>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${highlight ? "text-success font-semibold" : "text-ink/80"}`}
    >
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
