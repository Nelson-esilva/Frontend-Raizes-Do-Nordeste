import usersData from "@/mocks/users.json";
import type { User } from "@/types";
import { delay } from "./delay";

type StoredUser = User & { password: string };

const users = usersData as StoredUser[];

export type LoginResult =
  | { ok: true; user: User }
  | { ok: false; message: string };

export type RegisterInput = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  privacyAccepted: boolean;
  marketingConsent: boolean;
  notifyOrderStatus: boolean;
};

export async function requestPasswordReset(email: string): Promise<{
  ok: boolean;
  message: string;
}> {
  await delay(500);
  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (!exists) {
    return {
      ok: false,
      message: "E-mail não encontrado. Verifique e tente novamente.",
    };
  }
  return {
    ok: true,
    message:
      "Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.",
  };
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  await delay(500);
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (!found || found.password !== password) {
    return { ok: false, message: "E-mail ou senha incorretos. Tente novamente." };
  }
  const { password: _, ...user } = found;
  return { ok: true, user };
}

export async function register(data: RegisterInput): Promise<LoginResult> {
  await delay(600);
  if (!data.privacyAccepted) {
    return {
      ok: false,
      message:
        "É necessário aceitar a Política de Privacidade para criar uma conta.",
    };
  }
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, message: "Este e-mail já está cadastrado." };
  }
  const newUser: StoredUser = {
    id: `u${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    birthDate: data.birthDate,
    points: 0,
    marketingConsent: data.marketingConsent,
    notifyOrderStatus: data.notifyOrderStatus,
    notifyPromotions: data.marketingConsent,
    password: data.password,
  };
  users.push(newUser);
  const { password: _, ...user } = newUser;
  return { ok: true, user };
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
