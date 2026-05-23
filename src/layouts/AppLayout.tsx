import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useUnit } from "@/context/UnitContext";

const appNav = [
  { to: "/cardapio", label: "Cardápio" },
  { to: "/unidades", label: "Unidades" },
  { to: "/fidelidade", label: "Fidelidade", authOnly: true },
  { to: "/promocoes", label: "Promoções", authOnly: true },
];

const contaLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full border-2 border-danger px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
    isActive
      ? "bg-danger text-white shadow-sm"
      : "bg-danger/10 text-danger hover:bg-danger hover:text-white"
  }`;

export function AppLayout() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { unit } = useUnit();

  const nav = appNav.filter((i) => !i.authOnly || user);

  const mobileNav: { to: string; label: string; highlight?: boolean }[] = [
    { to: "/cardapio", label: "Cardápio" },
    user
      ? {
          to: "/carrinho",
          label: `Carrinho${itemCount > 0 ? ` (${itemCount})` : ""}`,
        }
      : { to: "/unidades", label: "Unidades" },
    { to: "/perfil", label: "Conta", highlight: true },
  ];

  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30">
        <div className="app-shell-column border-b border-line">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <NavLink to="/" className="font-display text-lg font-bold text-brand">
              Raízes do Nordeste
            </NavLink>

            <nav className="hidden gap-4 md:flex">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold ${isActive ? "text-brand" : "text-muted hover:text-ink"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              {user ? (
                <>
                  {unit && (
                    <span className="hidden max-w-[100px] truncate text-xs font-medium text-muted sm:inline sm:max-w-[140px] md:text-sm">
                      {unit.name}
                    </span>
                  )}
                  <NavLink
                    to="/carrinho"
                    className="rounded-full bg-paper px-3 py-1.5 text-sm font-semibold shadow-sm"
                  >
                    Carrinho ({itemCount})
                  </NavLink>
                  <NavLink to="/perfil" className={contaLinkClass}>
                    Conta
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/cadastro"
                    className="rounded-full border border-brand px-3 py-1.5 text-xs font-semibold text-brand sm:text-sm"
                  >
                    Criar conta
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white sm:text-sm"
                  >
                    Entrar
                  </NavLink>
                </>
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

      <nav className="sticky bottom-0 z-30">
        <div className="app-shell-column border-t border-line">
          <ul className="grid grid-cols-4">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block py-3 text-center text-[11px] font-semibold ${isActive ? "text-brand" : "text-muted"}`
                }
              >
                Início
              </NavLink>
            </li>
            {mobileNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    item.highlight
                      ? `block py-3 text-center text-[11px] font-bold ${
                          isActive ? "text-danger" : "text-danger/80"
                        }`
                      : `block py-3 text-center text-[11px] font-semibold ${
                          isActive ? "text-brand" : "text-muted"
                        }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
