import { styled, YStack } from "tamagui";

export const ThemedScreen = styled(YStack, {
  flex: 1,
  bg: "$background",
  px: "$2",
  py: "$2",
  variants: {
    flexCenter: {
      true: {
        justify: "center",
        alignItems: "center",
      },
      default: {},
    },
  },
} as const);
