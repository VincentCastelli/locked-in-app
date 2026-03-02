import { styled, Button } from "tamagui";

const PrimaryButtonFrame = styled(Button, {
  name: "PrimaryButton",
  bg: "$primary500",
  pressStyle: {
    bg: "$primary700",
  },
  hoverStyle: {
    bg: "$primary600",
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  } as const,
});

const PrimaryButtonText = styled(Button.Text, {
  name: "PrimaryButtonText",
  color: "$white",
  fontWeight: "bold",
});

export const PrimaryButton = PrimaryButtonFrame as typeof PrimaryButtonFrame & {
  Text: typeof PrimaryButtonText;
};

PrimaryButton.Text = PrimaryButtonText;
