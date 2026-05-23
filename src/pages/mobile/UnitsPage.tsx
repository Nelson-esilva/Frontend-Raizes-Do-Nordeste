import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppImage } from "@/components/ui/AppImage";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { unitImage } from "@/constants/images";
import { useUnit } from "@/context/UnitContext";
import * as menuService from "@/services/menuService";
import type { Unit } from "@/types";

export function UnitsPage() {
  const navigate = useNavigate();
  const { unit, selectUnit } = useUnit();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    menuService.listUnits().then((data) => {
      setUnits(data);
      setLoading(false);
    });
  }, []);

  const filtered = units.filter(
    (u) =>
      u.city.toLowerCase().includes(filter.toLowerCase()) ||
      u.name.toLowerCase().includes(filter.toLowerCase()),
  );

  function pick(selected: Unit) {
    if (!selected.open) return;
    selectUnit(selected);
    navigate("/cardapio");
  }

  if (loading) return <Spinner label="Buscando unidades..." />;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          Encontre a sua unidade
        </p>
        <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
          Onde a tradição te espera
        </h1>
        <p className="max-w-2xl text-sm text-muted md:text-base">
          O cardápio muda conforme a loja e a sazonalidade. A geolocalização é
          opcional, você sempre pode escolher pela cidade.
        </p>
      </header>

      <div className="relative max-w-md">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
          ⌕
        </span>
        <input
          type="search"
          placeholder="Buscar por cidade ou bairro..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-full border border-line bg-paper py-3 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
        />
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => {
          const active = unit?.id === u.id;
          return (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => pick(u)}
                disabled={!u.open}
                className={`group flex w-full flex-col overflow-hidden rounded-3xl bg-paper text-left shadow-sm transition ${
                  u.open
                    ? "hover:-translate-y-0.5 hover:shadow-md"
                    : "opacity-60"
                } ${active ? "ring-2 ring-brand" : ""}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <AppImage
                    src={unitImage(u.id)}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3">
                    <Badge tone={u.open ? "ok" : "warn"}>
                      {u.open ? "Aberta agora" : "Fechada"}
                    </Badge>
                  </span>
                  {active && (
                    <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      Selecionada
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    {u.name}
                  </p>
                  <p className="text-sm text-muted">{u.address}</p>
                  <p className="text-xs text-muted">{u.hours}</p>
                  <span className="mt-auto pt-3 text-sm font-semibold text-brand group-hover:underline">
                    {u.open ? "Ver cardápio →" : "Fora do horário"}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-paper p-6 text-center text-sm text-muted">
          Nenhuma unidade encontrada para "{filter}". Tente outra cidade.
        </p>
      )}
    </section>
  );
}
