import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RequireChannel } from "@/components/RequireChannel";
import { AppLayout } from "@/layouts/AppLayout";
import { ChannelSelectPage } from "@/pages/ChannelSelectPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ManagerDashboardPage } from "@/pages/manager/ManagerDashboardPage";
import { AppHomePage } from "@/pages/mobile/AppHomePage";
import { LoginPage } from "@/pages/mobile/LoginPage";
import { RegisterPage } from "@/pages/mobile/RegisterPage";
import { ForgotPasswordPage } from "@/pages/mobile/ForgotPasswordPage";
import { UnitsPage } from "@/pages/mobile/UnitsPage";
import { MenuPage } from "@/pages/mobile/MenuPage";
import { ProductDetailPage } from "@/pages/mobile/ProductDetailPage";
import { CartPage } from "@/pages/mobile/CartPage";
import { CheckoutPage } from "@/pages/mobile/CheckoutPage";
import { OrderStatusPage } from "@/pages/mobile/OrderStatusPage";
import { LoyaltyPage } from "@/pages/mobile/LoyaltyPage";
import { ProfilePage } from "@/pages/mobile/ProfilePage";
import { PromotionsPage } from "@/pages/mobile/PromotionsPage";

function LegacyRedirect() {
  const { pathname } = useLocation();
  const next = pathname.replace(/^\/(app|web)/, "") || "/inicio";
  return <Navigate to={next === "/" ? "/inicio" : next} replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChannelSelectPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />

        <Route element={<RequireChannel />}>
          <Route element={<AppLayout />}>
            <Route path="inicio" element={<AppHomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="cadastro" element={<RegisterPage />} />
            <Route path="recuperar-senha" element={<ForgotPasswordPage />} />
            <Route path="unidades" element={<UnitsPage />} />
            <Route path="cardapio" element={<MenuPage />} />
            <Route path="produto/:id" element={<ProductDetailPage />} />
            <Route path="carrinho" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="pedido/:id" element={<OrderStatusPage />} />
            <Route path="fidelidade" element={<LoyaltyPage />} />
            <Route path="promocoes" element={<PromotionsPage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="gerente" element={<ManagerDashboardPage />} />
          </Route>
        </Route>

        <Route path="/app/*" element={<LegacyRedirect />} />
        <Route path="/web/*" element={<LegacyRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
