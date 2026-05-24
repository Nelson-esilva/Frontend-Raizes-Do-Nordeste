import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Channel = "app" | "totem";

const STORAGE_KEY = "raizes_channel";

type ChannelContextValue = {
  channel: Channel | null;
  setChannel: (channel: Channel) => void;
  clearChannel: () => void;
  isTotem: boolean;
};

const ChannelContext = createContext<ChannelContextValue | null>(null);

function loadChannel(): Channel | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === "app" || raw === "totem") return raw;
    return null;
  } catch {
    return null;
  }
}

export function ChannelProvider({ children }: { children: ReactNode }) {
  const [channel, setChannelState] = useState<Channel | null>(loadChannel);

  useEffect(() => {
    const stored = loadChannel();
    if (stored) {
      document.documentElement.dataset.channel = stored;
    }
  }, []);

  const setChannel = useCallback((next: Channel) => {
    setChannelState(next);
    sessionStorage.setItem(STORAGE_KEY, next);
    document.documentElement.dataset.channel = next;
  }, []);

  const clearChannel = useCallback(() => {
    setChannelState(null);
    sessionStorage.removeItem(STORAGE_KEY);
    delete document.documentElement.dataset.channel;
  }, []);

  const value = useMemo(
    () => ({
      channel,
      setChannel,
      clearChannel,
      isTotem: channel === "totem",
    }),
    [channel, setChannel, clearChannel],
  );

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  );
}

export function useChannel() {
  const ctx = useContext(ChannelContext);
  if (!ctx) throw new Error("useChannel fora do ChannelProvider");
  return ctx;
}
