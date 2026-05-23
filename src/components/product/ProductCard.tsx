import { useState } from "react";
import { Link } from "react-router-dom";
import { AppImage } from "@/components/ui/AppImage";
import { Badge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import type { Product } from "@/types";

type Props = {
  product: Product;
  basePath: string;
  onQuickAdd?: () => void;
};

export function ProductCard({ product, basePath, onQuickAdd }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const detailPath = basePath
    ? `${basePath}/produto/${product.id}`
    : `/produto/${product.id}`;

  function handleConfirm() {
    onQuickAdd?.();
    setConfirmOpen(false);
  }

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl bg-paper shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <Link to={detailPath} className="relative block aspect-[4/3] overflow-hidden">
          <AppImage
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex gap-1">
            {!product.available && <Badge tone="warn">Indisponível</Badge>}
            {product.seasonal && product.available && (
              <Badge tone="seasonal">Sazonal</Badge>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-1 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            {product.category}
          </p>
          <Link to={detailPath} className="flex-1">
            <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-ink">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="font-bold text-brand">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            {product.available && onQuickAdd && (
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                aria-label={`Adicionar ${product.name} ao carrinho`}
                className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white shadow-sm transition hover:bg-brand-dark"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-4 w-4"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </article>

      <ConfirmModal
        open={confirmOpen}
        title="Adicionar ao carrinho?"
        message={`Deseja adicionar "${product.name}" ao seu pedido?`}
        confirmLabel="Adicionar"
        cancelLabel="Não"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
