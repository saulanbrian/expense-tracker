import StackHeader from "@/src/components/StackHeader";
import { Stack } from "expo-router";

export default function VerificationLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <StackHeader {...props} />,
        animation: "ios_from_right",
        animationDuration: 700,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Verify Document",
        }}
      />
    </Stack>
  );
}
