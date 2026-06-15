import { useThemeContext } from "@/src/context/ThemeContextProvider";
import { styled, YStack, GetProps } from "tamagui";
import config from "@/tamagui.config";

const StyledYStack = styled(YStack, {
  p: "$4",
  borderWidth: "$1",
  bg: "$color3",
  borderColor: "$borderColor",
  m: "$2",
  variants: {
    elevated: {
      true: {
        shadow: "$md",
        elevation: "$1",
      },
    },
  },
} as const);

type SurfaceProps = GetProps<typeof StyledYStack>;

export const Surface = (props: SurfaceProps) => {
  const { theme } = useThemeContext();

  return (
    <StyledYStack
      {...props}
      theme={`${theme}_surface2` as keyof (typeof config)["themes"]}
    />
  );
};
