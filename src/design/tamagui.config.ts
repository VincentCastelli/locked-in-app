import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    // Primary – Lime/Chartreuse
    primary: "#ccff80",
    primaryContainer: "#a3e635",
    primaryFixed: "#b2f746",
    primaryFixedDim: "#98da27",
    onPrimary: "#213600",
    onPrimaryContainer: "#416400",
    onPrimaryFixed: "#121f00",
    inversePrimary: "#446900",

    // Secondary – Sun Yellow
    secondary: "#e2c62d",
    secondaryContainer: "#c1a800",
    secondaryFixed: "#ffe24c",
    secondaryFixedDim: "#e2c62d",
    onSecondary: "#393000",
    onSecondaryContainer: "#483d00",

    // Tertiary – Mint
    tertiary: "#b4ffd7",
    tertiaryContainer: "#5debaf",
    tertiaryFixed: "#6ffbbe",
    tertiaryFixedDim: "#4edea3",
    onTertiary: "#003824",
    onTertiaryContainer: "#006846",

    // Surfaces
    surface: "#131313",
    surfaceDim: "#131313",
    surfaceBright: "#393939",
    surfaceContainer: "#201f1f",
    surfaceContainerHigh: "#2a2a2a",
    surfaceContainerHighest: "#353534",
    surfaceContainerLow: "#1c1b1b",
    surfaceContainerLowest: "#0e0e0e",
    surfaceVariant: "#353534",
    surfaceTint: "#98da27",
    onSurface: "#e5e2e1",
    onSurfaceVariant: "#c2cab0",
    inverseSurface: "#e5e2e1",
    inverseOnSurface: "#313030",

    // Background
    background: "#131313",
    onBackground: "#e5e2e1",

    // Error
    error: "#ffb4ab",
    errorContainer: "#93000a",
    onError: "#690005",
    onErrorContainer: "#ffdad6",

    // Outline
    outline: "#8c947c",
    outlineVariant: "#424936",

    // Legacy compat
    white: "#FFFFFF",
    black: "#000000",
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
});

export default tamaguiConfig;

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
