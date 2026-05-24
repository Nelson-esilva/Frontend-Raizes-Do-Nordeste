import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppImage } from "@/components/ui/AppImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useCart } from "@/context/CartContext";
import * as menuService from "@/services/menuService";
import type { Product, ProductOption } from "@/types";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<ProductOption | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    menuService.getProduct(id).then((p) => {
      setProduct(p ?? null);
      if (p?.options?.[0]) setOption(p.options[0]);
    });
  }, [id]);

  if (!product) return <Spinner />;

  const item = product;
  const unitPrice = item.price + (option?.priceExtra ?? 0);
  const needsOption = (item.options?.length ?? 0) > 0;

  function handleAdd() {
    if (needsOption && !option) return;

    const label = option
      ? `${item.name} (${option.label})`
      : item.name;

    addItem(
      {
        productId: item.id,
        name: label,
        price: unitPrice,
        image: item.image,
        customization: option?.label,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="mx-auto max-w-3xl space-y-4">
      <Link to="/cardapio" className="text-sm font-semibold text-brand">
        ← Voltar ao cardápio
      </Link>

      <AppImage
        src={item.image}
        alt={item.name}
        className="aspect-video w-full rounded-2xl object-cover"
      />

      <div className="flex gap-2">
        {!item.available && <Badge tone="warn">Indisponível</Badge>}
        {item.available && !item.seasonal && <Badge tone="ok">Disponível</Badge>}
        {item.seasonal && <Badge tone="seasonal">Sazonal</Badge>}
      </div>

      <h1 className="font-display text-2xl font-bold text-ink">{item.name}</h1>
      <p className="text-muted">{item.description}</p>
      <p className="text-xl font-bold text-brand">
        R$ {unitPrice.toFixed(2).replace(".", ",")}
      </p>

      {item.available && item.options && item.options.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-ink">
            Personalização
          </legend>
          {item.options.map((o) => (
            <label
              key={o.id}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2"
            >
              <input
                type="radio"
                name="opt"
                checked={option?.id === o.id}
                onChange={() => setOption(o)}
              />
              <span className="text-sm">
                {o.label}
                {o.priceExtra
                  ? ` (+ R$ ${o.priceExtra.toFixed(2).replace(".", ",")})`
                  : ""}
              </span>
            </label>
          ))}
        </fieldset>
      )}

      {item.available && (
        <>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">Quantidade</span>
            <button
              type="button"
              className="h-9 w-9 rounded-lg bg-paper font-bold shadow-sm"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="font-bold">{qty}</span>
            <button
              type="button"
              className="h-9 w-9 rounded-lg bg-paper font-bold shadow-sm"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
          <Button fullWidth size="lg" onClick={handleAdd}>
            {added ? "Adicionado" : "Adicionar ao carrinho"}
          </Button>
        </>
      )}
    </section>
  );
}
