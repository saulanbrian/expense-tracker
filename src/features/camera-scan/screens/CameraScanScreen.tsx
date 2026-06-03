import { ThemedScreen } from "@/src/components";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Spinner, styled, Text, YStack } from "tamagui";
import { Camera as CameraIcon } from "@tamagui/lucide-icons-2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIngestionStore } from "../../ingestion/stores/IngestionStore";
import { use, useCallback, useRef } from "react";
import { useRouter } from "expo-router";
import LoadingScreen from "@/src/components/LoadingScreen";
import CameraPermissionDeniedView from "../components/CameraPermissionDeniedView";
import { getFileInfo } from "@/src/utils/media/getFileInfo";

const SHUTTER_CONTAINER_HEIGHT = "25%";

export default function CameraScanScreen() {
  const [permissions, requestCameraPermission] = useCameraPermissions({
    get: true,
  });

  if (!permissions) return <LoadingScreen />;
  if (!permissions.granted) {
    return (
      <CameraPermissionDeniedView
        requestCameraPermission={requestCameraPermission}
      />
    );
  }

  return (
    <ThemedScreen flexCenter theme={"dark_red"} bg={"$background"}>
      <MainView />
    </ThemedScreen>
  );
}

const MainView = () => {
  const { top } = useSafeAreaInsets();
  const ref = useRef<CameraView>(null);
  const router = useRouter();
  const { setFile } = useIngestionStore();

  const handlePress = useCallback(async () => {
    if (ref.current) {
      const photo = await ref.current.takePictureAsync();
      if (photo) {
        const { creationTime, size } = getFileInfo(photo.uri);
        setFile({
          rawFile: photo,
          metadata: {
            name: `captured_${creationTime ?? Date.now().toString()}`,
            bytes_size: size,
            uri: photo.uri,
            type: "image",
          },
        });
        router.back();
      }
    }
  }, [router, setFile]);

  return (
    <>
      <StyledCameraView t={top} ref={ref} />
      <YStack
        mt={"auto"}
        justify={"center"}
        items={"center"}
        height={SHUTTER_CONTAINER_HEIGHT}
      >
        <CameraIconContainer>
          <CameraIcon
            size={"$3"}
            color={"$accentColor"}
            onPress={handlePress}
          />
        </CameraIconContainer>
      </YStack>
    </>
  );
};

const CameraIconContainer = styled(YStack, {
  p: "$4",
  rounded: "$12",
  bg: "$accentBackground",
});

const StyledCameraView = styled(CameraView, {
  position: "absolute",
  t: 0,
  l: 0,
  b: SHUTTER_CONTAINER_HEIGHT,
  r: 0,
});
