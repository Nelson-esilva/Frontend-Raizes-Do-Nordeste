import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Unit } from "@/types";

const STORAGE_KEY = "raizes_unit";

type UnitContextValue = {
  unit: Unit | null;
  selectUnit: (unit: Unit) => void;
  clearUnit: () => void;
};

const UnitContext = createContext<UnitContextValue | null>(null);

function loadUnit(): Unit | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Unit) : null;
  } catch {
    return null;
  }
}

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<Unit | null>(loadUnit);

  const selectUnit = useCallback((next: Unit) => {
    setUnit(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const clearUnit = useCallback(() => {
    setUnit(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ unit, selectUnit, clearUnit }),
    [unit, selectUnit, clearUnit],
  );

  return (
    <UnitContext.Provider value={value}>{children}</UnitContext.Provider>
  );
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error("useUnit fora do UnitProvider");
  return ctx;
}
