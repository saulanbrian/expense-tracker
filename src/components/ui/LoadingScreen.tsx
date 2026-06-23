import { ThemedScreen } from "./ThemedScreen";
import { Spinner } from "tamagui";

export default function LoadingScreen() {
  return (
    <ThemedScreen flexCenter>
      <Spinner size="large" />
    </ThemedScreen>
  );
}
