import promotionsData from "@/mocks/promotions.json";
import campaignsData from "@/mocks/campaigns.json";
import type { Campaign, Promotion, User } from "@/types";
import { delay } from "./delay";

export async function validateCode(code: string): Promise<Promotion | null> {
  await delay(400);
  const promo = (promotionsData as Promotion[]).find(
    (p) => p.code.toUpperCase() === code.trim().toUpperCase(),
  );
  return promo ?? null;
}

function isBirthdayMonth(birthDate: string) {
  const month = new Date(birthDate).getMonth();
  return month === new Date().getMonth();
}

export async function getCampaignsForUser(
  user: User | null,
): Promise<Campaign[]> {
  await delay(300);
  const all = campaignsData as Campaign[];

  if (!user) {
    return all.filter((c) => c.segment === "todos");
  }

  return all.filter((c) => {
    if (c.segment === "todos") return true;
    if (c.segment === "aniversariante" && isBirthdayMonth(user.birthDate)) {
      return true;
    }
    if (c.segment === "frequente" && user.points >= 100) return true;
    if (c.segment === "novo" && user.points < 50) return true;
    return false;
  });
}
