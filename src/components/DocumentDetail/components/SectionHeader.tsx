import { XStack, YStack, Text } from "tamagui";

export function SectionHeader({
  title,
  icon: Icon,
  detail,
}: {
  title: string;
  icon?: any;
  detail?: string;
}) {
  return (
    <YStack gap="$1" mb="$2" px="$1">
      <XStack items="center" gap="$2">
        {Icon && <Icon size={14} color="$color10" />}
        <Text
          color="$color12"
          fontSize="$2"
          fontWeight="800"
          textTransform="uppercase"
        >
          {title}
        </Text>
      </XStack>
      {detail ? (
        <Text color="$color10" fontSize="$2" lineHeight="$2">
          {detail}
        </Text>
      ) : null}
    </YStack>
  );
}
