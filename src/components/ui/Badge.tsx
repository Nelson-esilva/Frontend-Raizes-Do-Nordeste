type Tone = "ok" | "warn" | "muted" | "seasonal";

const tones: Record<Tone, string> = {
  ok: "bg-success/15 text-success",
  warn: "bg-danger/15 text-danger",
  muted: "bg-ink/10 text-ink/70",
  seasonal: "bg-accent/20 text-brand-dark",
};

export function Badge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
