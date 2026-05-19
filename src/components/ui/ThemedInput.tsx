import { Input, styled } from "tamagui";
import { StyleSheet } from "react-native";

export const ThemedInput = styled(Input, {
  placeholderTextColor: "$borderColor",
  borderWidth: StyleSheet.hairlineWidth,
  variants: {
    error: {
      true: {
        borderColor: "$red10",
      },
      default: {},
    },
  },
  cursorColor: "$color",
  selectionColor: "$accentColor",
} as const);
