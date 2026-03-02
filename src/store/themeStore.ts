import { create } from "zustand";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: (currentResolved: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "system",

  setMode: (mode) => set({ mode }),

  toggle: (currentResolved) => {
    set({ mode: currentResolved === "light" ? "dark" : "light" });
  },
}));

export function useResolvedTheme(): "light" | "dark" {
  const mode = useThemeStore((s) => s.mode);
  const systemScheme = useColorScheme();

  if (mode === "system") {
    return systemScheme === "dark" ? "dark" : "light";
  }
  return mode;
}

/** Convenience hook that returns a toggle bound to the current resolved theme. */
export function useToggleTheme() {
  const toggle = useThemeStore((s) => s.toggle);
  const resolved = useResolvedTheme();
  return () => toggle(resolved);
}
