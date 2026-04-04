import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui, createTokens, createFont } from "tamagui";

const bodyFont = createFont({
  family: "Lexend_400Regular",
  size: defaultConfig.fonts.body.size,
  lineHeight: defaultConfig.fonts.body.lineHeight,
  weight: {
    1: "400",
    5: "500",
    7: "700",
  },
  face: {
    400: { normal: "Lexend_400Regular" },
    500: { normal: "Lexend_500Medium" },
    700: { normal: "Lexend_700Bold" },
  },
});

const headingFont = createFont({
  family: "SpaceGrotesk_700Bold",
  size: defaultConfig.fonts.heading.size,
  lineHeight: defaultConfig.fonts.heading.lineHeight,
  weight: {
    1: "400",
    5: "500",
    7: "700",
  },
  face: {
    400: { normal: "SpaceGrotesk_400Regular" },
    500: { normal: "SpaceGrotesk_500Medium" },
    700: { normal: "SpaceGrotesk_700Bold" },
  },
});

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

const darkTheme = {
  // Map generic Tamagui keys
  background: tokens.color.background,
  color: tokens.color.onSurface,

  // Primary
  primary: tokens.color.primary,
  primaryContainer: tokens.color.primaryContainer,
  primaryFixed: tokens.color.primaryFixed,
  primaryFixedDim: tokens.color.primaryFixedDim,
  onPrimary: tokens.color.onPrimary,
  onPrimaryContainer: tokens.color.onPrimaryContainer,
  inversePrimary: tokens.color.inversePrimary,

  // Secondary
  secondary: tokens.color.secondary,
  secondaryContainer: tokens.color.secondaryContainer,
  onSecondary: tokens.color.onSecondary,
  onSecondaryContainer: tokens.color.onSecondaryContainer,

  // Tertiary
  tertiary: tokens.color.tertiary,
  tertiaryContainer: tokens.color.tertiaryContainer,
  onTertiary: tokens.color.onTertiary,
  onTertiaryContainer: tokens.color.onTertiaryContainer,

  // Surface
  surface: tokens.color.surface,
  surfaceDim: tokens.color.surfaceDim,
  surfaceBright: tokens.color.surfaceBright,
  surfaceContainer: tokens.color.surfaceContainer,
  surfaceContainerHigh: tokens.color.surfaceContainerHigh,
  surfaceContainerHighest: tokens.color.surfaceContainerHighest,
  surfaceContainerLow: tokens.color.surfaceContainerLow,
  surfaceContainerLowest: tokens.color.surfaceContainerLowest,
  surfaceVariant: tokens.color.surfaceVariant,
  surfaceTint: tokens.color.surfaceTint,
  onSurface: tokens.color.onSurface,
  onSurfaceVariant: tokens.color.onSurfaceVariant,
  inverseSurface: tokens.color.inverseSurface,
  inverseOnSurface: tokens.color.inverseOnSurface,
  onBackground: tokens.color.onBackground,

  // Error
  error: tokens.color.error,
  errorContainer: tokens.color.errorContainer,
  onError: tokens.color.onError,
  onErrorContainer: tokens.color.onErrorContainer,

  // Outline
  outline: tokens.color.outline,
  outlineVariant: tokens.color.outlineVariant,
};

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes: {
    dark: darkTheme,
    light: darkTheme, // single theme for now
  },
});

export default tamaguiConfig;

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
