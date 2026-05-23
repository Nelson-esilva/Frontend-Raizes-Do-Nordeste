import { Link } from "react-router-dom";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { useUnit } from "@/context/UnitContext";

const fluxo = [
  {
    id: "unidade",
    label: "Escolher unidade",
    desc: "Encontre a loja mais perto de você",
    to: "/unidades",
    image: IMAGES.flow.unit,
  },
  {
    id: "cardapio",
    label: "Ver cardápio",
    desc: "Tapiocas, cuscuz e sabores do Nordeste",
    to: "/cardapio",
    needsUnit: true,
    image: IMAGES.flow.menu,
  },
  {
    id: "pedido",
    label: "Montar pedido",
    desc: "Revise itens e personalizações",
    to: "/carrinho",
    image: IMAGES.flow.cart,
  },
  {
    id: "pagamento",
    label: "Pagar pedido",
    desc: "Pix, cartão ou pagamento na retirada",
    to: "/checkout",
    needsAuth: true,
    image: IMAGES.flow.payment,
  },
  {
    id: "status",
    label: "Acompanhar pedido",
    desc: "Status em tempo real no seu perfil",
    to: "/perfil",
    needsAuth: true,
    image: IMAGES.flow.status,
  },
];

type FluxoStep = (typeof fluxo)[number];

const destaques = [
  { name: "Tapioca de Frango", image: IMAGES.products.tapioca },
  { name: "Cuscuz Recheado", image: IMAGES.products.cuscuz },
  { name: "Carne de Sol", image: IMAGES.products.meat },
  { name: "Suco de Acerola", image: IMAGES.products.juice },
];

export function AppHomePage() {
  const { user } = useAuth();
  const { unit } = useUnit();

  const pedidoCta = unit ? "/cardapio" : "/unidades";

  return (
    <section className="mx-auto max-w-2xl space-y-10 pb-8 md:max-w-4xl">
      <div className="relative -mx-4 overflow-hidden rounded-none md:-mx-6 md:rounded-3xl">
        <div className="relative aspect-[16/10] min-h-[220px] sm:aspect-[2/1]">
          <AppImage
            src={IMAGES.hero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/25" />
          <div className="bg-pattern absolute inset-0 opacity-80" />

          <div className="relative flex h-full flex-col justify-end p-6 text-white md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-soft/90">
              Rede Raízes do Nordeste
            </p>
            <h1 className="mt-2 max-w-md font-display text-3xl font-bold leading-tight md:text-4xl">
              Sabores do Nordeste na palma da mão
            </h1>
            <p className="mt-2 max-w-sm text-sm text-white/85 md:text-base">
              Peça, acompanhe e acumule pontos nas nossas lanchonetes.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {!user ? (
                <>
                  <Link to="/cadastro">
                    <Button size="lg" className="shadow-lg shadow-ink/30">
                      Criar conta
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      Entrar
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to={pedidoCta}>
                  <Button size="lg" className="shadow-lg shadow-ink/30">
                    {unit ? "Ver cardápio" : "Começar pedido"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {unit && (
        <div className="flex items-center gap-3 rounded-2xl border border-brand/20 bg-brand-soft p-4 shadow-sm">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-lg text-white">
            📍
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">
              Unidade selecionada
            </p>
            <p className="truncate font-semibold text-ink">{unit.name}</p>
            <p className="text-xs text-muted">{unit.city}</p>
          </div>
          <Link
            to="/unidades"
            className="shrink-0 text-sm font-semibold text-brand hover:underline"
          >
            Trocar
          </Link>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Cardápio
            </p>
            <h2 className="font-display text-xl font-bold text-ink">
              Destaques da casa
            </h2>
          </div>
          <Link
            to={unit ? "/cardapio" : "/unidades"}
            className="text-sm font-semibold text-brand hover:underline"
          >
            Ver tudo →
          </Link>
        </div>

        <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:-mx-0 md:px-0">
          {destaques.map((item) => (
            <li key={item.name} className="w-[140px] shrink-0 sm:w-[160px]">
              <Link
                to={unit ? "/cardapio" : "/unidades"}
                className="group block overflow-hidden rounded-2xl bg-paper shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden">
                  <AppImage
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="line-clamp-2 px-2.5 py-2 text-xs font-semibold text-ink">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Passo a passo
          </p>
          <h2 className="font-display text-xl font-bold text-ink">
            Como fazer seu pedido
          </h2>
        </div>

        <nav aria-label="Fluxo do pedido" className="grid gap-3 sm:grid-cols-2">
          {fluxo.map((step: FluxoStep, index) => {
            const needsUnit = "needsUnit" in step && step.needsUnit;
            const needsAuth = "needsAuth" in step && step.needsAuth;
            const blocked = (needsUnit && !unit) || (needsAuth && !user);
            const to = blocked
              ? needsUnit
                ? "/unidades"
                : "/login"
              : step.to;

            return (
              <Link
                key={step.id}
                to={to}
                className="group flex overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition hover:border-brand/30 hover:shadow-md"
              >
                <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <AppImage
                    src={step.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white shadow">
                    {index + 1}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink group-hover:text-brand">
                      {step.label}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                      {step.desc}
                    </p>
                    {blocked && (
                      <p className="mt-1 text-[11px] font-medium text-accent">
                        {needsUnit ? "Selecione uma unidade" : "Faça login"}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {user && (
        <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/fidelidade"
                className="relative overflow-hidden rounded-2xl border border-line shadow-sm transition hover:shadow-md"
              >
                <AppImage
                  src={IMAGES.promo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative bg-gradient-to-br from-accent/90 to-brand p-5 text-white">
                  <p className="font-display text-lg font-bold">Fidelidade</p>
                  <p className="mt-1 text-sm text-white/90">
                    {user.points} pontos disponíveis
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold">
                    Resgatar →
                  </span>
                </div>
              </Link>
              <Link
                to="/promocoes"
                className="relative overflow-hidden rounded-2xl border border-line shadow-sm transition hover:shadow-md"
              >
                <AppImage
                  src={IMAGES.promo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative bg-gradient-to-r from-ink/88 to-ink/55 p-5 text-white">
                  <p className="font-display text-lg font-bold">Promoções</p>
                  <p className="mt-1 text-sm text-white/85">
                    Cupons e campanhas para você
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-brand-soft">
                    Ver ofertas →
                  </span>
                </div>
              </Link>
        </div>
      )}

      {!user && (
        <div className="rounded-2xl border border-line bg-paper p-4 text-center text-sm">
          <p className="text-muted">
            Já tem unidade em mente? Você pode{" "}
            <Link to="/unidades" className="font-semibold text-brand hover:underline">
              escolher a loja
            </Link>
            , mas precisará entrar ou cadastrar-se para concluir o pedido.
          </p>
        </div>
      )}

      <p className="text-center text-xs text-muted">
        <Link to="/gerente" className="underline hover:text-brand">
          Área do gerente
        </Link>
        {" · "}
        <Link to="/privacidade" className="underline hover:text-brand">
          Política de Privacidade
        </Link>
      </p>
    </section>
  );
}
