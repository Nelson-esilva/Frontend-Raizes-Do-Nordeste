import type { PaymentStatus } from "@/types";
import { delay } from "./delay";

export type PaymentMethod = "pix" | "debito" | "credito";

export type PaymentOutcome = "aprovado" | "recusado" | "timeout";

export async function processPayment(
  outcome: PaymentOutcome,
): Promise<PaymentStatus> {
  await delay(outcome === "timeout" ? 3200 : 1800);
  if (outcome === "aprovado") return "aprovado";
  if (outcome === "recusado") return "recusado";
  return "timeout";
}
