export function Spinner({ label = "Carregando..." }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-3 py-12 text-muted"
    >
      <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand/30 border-t-brand" />
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}
