import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, id, className = "", ...props }: Props) {
  const fieldId = id ?? label.toLowerCase().replace(/\s/g, "-");
  return (
    <label htmlFor={fieldId} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </span>
      <input
        id={fieldId}
        className={`w-full rounded-xl border bg-paper px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/15 ${error ? "border-danger" : "border-line"} ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs font-semibold text-danger">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
