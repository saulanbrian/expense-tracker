import { ThemedScreen } from "./ui";
import { Spinner } from "tamagui";

export default function LoadingScreen() {
  return (
    <ThemedScreen flexCenter>
      <Spinner size="large" />
    </ThemedScreen>
  );
}
