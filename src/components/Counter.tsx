import React from "react";
import { ThemedButton, ThemedScreen } from "./ui";
import { Text, XStack, YStack } from "tamagui";

export function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <ThemedScreen>
      <Text>Counter: {count}</Text>
      <XStack>
        <ThemedButton onPress={() => setCount(count + 1)}>+</ThemedButton>
        <ThemedButton onPress={() => setCount(count - 1)}>-</ThemedButton>
      </XStack>
    </ThemedScreen>
  );
}
