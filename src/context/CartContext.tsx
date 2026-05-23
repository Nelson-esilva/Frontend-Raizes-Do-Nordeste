import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  promoCode: string | null;
  promoDiscountPercent: number;
  discount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  applyPromo: (code: string, percent: number) => void;
  clearPromo: () => void;
  redeemPoints: number;
  setRedeemPoints: (points: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [redeemPoints, setRedeemPoints] = useState(0);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + qty }
              : i,
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const applyPromo = useCallback((code: string, percent: number) => {
    setPromoCode(code);
    setPromoDiscountPercent(percent);
  }, []);

  const clearPromo = useCallback(() => {
    setPromoCode(null);
    setPromoDiscountPercent(0);
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    clearPromo();
    setRedeemPoints(0);
  }, [clearPromo]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const promoDiscount = (subtotal * promoDiscountPercent) / 100;
  const pointsDiscount = redeemPoints / 100;
  const discount = promoDiscount + pointsDiscount;
  const total = Math.max(0, subtotal - discount);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      promoCode,
      promoDiscountPercent,
      discount,
      total,
      addItem,
      removeItem,
      setQuantity,
      applyPromo,
      clearPromo,
      redeemPoints,
      setRedeemPoints,
      clear,
    }),
    [
      items,
      itemCount,
      subtotal,
      promoCode,
      promoDiscountPercent,
      discount,
      total,
      addItem,
      removeItem,
      setQuantity,
      applyPromo,
      clearPromo,
      redeemPoints,
      clear,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart fora do CartProvider");
  return ctx;
}
