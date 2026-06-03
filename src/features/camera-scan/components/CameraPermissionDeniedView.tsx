import { ThemedScreen } from "@/src/components";
import { Button, Text } from "tamagui";

export default function CameraPermissionDeniedView({
  requestCameraPermission,
}: {
  requestCameraPermission: () => void;
}) {
  return (
    <ThemedScreen flexCenter>
      <Text>Camera permission not granted</Text>
      <Button onPress={() => requestCameraPermission()}>
        Allow permission
      </Button>
    </ThemedScreen>
  );
}
