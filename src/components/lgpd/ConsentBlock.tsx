import { Link } from "react-router-dom";

type Props = {
  privacyAccepted: boolean;
  marketingConsent: boolean;
  notifyOrderStatus: boolean;
  onPrivacyChange: (v: boolean) => void;
  onMarketingChange: (v: boolean) => void;
  onNotifyOrderChange: (v: boolean) => void;
};

export function ConsentBlock({
  privacyAccepted,
  marketingConsent,
  notifyOrderStatus,
  onPrivacyChange,
  onMarketingChange,
  onNotifyOrderChange,
}: Props) {
  return (
    <div className="space-y-3 rounded-xl border border-line bg-brand-soft/40 p-4 text-sm">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
        />
        <span>
          Li e aceito a{" "}
          <Link to="/privacidade" className="font-semibold text-brand underline">
            Política de Privacidade
          </Link>{" "}
          e os Termos de Uso <span className="text-danger">*</span>
        </span>
      </label>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={notifyOrderStatus}
          onChange={(e) => onNotifyOrderChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
        />
        <span>Avisar mudanças no status do pedido</span>
      </label>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => onMarketingChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
        />
        <span>Aceito promoções por e-mail e notificação (opcional)</span>
      </label>
    </div>
  );
}
