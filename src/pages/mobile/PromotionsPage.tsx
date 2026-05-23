import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getCampaignsForUser } from "@/services/promotionService";
import type { Campaign } from "@/types";

export function PromotionsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    getCampaignsForUser(user).then(setCampaigns);
  }, [user]);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink">
          Campanhas para você
        </h1>
        <p className="mt-1 text-sm text-muted">
          Ofertas segmentadas por perfil: novo cliente, frequência, aniversário
          ou campanha geral.
        </p>
      </header>

      <ul className="space-y-3">
        {campaigns.map((c) => (
          <li
            key={c.id}
            className="rounded-2xl border border-line bg-paper p-4 shadow-sm"
          >
            <span className="text-[11px] font-bold uppercase text-muted">
              {c.segment}
            </span>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {c.title}
            </p>
            <p className="mt-1 text-sm text-muted">{c.description}</p>
            {c.code && (
              <p className="mt-2 text-sm font-bold text-brand">
                Cupom: {c.code}
              </p>
            )}
          </li>
        ))}
      </ul>

      {campaigns.length === 0 && (
        <p className="text-sm text-muted">Nenhuma campanha no momento.</p>
      )}

      <Link to="/cardapio">
        <Button fullWidth>Ir ao cardápio</Button>
      </Link>
    </section>
  );
}
