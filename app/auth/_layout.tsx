import { useSupabaseAuth } from "@/src/features/auth/hooks/useSupabaseAuth";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import StackHeader from "@/src/components/StackHeader";

export default function AuthLayout() {
  const { authenticated } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.replace("/(tabs)/ingestion");
    }
  }, [authenticated]);

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          header: (props) => <StackHeader {...props} />,
          title: "Signin",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          header: (props) => <StackHeader {...props} />,
          title: "Signup",
        }}
      />
    </Stack>
  );
}
