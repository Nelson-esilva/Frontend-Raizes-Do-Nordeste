import type { OrderStatus } from "@/types";

const steps: { key: OrderStatus; label: string }[] = [
  { key: "recebido", label: "Recebido" },
  { key: "em_preparo", label: "Em preparo" },
  { key: "pronto", label: "Pronto" },
  { key: "retirado", label: "Retirado" },
];

export function OrderStatusStepper({ status }: { status: OrderStatus }) {
  const current = steps.findIndex((s) => s.key === status);

  return (
    <ol className="relative flex justify-between">
      <span
        aria-hidden
        className="absolute left-4 right-4 top-4 -z-0 h-0.5 bg-line"
      />
      {steps.map((step, i) => {
        const done = i <= current;
        return (
          <li
            key={step.key}
            className="relative z-10 flex flex-1 flex-col items-center gap-2"
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition ${
                done
                  ? "bg-brand text-white shadow-sm"
                  : "border border-line bg-paper text-muted"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`text-center text-[10px] font-semibold leading-tight sm:text-xs ${
                done ? "text-ink" : "text-muted"
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
