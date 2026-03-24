import React from "react";
import { ActivityIndicator, View } from "react-native";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { tamaguiConfig } from "./tamagui.config";
import { useResolvedTheme } from "../store/themeStore";
import { useFonts } from "expo-font";

type ThemeProviderProps = Omit<
  TamaguiProviderProps,
  "config" | "defaultTheme"
> & {
  children: React.ReactNode;
};

export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {
  const theme = useResolvedTheme();

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular: require("@expo-google-fonts/space-grotesk/400Regular/SpaceGrotesk_400Regular.ttf"),
    SpaceGrotesk_500Medium: require("@expo-google-fonts/space-grotesk/500Medium/SpaceGrotesk_500Medium.ttf"),
    SpaceGrotesk_700Bold: require("@expo-google-fonts/space-grotesk/700Bold/SpaceGrotesk_700Bold.ttf"),
    Lexend_400Regular: require("@expo-google-fonts/lexend/400Regular/Lexend_400Regular.ttf"),
    Lexend_500Medium: require("@expo-google-fonts/lexend/500Medium/Lexend_500Medium.ttf"),
    Lexend_700Bold: require("@expo-google-fonts/lexend/700Bold/Lexend_700Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#131313",
        }}
      >
        <ActivityIndicator size="large" color="#a3e635" />
      </View>
    );
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme} {...rest}>
      {children}
    </TamaguiProvider>
  );
}
