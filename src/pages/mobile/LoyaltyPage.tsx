import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export function LoyaltyPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="py-8 text-center">
        <p className="text-muted">Entre para ver e resgatar seus pontos.</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button>Entrar</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink">Fidelidade</h1>
      </header>

      <div className="rounded-2xl bg-brand p-6 text-center text-white">
        <p className="text-sm opacity-90">Saldo</p>
        <p className="font-display text-5xl font-bold">{user.points}</p>
        <p className="text-sm">pontos</p>
      </div>

      <p className="text-sm text-muted">
        1 ponto por R$ 1 em pedido pago. Resgate no carrinho: 100 pontos = R$
        1,00 de desconto.
      </p>

      <Link to="/carrinho">
        <Button fullWidth>Usar pontos no pedido</Button>
      </Link>
    </section>
  );
}
