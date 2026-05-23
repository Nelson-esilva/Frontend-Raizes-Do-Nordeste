import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OrderStatusStepper } from "@/components/order/OrderStatusStepper";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import {
  advanceOrderStatus,
  getOrder,
  getStatusLabel,
} from "@/services/orderService";
import type { Order } from "@/types";

export function OrderStatusPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { push } = useNotification();
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    if (id) setOrder(getOrder(id));
  }, [id]);

  if (!order) {
    return (
      <p className="text-muted">Pedido não encontrado.</p>
    );
  }

  function simulateProgress() {
    if (!id) return;
    const next = advanceOrderStatus(id);
    if (!next) return;
    setOrder({ ...next });

    if (user?.notifyOrderStatus) {
      push(`Pedido ${next.id}: ${getStatusLabel(next.status)}`);
    }
    if (user?.notifyPromotions && next.status === "retirado") {
      push("Obrigado! Confira promoções na aba Promoções.");
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink">
          Status do pedido {order.id}
        </h1>
        <p className="text-sm text-muted">{order.unitName}</p>
      </header>

      {order.paymentStatus === "aprovado" ? (
        <>
          <OrderStatusStepper status={order.status} />
          <p className="text-center text-sm text-muted">
            Acompanhamento em tempo real (simulado).
          </p>
          {order.status !== "retirado" && (
            <Button fullWidth variant="secondary" onClick={simulateProgress}>
              Simular próxima etapa
            </Button>
          )}
          {order.pointsEarned !== undefined && user && (
            <p className="text-center text-sm text-success">
              +{order.pointsEarned} pontos creditados
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-danger">Pagamento não confirmado.</p>
      )}

      <Link to="/" className="block text-center text-sm font-semibold text-brand">
        Voltar ao início
      </Link>
    </section>
  );
}
