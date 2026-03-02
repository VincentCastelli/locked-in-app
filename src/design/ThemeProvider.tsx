import React from "react";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { tamaguiConfig } from "./tamagui.config";
import { useResolvedTheme } from "../store/themeStore";

type ThemeProviderProps = Omit<
  TamaguiProviderProps,
  "config" | "defaultTheme"
> & {
  children: React.ReactNode;
};

export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {
  const theme = useResolvedTheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme} {...rest}>
      {children}
    </TamaguiProvider>
  );
}
