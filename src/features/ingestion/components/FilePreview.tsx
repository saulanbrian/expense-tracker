import { styled, YStack, Text, Button } from "tamagui";
import { Image } from "expo-image";
import { IngestionFile } from "../types/IngestionFile";
import PdfView from "react-native-pdf";
import { useIngestionStore } from "../stores/IngestionStore";

export const FilePreview = ({
  ingestionFile,
}: {
  ingestionFile: IngestionFile;
}) => {
  const { setStagedFile } = useIngestionStore();

  return (
    <YStack gap={"$3"}>
      <FileContainer>
        {ingestionFile.type === "image" ? (
          <StyledImage source={{ uri: ingestionFile.uri }} />
        ) : (
          <PdfView source={{ uri: ingestionFile.uri }} style={{ flex: 1 }} />
        )}
      </FileContainer>
      <YStack gap={"$2"}>
        <Button theme={"accent"} rounded={"$radius.12"}>
          Process
        </Button>
        <Button
          variant="outlined"
          rounded={"$radius.12"}
          onPress={() => setStagedFile(null)}
        >
          Cancel
        </Button>
      </YStack>
    </YStack>
  );
};

const FileContainer = styled(YStack, {
  rounded: "$radius.2",
  height: "75%",
  aspectRatio: 9 / 12,
  overflow: "hidden",
});

const StyledImage = styled(Image, {
  flex: 1,
});
