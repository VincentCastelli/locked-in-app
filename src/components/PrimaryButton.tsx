import { styled, Button } from "tamagui";

const PrimaryButtonFrame = styled(Button, {
  name: "PrimaryButton",
  bg: "#a3e635",
  height: 52,
  rounded: 12,
  pressStyle: {
    bg: "#98da27",
    borderColor: "#98da27",
  },
  hoverStyle: {
    bg: "#ccff80",
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
  color: "#213600",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: 1,
  fontSize: 15,
});

export const PrimaryButton = PrimaryButtonFrame as typeof PrimaryButtonFrame & {
  Text: typeof PrimaryButtonText;
};

PrimaryButton.Text = PrimaryButtonText;
