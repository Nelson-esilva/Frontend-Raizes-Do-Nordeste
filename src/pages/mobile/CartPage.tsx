import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartSummary } from "@/components/cart/CartSummary";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useChannel } from "@/context/ChannelContext";
import { useUnit } from "@/context/UnitContext";
import { validateCode } from "@/services/promotionService";

export function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isTotem } = useChannel();
  const { unit } = useUnit();
  const cart = useCart();
  const [codeInput, setCodeInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  async function applyCode() {
    if (!codeInput.trim()) return;
    const promo = await validateCode(codeInput);
    if (!promo) {
      setPromoMsg({ type: "err", text: "Cupom inválido." });
      cart.clearPromo();
      return;
    }
    cart.applyPromo(promo.code, promo.discountPercent);
    setPromoMsg({ type: "ok", text: `Cupom ${promo.code} aplicado.` });
  }

  function goCheckout() {
    if (!user && !isTotem) {
      navigate("/login");
      return;
    }
    if (!unit) {
      navigate("/unidades");
      return;
    }
    navigate("/checkout");
  }

  if (cart.items.length === 0) {
    return (
      <section className="mx-auto max-w-md py-12 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-3xl">
          🛒
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-sm text-muted">
          Que tal começar por uma tapioca quentinha?
        </p>
        <Link to="/cardapio" className="mt-6 inline-block">
          <Button>Ver cardápio</Button>
        </Link>
      </section>
    );
  }

  const maxRedeem = user
    ? Math.min(user.points, Math.floor(cart.subtotal * 100))
    : 0;

  return (
    <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className="space-y-5">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            {unit ? `Retirada · ${unit.name}` : "Selecione uma unidade"}
          </p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Seu pedido
          </h1>
        </header>

        <ul className="space-y-3">
          {cart.items.map((item) => (
            <li
              key={item.productId}
              className="flex gap-4 rounded-2xl bg-paper p-3 shadow-sm"
            >
              <AppImage
                src={item.image}
                alt=""
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-base font-semibold text-ink">
                    {item.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => cart.removeItem(item.productId)}
                    className="text-xs font-semibold text-muted hover:text-danger"
                  >
                    Remover
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border border-line bg-surface">
                    <button
                      type="button"
                      onClick={() =>
                        cart.setQuantity(item.productId, item.quantity - 1)
                      }
                      className="h-8 w-8 rounded-full text-lg font-bold text-ink/70 hover:text-brand"
                      aria-label="Diminuir"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        cart.setQuantity(item.productId, item.quantity + 1)
                      }
                      className="h-8 w-8 rounded-full text-lg font-bold text-ink/70 hover:text-brand"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-brand">
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-paper p-4 shadow-sm">
          <p className="text-sm font-semibold text-ink">Cupom de desconto</p>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Ex: NORDESTE10"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              className="flex-1 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm uppercase outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
            <Button type="button" variant="secondary" onClick={applyCode}>
              Aplicar
            </Button>
          </div>
          {promoMsg && (
            <p
              className={`mt-2 text-xs font-semibold ${
                promoMsg.type === "ok" ? "text-success" : "text-danger"
              }`}
            >
              {promoMsg.text}
            </p>
          )}
        </div>

        {user && user.points > 0 && (
          <div className="rounded-2xl bg-paper p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">Resgatar pontos</span>
              <span className="text-muted">
                {cart.redeemPoints} / {user.points} pts
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={maxRedeem}
              value={cart.redeemPoints}
              onChange={(e) => cart.setRedeemPoints(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--color-brand)]"
            />
            <p className="mt-1 text-xs text-muted">
              100 pontos equivalem a R$ 1,00.
            </p>
          </div>
        )}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <CartSummary
          subtotal={cart.subtotal}
          discount={cart.discount}
          total={cart.total}
          promoCode={cart.promoCode}
          pointsUsed={cart.redeemPoints}
        />
        <Button fullWidth size="lg" onClick={goCheckout}>
          {!user && !isTotem
            ? "Entrar e confirmar pedido"
            : "Confirmar pedido"}
        </Button>
        <p className="text-center text-xs text-muted">
          Pagamento processado por parceiro certificado. Você poderá escolher
          PIX, débito ou crédito no próximo passo.
        </p>
      </aside>
    </section>
  );
}
