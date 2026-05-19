import { styled, Text, YStack, YStackProps } from "tamagui";
import { useThemeContext } from "../context/ThemeContextProvider";

export const HeaderBase = (props: YStackProps) => {
  const { theme } = useThemeContext();
  const isDark = theme.includes("dark");

  return (
    <HeaderContainer
      {...props}
      bg={isDark ? "$backgroundHover" : "$backgroundPress"}
    />
  );
};

const HeaderContainer = styled(YStack, {
  justify: "flex-end",
  p: "$4",
});

export const HeaderBaseText = styled(Text, {
  fontWeight: "900",
  fontSize: "$6",
});
