import { useNavigate } from "react-router-dom";
import { useChannel, type Channel } from "@/context/ChannelContext";

const options: { id: Channel; title: string; desc: string }[] = [
  {
    id: "app",
    title: "APP MOBILE / WEB",
    desc: "Pedidos com login, fidelidade, promoções e acompanhamento no celular ou desktop.",
  },
  {
    id: "totem",
    title: "TOTEM",
    desc: "Autoatendimento na loja: botões amplos, fluxo rápido e login opcional.",
  },
];

export function ChannelSelectPage() {
  const navigate = useNavigate();
  const { setChannel } = useChannel();

  function choose(id: Channel) {
    setChannel(id);
    navigate("/inicio");
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-surface px-4 py-10">
      <div className="app-shell-column mx-auto w-full max-w-lg space-y-8 px-4">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Rede Raízes do Nordeste
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">
            Escolha o canal
          </h1>
          <p className="mt-2 text-sm text-muted">
            Selecione como você vai usar o sistema nesta demonstração.
          </p>
        </header>

        <div className="grid gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => choose(opt.id)}
              className="rounded-2xl border-2 border-brand bg-paper p-6 text-left shadow-sm transition hover:bg-brand-soft hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <p className="font-display text-xl font-bold text-brand md:text-2xl">
                {opt.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{opt.desc}</p>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted">
          Multicanalidade exigida pelo projeto: app/web responsivo e totem de
          autoatendimento.
        </p>
      </div>
    </div>
  );
}
