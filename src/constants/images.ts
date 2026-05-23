const p = (file: string) => `/images/photos/${file}`;

export const IMAGES = {
  fallback: "/images/fallback.svg",
  hero: p("hero.jpg"),
  promo: p("promo.jpg"),
  products: {
    tapioca: p("tapioca.jpg"),
    cuscuz: p("cuscuz.jpg"),
    juice: p("juice.jpg"),
    cake: p("cake.jpg"),
    coffee: p("coffee.jpg"),
    meat: p("meat.jpg"),
    cheese: p("cheese.jpg"),
  },
  units: {
    "recife-centro": p("unit1.jpg"),
    "recife-boa-viagem": p("unit2.jpg"),
    "fortaleza-aldeota": p("unit3.jpg"),
    default: p("unit2.jpg"),
  },
  flow: {
    unit: p("restaurant.jpg"),
    menu: p("menu.jpg"),
    cart: p("cart.jpg"),
    payment: p("payment.jpg"),
    status: p("kitchen.jpg"),
  },
} as const;

export function unitImage(unitId: string): string {
  return (
    IMAGES.units[unitId as keyof typeof IMAGES.units] ?? IMAGES.units.default
  );
}
