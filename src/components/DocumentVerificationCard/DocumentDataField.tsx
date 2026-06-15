import { Text, XStack, YStack } from "tamagui";
import { Component as LucideIcon } from "@tamagui/lucide-icons-2";

interface DataFieldProps {
  label: string;
  value: string | number;
  icon?: typeof LucideIcon;
  items?: "flex-start" | "flex-end" | "center";
  valueFontSize?: any;
}

export const DocumentDataField = ({
  label,
  value,
  icon: Icon,
  items = "flex-start",
  valueFontSize = "$3",
}: DataFieldProps) => {
  return (
    <YStack items={items} gap="$0.5">
      <XStack items="center" gap="$1.5">
        {Icon && <Icon size={12} color="$color10" />}
        <Text
          color="$color10"
          fontSize="$1"
          fontWeight="600"
          textTransform="uppercase"
        >
          {label}
        </Text>
      </XStack>
      <Text fontSize={valueFontSize} fontWeight="700" color="$color">
        {value}
      </Text>
    </YStack>
  );
};
