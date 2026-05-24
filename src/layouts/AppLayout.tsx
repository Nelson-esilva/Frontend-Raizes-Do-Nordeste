import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useChannel } from "@/context/ChannelContext";
import { useUnit } from "@/context/UnitContext";

const appNav = [
  { to: "/cardapio", label: "Cardápio" },
  { to: "/unidades", label: "Unidades" },
  { to: "/fidelidade", label: "Fidelidade", authOnly: true, appOnly: true },
  { to: "/promocoes", label: "Promoções", authOnly: true, appOnly: true },
];

const contaLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full border-2 border-danger px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
    isActive
      ? "bg-danger text-white shadow-sm"
      : "bg-danger/10 text-danger hover:bg-danger hover:text-white"
  }`;

export function AppLayout() {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { unit } = useUnit();
  const { isTotem, clearChannel } = useChannel();

  const nav = appNav.filter(
    (i) =>
      (!i.authOnly || user) &&
      (!i.appOnly || !isTotem),
  );

  const mobileNav: { to: string; label: string; highlight?: boolean }[] = [
    { to: "/inicio", label: "Início" },
    { to: "/cardapio", label: "Cardápio" },
    {
      to: "/carrinho",
      label: `Carrinho${itemCount > 0 ? ` (${itemCount})` : ""}`,
    },
    isTotem
      ? { to: "/unidades", label: "Unidade" }
      : { to: "/perfil", label: user ? "Conta" : "Conta", highlight: true },
  ];

  function trocarCanal() {
    clearChannel();
    navigate("/");
  }

  const bottomNavClass = (active: boolean, highlight?: boolean) => {
    if (highlight) {
      return `flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-center text-sm font-bold leading-tight md:min-h-[3.75rem] md:py-3 md:text-base lg:text-[1.05rem] ${
        active ? "text-danger" : "text-danger/85"
      }`;
    }
    return `flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-center text-sm font-semibold leading-tight md:min-h-[3.75rem] md:py-3 md:text-base lg:text-[1.05rem] ${
      active ? "text-brand" : "text-ink/75"
    }`;
  };

  return (
    <div
      className={`relative flex min-h-dvh flex-col ${isTotem ? "channel-totem" : "channel-app"}`}
    >
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm">
        <div className="app-shell-column border-b border-line">
          <div className="flex min-h-[3.5rem] items-center justify-between gap-3 px-4 py-2 md:min-h-[4rem] md:px-6 md:py-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:max-w-none md:gap-4">
              <NavLink
                to="/inicio"
                className="max-w-[7.5rem] min-w-0 truncate font-display text-sm font-bold text-brand sm:max-w-none sm:text-base md:text-lg"
              >
                Raízes do Nordeste
              </NavLink>

              <span
                className="hidden h-9 w-px shrink-0 bg-line sm:block"
                aria-hidden
              />

              <div className="flex shrink-0 flex-col items-start leading-tight">
                <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-brand sm:text-sm">
                  {isTotem ? "Totem" : "App / Web"}
                </span>
                <button
                  type="button"
                  onClick={trocarCanal}
                  className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-muted transition hover:text-brand"
                >
                  Alterar
                  <span aria-hidden className="text-sm leading-none">
                    ↓
                  </span>
                </button>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              {!isTotem && (
                <nav className="mr-1 hidden gap-4 lg:mr-2 lg:gap-5 md:flex">
                  {nav.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `whitespace-nowrap text-sm font-semibold lg:text-base ${
                          isActive ? "text-brand" : "text-ink/70 hover:text-brand"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              )}
              {unit && (
                <span className="hidden max-w-[140px] truncate text-sm font-medium text-muted lg:inline lg:max-w-[180px]">
                  {unit.name}
                </span>
              )}
              <NavLink
                to="/carrinho"
                className="rounded-full bg-paper px-3 py-2 text-sm font-semibold shadow-sm md:px-4 md:text-base"
              >
                Carrinho ({itemCount})
              </NavLink>
              {!isTotem && user && (
                <NavLink to="/perfil" className={contaLinkClass}>
                  Conta
                </NavLink>
              )}
              {!isTotem && !user && (
                <>
                  <NavLink
                    to="/cadastro"
                    className="hidden rounded-full border border-brand px-3 py-2 text-sm font-semibold text-brand md:inline"
                  >
                    Criar conta
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white md:text-base"
                  >
                    Entrar
                  </NavLink>
                </>
              )}
              {isTotem && !user && (
                <NavLink
                  to="/login"
                  className="whitespace-nowrap rounded-full border border-brand px-2.5 py-1.5 text-xs font-semibold text-brand sm:px-3 sm:py-2 sm:text-sm md:text-base"
                >
                  Login opcional
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 justify-center">
        <main className="app-shell-column flex-1 px-4 py-6 md:px-6">
          <Outlet />
        </main>
      </div>

      <nav className="sticky bottom-0 z-30 bg-surface/98 backdrop-blur-sm md:border-t md:border-line">
        <div className="app-shell-column border-t border-line bg-paper/95 md:bg-paper">
          <ul className="grid grid-cols-4">
            {mobileNav.map((item) => (
              <li key={item.to} className="min-w-0">
                <NavLink
                  to={item.to}
                  end={item.to === "/inicio"}
                  className={({ isActive }) =>
                    bottomNavClass(isActive, item.highlight)
                  }
                >
                  <span className="max-w-full truncate">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
