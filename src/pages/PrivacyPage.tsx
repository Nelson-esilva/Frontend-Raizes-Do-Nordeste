import { Link } from "react-router-dom";

const rights = [
  "Acessar e corrigir seus dados a qualquer momento no perfil",
  "Revogar consentimento de marketing sem impacto na conta",
  "Solicitar exclusão e anonimização (Art. 18 LGPD)",
  "Saber com quais parceiros seus dados foram compartilhados",
];

export function PrivacyPage() {
  return (
    <div className="flex min-h-dvh justify-center">
      <div className="app-shell-column flex-1 px-6 py-10 md:px-8 md:py-16">
        <article className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="text-sm font-semibold text-brand hover:underline"
      >
        ← Voltar ao início
      </Link>

      <header className="mt-6 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          Privacidade primeiro
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="text-base text-muted">
          Como tratamos seus dados pessoais neste serviço.
        </p>
      </header>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-ink/80">
        <p>
          A Rede Raízes do Nordeste trata dados pessoais para autenticação,
          processamento de pedidos e programa de fidelização, conforme a Lei
          Geral de Proteção de Dados (Lei 13.709/2018).
        </p>
        <p>
          Coletamos nome, e-mail, telefone e data de nascimento no momento do
          cadastro. Dados de pagamento são processados exclusivamente por
          parceiros certificados, sem armazenamento de cartão nesta interface.
          Comunicações de marketing dependem de opt-in explícito e podem ser
          revogadas a qualquer momento.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">
          Seus direitos como titular
        </h2>
        <ul className="mt-4 space-y-2">
          {rights.map((r) => (
            <li
              key={r}
              className="flex items-start gap-3 rounded-xl bg-paper p-4 text-sm text-ink/80 shadow-sm"
            >
              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success">
                ✓
              </span>
              {r}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-xs text-muted">
        Em caso de dúvidas sobre seus dados, entre em contato pelo canal
        indicado no aplicativo ou na unidade.
      </p>
        </article>
      </div>
    </div>
  );
}
