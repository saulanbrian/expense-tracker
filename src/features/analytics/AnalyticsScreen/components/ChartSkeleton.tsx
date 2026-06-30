import { YStack } from "tamagui";

export function ChartSkeleton() {
  return (
    <YStack gap="$3" flex={1} px="$2">
      <YStack gap="$1">
        <YStack width={100} height={12} bg="$color4" rounded="$2" />
        <YStack width={160} height={32} bg="$color4" rounded="$2" mt="$1" />
      </YStack>

      <YStack
        bg="$color3"
        rounded="$4"
        borderWidth={0.5}
        borderColor="$borderColor"
        p="$3"
        pb="$0"
        height={280}
      />
    </YStack>
  );
}
