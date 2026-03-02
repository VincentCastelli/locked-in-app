import React from "react";
import { Button, YStack, Text, XStack, getTokens } from "tamagui";
import { PrimaryButton } from "../components/PrimaryButton";
import { Sun, Moon } from "lucide-react-native";
import { useAuthStore } from "../store/authStore";
import { useResolvedTheme, useToggleTheme } from "../store/themeStore";

export const PlaceholderScreen: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const toggle = useToggleTheme();
  const theme = useResolvedTheme();
  const sunYellow = getTokens().color.sunYellow.val;

  return (
    <YStack flex={1} bg="$background" pt="$8" px="$6">
      <XStack justify="flex-end">
        <Button
          size="$3"
          circular
          bg="transparent"
          icon={
            theme === "dark" ? (
              <Sun size={18} color={sunYellow} />
            ) : (
              <Moon size={18} color="black" />
            )
          }
          onPress={toggle}
        />
      </XStack>

      <YStack flex={1} justify="center" items="center" gap="$3">
        <Text fontSize="$7" fontWeight="700" color="$color">
          Welcome to LockedIn!
        </Text>
        <Text fontSize="$4" color="$color8">
          Logged in as: {user?.email}
        </Text>
        <PrimaryButton onPress={signOut}>
          <PrimaryButton.Text>Sign Out</PrimaryButton.Text>
        </PrimaryButton>
      </YStack>
    </YStack>
  );
};
