import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { GetProps, Text, XStack, YStack } from "tamagui";
import { useThemeContext } from "@/src/context/ThemeContextProvider";
import {
  FileCheck,
  History,
  Component as IconComponent,
  TrendingUp,
  UploadCloud,
} from "@tamagui/lucide-icons-2";

type IconsProps = GetProps<typeof IconComponent>;

const TabIcons = {
  ingestion: (props: IconsProps) => <UploadCloud {...props} />,
  verification: (props: IconsProps) => <FileCheck {...props} />,
  analytics: (props: IconsProps) => <TrendingUp {...props} />,
  "audit-trail": (props: IconsProps) => <History {...props} />,
};

function renderIcon(routeName: string, active: boolean = false) {
  const icon = TabIcons[routeName as keyof typeof TabIcons];
  if (!icon) return null;

  return icon({ color: active ? "$color" : "$colorHover" });
}

export default function TabBar(props: BottomTabBarProps) {
  const { isDark } = useThemeContext();

  return (
    <YStack bg={isDark ? "$backgroundHover" : "$backgroundPress"} p={"$5"}>
      <XStack justify={"center"}>
        {props.state.routes.map((route, index) => {
          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          return (
            <YStack
              key={route.key}
              onPress={onPress}
              px={"$4"}
              py={"$2"}
              gap={"$2"}
              items={"center"}
              justify={"center"}
              self={"center"}
            >
              {renderIcon(route.name, isFocused)}
              <Text
                fontSize={"$2"}
                color={isFocused ? "$color" : "$colorHover"}
              >
                {route.name}
              </Text>
            </YStack>
          );
        })}
      </XStack>
    </YStack>
  );
}
