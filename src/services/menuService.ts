import unitsData from "@/mocks/units.json";
import productsData from "@/mocks/products.json";
import type { Product, Unit } from "@/types";
import { delay } from "./delay";

export async function listUnits(): Promise<Unit[]> {
  await delay(300);
  return unitsData as Unit[];
}

export async function getUnit(id: string): Promise<Unit | undefined> {
  await delay(150);
  return (unitsData as Unit[]).find((u) => u.id === id);
}

export async function getMenuByUnit(unitId: string): Promise<Product[]> {
  await delay(400);
  return (productsData as Product[]).filter((p) => p.unitId === unitId);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await delay(150);
  return (productsData as Product[]).find((p) => p.id === id);
}

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))];
}
