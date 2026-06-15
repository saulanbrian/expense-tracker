import { XStack, Text } from "tamagui";

export function SectionHeader({ title, icon: Icon }: { title: string, icon?: any }) {
  return (
    <XStack items="center" gap="$2" mb="$2" px="$1">
      {Icon && <Icon size={14} color="$color10" />}
      <Text color="$color10" fontSize="$2" fontWeight="800" textTransform="uppercase" letterSpacing={1}>
        {title}
      </Text>
    </XStack>
  );
}
