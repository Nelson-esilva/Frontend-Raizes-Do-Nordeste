import { Navigate, Outlet } from "react-router-dom";
import { useChannel } from "@/context/ChannelContext";

export function RequireChannel() {
  const { channel } = useChannel();

  if (!channel) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
