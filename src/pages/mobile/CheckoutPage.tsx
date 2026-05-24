import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useChannel } from "@/context/ChannelContext";
import { useUnit } from "@/context/UnitContext";
import { createOrder, updateOrderPayment } from "@/services/orderService";
import {
  processPayment,
  type PaymentMethod,
  type PaymentOutcome,
} from "@/services/paymentService";

const methods: { id: PaymentMethod; label: string; desc: string }[] = [
  { id: "pix", label: "PIX", desc: "Aprovação instantânea (parceiro externo)" },
  { id: "debito", label: "Débito", desc: "Direto na conta" },
  { id: "credito", label: "Crédito", desc: "Em até 3x sem juros" },
  {
    id: "retirada",
    label: "Pagar na retirada",
    desc: "Pagamento no balcão ao retirar o pedido",
  },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { isTotem } = useChannel();
  const { unit } = useUnit();
  const cart = useCart();
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [phase, setPhase] = useState<"pick" | "processing" | "done">("pick");
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!unit) {
    navigate("/unidades");
    return null;
  }

  if (!user && !isTotem) {
    navigate("/login");
    return null;
  }

  async function pay(outcome: PaymentOutcome) {
    const order = createOrder({
      userId: user?.id,
      unitId: unit!.id,
      unitName: unit!.name,
      items: cart.items,
      subtotal: cart.subtotal,
      discount: cart.discount,
      total: cart.total,
    });
    setOrderId(order.id);
    setPhase("processing");

    const status =
      method === "retirada" && outcome === "aprovado"
        ? ("aprovado" as const)
        : await processPayment(outcome);

    updateOrderPayment(
      order.id,
      status,
      status === "aprovado" && user
        ? Math.floor(cart.total)
        : undefined,
    );

    if (status === "aprovado") {
      if (user) {
        const newPoints =
          user.points - cart.redeemPoints + Math.floor(cart.total);
        updateUser({ points: newPoints });
      }
      cart.clear();
      navigate(`/pedido/${order.id}`);
      return;
    }

    setPhase("done");
    setMessage(
      status === "recusado"
        ? "Pagamento não autorizado. Verifique os dados ou tente outra forma."
        : "Instabilidade no processamento. O pedido segue aguardando pagamento.",
    );
  }

  if (phase === "processing") {
    return (
      <div className="grid place-items-center py-20">
        <Spinner
          label={
            method === "retirada"
              ? "Registrando pedido para pagamento na retirada..."
              : "Processando pagamento no parceiro certificado..."
          }
        />
      </div>
    );
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className="space-y-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            RF07 · Pagamento externo
          </p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Como você quer pagar?
          </h1>
          <p className="mt-1 text-sm text-muted">
            {isTotem
              ? "Totem: login opcional. Informe CPF no balcão para pontos."
              : "Não armazenamos dados de cartão. Transação via parceiro certificado."}
          </p>
        </header>

        {phase === "pick" && (
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="sr-only">Forma de pagamento</legend>
            {methods.map((m) => {
              const active = method === m.id;
              return (
                <label
                  key={m.id}
                  className={`cursor-pointer rounded-2xl border bg-paper p-4 shadow-sm transition ${
                    active
                      ? "border-brand ring-2 ring-brand/30"
                      : "border-line hover:border-brand/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={active}
                    onChange={() => setMethod(m.id)}
                    className="sr-only"
                  />
                  <p className="font-display text-lg font-semibold text-ink">
                    {m.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">{m.desc}</p>
                </label>
              );
            })}
          </fieldset>
        )}

        {phase === "pick" && method !== "retirada" && (
          <div className="rounded-2xl border border-dashed border-line bg-brand-soft/30 p-5">
            <p className="text-sm font-semibold text-ink">
              Pagamento simulado (parceiro externo)
            </p>
            <p className="mt-1 text-sm text-muted">
              Teste aprovação, recusa ou instabilidade. Nenhuma cobrança real.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => pay("aprovado")}>Simular aprovado</Button>
              <Button variant="ghost" onClick={() => pay("recusado")}>
                Simular recusado
              </Button>
              <Button variant="ghost" onClick={() => pay("timeout")}>
                Simular timeout
              </Button>
            </div>
          </div>
        )}

        {phase === "pick" && method === "retirada" && (
          <Button fullWidth size="lg" onClick={() => pay("aprovado")}>
            Confirmar pedido — pagar na retirada
          </Button>
        )}

        {phase === "done" && message && (
          <div className="space-y-3 rounded-2xl border border-danger/20 bg-danger/5 p-5">
            <p className="font-semibold text-danger">{message}</p>
            <div className="flex flex-wrap gap-2">
              {orderId && (
                <Button onClick={() => navigate(`/pedido/${orderId}`)}>
                  Ver pedido
                </Button>
              )}
              <Button variant="ghost" onClick={() => setPhase("pick")}>
                Tentar novamente
              </Button>
            </div>
          </div>
        )}
      </div>

      <aside className="lg:sticky lg:top-24">
        <CartSummary
          subtotal={cart.subtotal}
          discount={cart.discount}
          total={cart.total}
          promoCode={cart.promoCode}
          pointsUsed={cart.redeemPoints}
        />
        <p className="mt-3 text-center text-xs text-muted">
          Retirada em {unit.name}
        </p>
      </aside>
    </section>
  );
}
