import { styled, Button } from "tamagui";

const PrimaryButtonFrame = styled(Button, {
  name: "PrimaryButton",
  bg: "$primaryContainer",
  height: 52,
  rounded: 12,
  pressStyle: {
    bg: "$primaryFixedDim",
    borderColor: "$primaryFixedDim",
  },
  hoverStyle: {
    bg: "$primary",
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
  color: "$onPrimary",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: 1,
  fontSize: 15,
});

export const PrimaryButton = PrimaryButtonFrame as typeof PrimaryButtonFrame & {
  Text: typeof PrimaryButtonText;
};

PrimaryButton.Text = PrimaryButtonText;
