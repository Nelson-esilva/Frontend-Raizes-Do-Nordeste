import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/services/authService";
import { listOrdersByUser } from "@/services/orderService";
import type { Order } from "@/types";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteStep, setDeleteStep] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, phone: user.phone });
      setOrders(listOrdersByUser(user.id));
    }
  }, [user]);

  if (!user) {
    return (
      <section className="mx-auto max-w-md space-y-4 py-8 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Minha conta</h1>
        <p className="text-sm text-muted">
          Entre ou crie uma conta para ver pedidos, pontos e dados pessoais.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link to="/login">
            <Button fullWidth>Entrar</Button>
          </Link>
          <Link to="/cadastro">
            <Button fullWidth variant="ghost">
              Criar conta
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  function saveProfile() {
    updateUser({ name: form.name, phone: form.phone });
    setEditing(false);
  }

  async function handleDelete() {
    if (!user || confirmText !== "EXCLUIR" || !password) return;
    setDeleteError("");
    setDeleting(true);
    const result = await authService.deleteAccount(user.id, password);
    setDeleting(false);
    if (!result.ok) {
      setDeleteError(result.message);
      return;
    }
    logout();
    navigate("/");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink">Meu perfil</h1>
        <Button variant="ghost" onClick={handleLogout}>
          Sair da conta
        </Button>
      </header>

      <div className="rounded-2xl bg-paper p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-ink">Dados cadastrais</p>
          <button
            type="button"
            onClick={() => (editing ? saveProfile() : setEditing(true))}
            className="text-sm font-semibold text-brand"
          >
            {editing ? "Salvar" : "Editar"}
          </button>
        </div>

        {editing ? (
          <div className="mt-4 space-y-3">
            <Input
              label="Nome"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Input
              label="Telefone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
        ) : (
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Nome" value={user.name} />
            <Row label="E-mail" value={user.email} />
            <Row label="Telefone" value={user.phone} />
            <Row label="Pontos" value={`${user.points} pts`} />
          </dl>
        )}
      </div>

      <div className="rounded-2xl bg-paper p-5 shadow-sm">
        <p className="font-semibold text-ink">Notificações</p>
        <label className="mt-3 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={user.notifyOrderStatus}
            onChange={(e) =>
              updateUser({ notifyOrderStatus: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
          />
          <span>Avisar mudanças no status do pedido</span>
        </label>
        <label className="mt-2 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={user.notifyPromotions}
            onChange={(e) =>
              updateUser({ notifyPromotions: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
          />
          <span>Receber promoções relevantes (com consentimento)</span>
        </label>
      </div>

      <div className="rounded-2xl bg-paper p-5 shadow-sm">
        <p className="font-semibold text-ink">Histórico de pedidos</p>
        {orders.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Nenhum pedido ainda.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  to={`/pedido/${o.id}`}
                  className="flex justify-between rounded-xl border border-line px-3 py-2 text-sm hover:bg-brand-soft"
                >
                  <span className="font-semibold">{o.id}</span>
                  <span className="text-muted">
                    R$ {o.total.toFixed(2).replace(".", ",")} · {o.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-danger/30 bg-danger/5 p-5">
        <p className="font-semibold text-danger">Excluir conta</p>
        <p className="mt-1 text-sm text-muted">
          Solicitação de anonimização conforme Art. 18 da LGPD.
        </p>
        {!deleteStep ? (
          <Button variant="danger" className="mt-3" onClick={() => setDeleteStep(true)}>
            Excluir conta
          </Button>
        ) : (
          <div className="mt-3 space-y-3">
            <Input
              label='Digite "EXCLUIR"'
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {deleteError && (
              <p className="text-sm text-danger" role="alert">
                {deleteError}
              </p>
            )}
            <Button
              variant="danger"
              disabled={confirmText !== "EXCLUIR" || !password || deleting}
              onClick={handleDelete}
            >
              {deleting ? "Processando..." : "Confirmar exclusão"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
