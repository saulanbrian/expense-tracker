import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions, YStack, Text } from "tamagui";
import { HeaderBase, HeaderBaseText } from "./HeaderBase";

export default function StackHeader(props: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const headerHeight = getDefaultHeaderHeight(
    { width, height },
    false,
    insets.top,
  );

  return (
    <HeaderBase height={headerHeight}>
      <HeaderBaseText>
        {props.options.title || props.options.headerTitle || props.route.name}
      </HeaderBaseText>
    </HeaderBase>
  );
}
