import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "@/components/product/ProductCard";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useUnit } from "@/context/UnitContext";
import * as menuService from "@/services/menuService";
import { getCampaignsForUser } from "@/services/promotionService";
import type { Campaign, Product } from "@/types";

export function MenuPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unit } = useUnit();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unit) {
      navigate("/unidades", { replace: true });
      return;
    }
    setLoading(true);
    menuService.getMenuByUnit(unit.id).then((data) => {
      setProducts(data);
      setLoading(false);
    });
    getCampaignsForUser(user).then(setCampaigns);
  }, [unit, navigate, user]);

  if (!unit) {
    return (
      <p className="text-sm text-muted">
        Selecione uma unidade para ver o cardápio disponível.
      </p>
    );
  }

  const categories = menuService.getCategories(products);
  const visible = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <section className="space-y-8">
      {campaigns.length > 0 && (
        <div className="rounded-xl border border-brand/30 bg-brand-soft p-3 text-sm">
          <p className="font-semibold text-brand">Campanhas para você</p>
          <ul className="mt-1 space-y-1 text-ink/80">
            {campaigns.slice(0, 2).map((c) => (
              <li key={c.id}>
                {c.title}
                {c.code ? ` · ${c.code}` : ""}
              </li>
            ))}
          </ul>
          <Link to="/promocoes" className="mt-2 inline-block text-xs font-semibold text-brand">
            Ver todas →
          </Link>
        </div>
      )}

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Cardápio · {unit.city}
          </p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
            {unit.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {unit.hours} · {unit.address}
          </p>
        </div>
        <Link
          to="/unidades"
          className="text-sm font-semibold text-brand hover:underline"
        >
          Trocar unidade →
        </Link>
      </header>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        <Chip
          active={!category}
          onClick={() => setCategory(null)}
          label="Todos"
        />
        {categories.map((cat) => (
          <Chip
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
            label={cat}
          />
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-paper p-6 text-center text-sm text-muted">
          Nenhum produto nesta categoria.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              basePath=""
              onQuickAdd={
                p.available
                  ? () =>
                      addItem({
                        productId: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                      })
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-brand bg-brand text-white shadow-sm"
          : "border-line bg-paper text-ink/70 hover:border-brand/40 hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}
