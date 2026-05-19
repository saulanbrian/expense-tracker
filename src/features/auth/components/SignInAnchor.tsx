import { useRouter } from "expo-router";
import { Paragraph } from "tamagui";

export const SignInAnchor = () => {
  const router = useRouter();

  const handlePress = () => {
    router.replace("/auth/sign-in");
  };

  return (
    <Paragraph onPress={handlePress} color={"$blue8"} fontSize={"$1"}>
      don't have an account? sign up
    </Paragraph>
  );
};
