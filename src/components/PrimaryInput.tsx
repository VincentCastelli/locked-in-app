import React, { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { styled, Input, useTheme } from "tamagui";
import type { LucideIcon } from "lucide-react-native";

const PrimaryInputFrame = styled(Input, {
  name: "PrimaryInput",
  size: undefined,
  bg: "$gray1",
  rounded: 12,
  height: 46,
  fontSize: 16,
  color: "$black",
  placeholderTextColor: "$gray9",
  borderWidth: 2,
  borderColor: "transparent",
  focusStyle: {
    borderColor: "$primary500",
    shadowColor: "$primary500",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
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
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon size={18} color={theme.gray9.val} />
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
