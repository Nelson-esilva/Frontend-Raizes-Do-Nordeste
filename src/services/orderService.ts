import type { CartItem, Order, OrderStatus } from "@/types";

let orderCounter = 1000;
const orders = new Map<string, Order>();

export function createOrder(params: {
  userId?: string;
  unitId: string;
  unitName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}): Order {
  orderCounter += 1;
  const order: Order = {
    id: `PED-${orderCounter}`,
    userId: params.userId,
    unitId: params.unitId,
    unitName: params.unitName,
    items: params.items,
    subtotal: params.subtotal,
    discount: params.discount,
    total: params.total,
    status: "recebido",
    paymentStatus: "pendente",
    createdAt: new Date().toISOString(),
  };
  orders.set(order.id, order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function listOrdersByUser(userId: string): Order[] {
  return [...orders.values()]
    .filter((o) => o.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function updateOrderPayment(
  id: string,
  paymentStatus: Order["paymentStatus"],
  pointsEarned?: number,
): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;
  order.paymentStatus = paymentStatus;
  if (paymentStatus === "aprovado") {
    order.pointsEarned = pointsEarned ?? Math.floor(order.total);
  }
  orders.set(id, order);
  return order;
}

const statusLabels: Record<OrderStatus, string> = {
  recebido: "Pedido recebido",
  em_preparo: "Em preparo",
  pronto: "Pronto para retirada",
  retirado: "Retirado",
};

export function getStatusLabel(status: OrderStatus) {
  return statusLabels[status];
}

export function advanceOrderStatus(id: string): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;
  const flow: OrderStatus[] = [
    "recebido",
    "em_preparo",
    "pronto",
    "retirado",
  ];
  const idx = flow.indexOf(order.status);
  if (idx < flow.length - 1) {
    order.status = flow[idx + 1];
    orders.set(id, order);
  }
  return order;
}
