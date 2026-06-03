import { Surface } from "@/src/components";
import { Camera, UploadCloud } from "@tamagui/lucide-icons-2";
import { Button, Paragraph, Text, YStack } from "tamagui";
import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import UploadMediaTrigger from "@/src/components/controllers/UploadMediaTrigger";
import { useIngestionStore } from "../stores/IngestionStore";
import { getFileInfo } from "@/src/utils/media/getFileInfo";

export const CaptureZone = () => {
  const { setDocument } = useIngestionStore();

  return (
    <YStack>
      <UploadMediaTrigger
        options={{ type: ["application/pdf", "image/*"], multiple: false }}
      >
        {(onPress) => (
          <Surface
            p={"$9"}
            borderWidth={"$1"}
            borderStyle="dashed"
            items={"center"}
            justify={"center"}
            onPress={async () => {
              const data = await onPress();
              if (data && data.assets) {
                const asset = data.assets[0];
                if (!asset.size) {
                  asset.size = getFileInfo(asset.uri).size;
                }

                setDocument({
                  rawDocumentFile: asset,
                  metadata: {
                    name: asset.name,
                    bytes_size: asset.size,
                    uri: asset.uri,
                    type:
                      asset.mimeType === "application/pdf" ? "pdf" : "image",
                  },
                });
              }
            }}
          >
            <UploadCloud size={"$7"} />
            <Paragraph fontSize={"$2"}>Upload invoice file</Paragraph>
          </Surface>
        )}
      </UploadMediaTrigger>
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
