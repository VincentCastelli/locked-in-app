import React, { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { styled, Input } from "tamagui";
import type { LucideIcon } from "lucide-react-native";

const PrimaryInputFrame = styled(Input, {
  name: "PrimaryInput",
  size: undefined,
  bg: "#353534",
  rounded: 12,
  height: 52,
  fontSize: 16,
  fontFamily: "Lexend_400Regular",
  color: "#e5e2e1",
  placeholderTextColor: "#c2cab0",
  borderWidth: 0,
  borderColor: "transparent",
  focusStyle: {
    bg: "#393939",
    borderWidth: 0,
  },
  variants: {
    hasIcon: {
      true: {
        pl: 44,
      },
      false: {
        pl: 16,
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  } as const,
  defaultVariants: {
    hasIcon: false,
  },
});

type PrimaryInputProps = ComponentProps<typeof PrimaryInputFrame> & {
  icon?: LucideIcon;
};

const PrimaryInputWithIcon = React.forwardRef<
  React.ComponentRef<typeof PrimaryInputFrame>,
  PrimaryInputProps
>(({ icon: Icon, ...props }, ref) => {
  return (
    <View style={styles.wrapper}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon size={18} color="#c2cab0" />
        </View>
      )}
      <PrimaryInputFrame ref={ref} hasIcon={!!Icon} {...props} />
    </View>
  );
});

PrimaryInputWithIcon.displayName = "PrimaryInput";

export const PrimaryInput = PrimaryInputWithIcon;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    marginBottom: 16,
  },
  iconContainer: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },
});
