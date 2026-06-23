import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { HeaderBase, HeaderBaseText } from "./HeaderBase";

export default function TabHeader(props: BottomTabHeaderProps) {
  const { top } = useSafeAreaInsets();
  const height = getDefaultHeaderHeight(props.layout, false, top);

  return (
    <HeaderBase width={props.layout.width} height={height}>
      <HeaderBaseText>{props.options.title ?? props.route.name}</HeaderBaseText>
    </HeaderBase>
  );
}
