import { Stack } from "expo-router";
import StackHeader from "@/src/components/StackHeader";

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
        name="index"
        options={{
          title: "Verification",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Verify Document",
        }}
      />
    </Stack>
  );
}
