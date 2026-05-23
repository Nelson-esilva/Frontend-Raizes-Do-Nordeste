import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { UnitProvider } from "@/context/UnitContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <UnitProvider>
          <CartProvider>{children}</CartProvider>
        </UnitProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
