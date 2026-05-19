import { useThemeContext } from "@/src/context/ThemeContextProvider";
import { styled, YStack, Card as TamaCard, CardProps } from "tamagui";
import config from "@/tamagui.config";

const StyledCard = styled(TamaCard, {
  rounded: "$2",
  p: "$4",
  borderWidth: 1,
  borderColor: "$borderColor",
  m: "$2",
  elevation: "$1",
});

export const Card = (props: CardProps) => {
  const { theme } = useThemeContext();

  return (
    <StyledCard
      {...props}
      theme={`${theme}_accent` as keyof (typeof config)["themes"]}
    />
  );
};
