export type OrderStatus =
  | "recebido"
  | "em_preparo"
  | "pronto"
  | "retirado";

export type PaymentStatus = "pendente" | "aprovado" | "recusado" | "timeout";

export interface Unit {
  id: string;
  name: string;
  city: string;
  address: string;
  open: boolean;
  hours: string;
}

export interface ProductOption {
  id: string;
  label: string;
  priceExtra?: number;
}

export interface Product {
  id: string;
  unitId: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  seasonal?: boolean;
  options?: ProductOption[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  points: number;
  marketingConsent: boolean;
  notifyOrderStatus: boolean;
  notifyPromotions: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  unitId: string;
  unitName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  pointsEarned?: number;
  createdAt: string;
}

export interface Promotion {
  id: string;
  code: string;
  label: string;
  discountPercent: number;
  segment?: "todos" | "frequente" | "aniversariante" | "novo";
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  code?: string;
  segment: string;
}
