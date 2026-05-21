import { Surface } from "@/src/components";
import { Camera, UploadCloud } from "@tamagui/lucide-icons-2";
import { Button, Paragraph, Text, YStack } from "tamagui";
import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { useIngestionStore } from "../stores/IngestionStore";
import { TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export const CaptureZone = () => {
  const [permissions, requestPermissions] = useMediaLibraryPermissions();
  const { setStagedFile } = useIngestionStore();

  const handlePress = useCallback(async () => {
    if (!permissions?.granted) {
      const result = await requestPermissions();
      if (!result.granted) {
        return;
      }
    }
    const { assets, canceled } = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
      multiple: false,
      base64: true,
    });
    if (canceled || assets.length === 0) {
      return;
    }
    const file = assets[0];
    setStagedFile({
      uri: file.uri,
      name: file.name,
      type: file.mimeType === "application/pdf" ? "pdf" : "image",
    });
  }, [permissions]);

  return (
    <YStack>
      <TouchableOpacity onPress={handlePress}>
        <Surface
          p={"$9"}
          borderWidth={"$1"}
          borderStyle="dashed"
          items={"center"}
          justify={"center"}
        >
          <UploadCloud size={"$7"} />
          <Paragraph fontSize={"$2"}>Upload invoice file</Paragraph>
        </Surface>
      </TouchableOpacity>
      <CameraButton />
    </YStack>
  );
};

const CameraButton = () => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push("/camera-scan");
  }, []);

  return (
    <Button icon={() => <Camera size={"$1"} />} onPress={handlePress}>
      <Text>Take a photo</Text>
    </Button>
  );
};
