import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ChannelProvider } from "@/context/ChannelContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { UnitProvider } from "@/context/UnitContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChannelProvider>
      <NotificationProvider>
        <AuthProvider>
          <UnitProvider>
            <CartProvider>{children}</CartProvider>
          </UnitProvider>
        </AuthProvider>
      </NotificationProvider>
    </ChannelProvider>
  );
}
