import { Paragraph } from "tamagui";
import { useRouter } from "expo-router";

export const SignUpAnchor = () => {
  const router = useRouter();

  const handlePress = () => {
    router.replace("/auth/sign-up");
  };

  return (
    <Paragraph color={"$blue8"} fontSize={"$1"} onPress={handlePress}>
      don't have an account? sign up
    </Paragraph>
  );
};
