import { supabase } from "@/supabase/client";
import { Text, YStack, YStackProps } from "tamagui";

export const LogoutButton = (props: YStackProps) => {
  return (
    <YStack onPress={() => supabase.auth.signOut()}>
      <Text color={"$red8"}>Logout</Text>
    </YStack>
  );
};
