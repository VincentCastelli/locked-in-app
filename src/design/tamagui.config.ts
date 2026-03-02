import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    primary50: "#E6FBF0",
    primary100: "#B3F3D4",
    primary200: "#80EBB8",
    primary300: "#4DE39C",
    primary400: "#26DD85",
    primary500: "#00D26A",
    primary600: "#00B95E",
    primary700: "#009A4E",
    primary800: "#007B3E",
    primary900: "#005C2F",
    sunYellow: "#f8bd57",
    white: "#FFFFFF",
    black: "#000000",
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
});

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
