import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions, XStack, Button } from "tamagui";
import { HeaderBase, HeaderBaseText } from "./HeaderBase";
import { ArrowLeft } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";

export default function StackHeader(props: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const headerHeight = getDefaultHeaderHeight(
    { width, height },
    false,
    insets.top,
  );

  return (
    <HeaderBase height={headerHeight}>
      <XStack items="center" gap="$2">
        {props.back && (
          <Button
            icon={<ArrowLeft size={20} />}
            circular
            chromeless
            onPress={() => router.back()}
            ml="$-2"
            p="$2"
          />
        )}
        <HeaderBaseText>
          {props.options.title || props.options.headerTitle || props.route.name}
        </HeaderBaseText>
      </XStack>
    </HeaderBase>
  );
}
