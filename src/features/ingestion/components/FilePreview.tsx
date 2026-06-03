import { styled, YStack, Text, Button } from "tamagui";
import { Image } from "expo-image";
import PdfView from "react-native-pdf";
import { useIngestionStore } from "../stores/IngestionStore";
import { IngestionFile } from "../types/IngestionFile";
import FileSubmitButton from "./FileSubmitButton";

export const FilePreview = () => {
  const { file, setFile } = useIngestionStore();
  if (!file) return null;

  return (
    <YStack gap={"$3"}>
      <FileContainer file={file} />
      <YStack gap={"$2"}>
        <FileSubmitButton />
        <Button
          variant="outlined"
          rounded={"$radius.12"}
          onPress={() => setFile(null)}
        >
          Cancel
        </Button>
      </YStack>
    </YStack>
  );
};

const FileContainer = ({ file }: { file: IngestionFile }) => {
  return (
    <YStack
      rounded={"$radius.2"}
      height={"75%"}
      aspectRatio={9 / 12}
      overflow={"hidden"}
    >
      {file.metadata.type === "pdf" ? (
        <PdfView
          source={{ uri: file.metadata.uri }}
          style={{ flex: 1 }}
          page={1}
        />
      ) : (
        <StyledImage
          source={{ uri: file.metadata.uri }}
          style={{ flex: 1 }}
        />
      )}
    </YStack>
  );
};

const StyledImage = styled(Image, {
  flex: 1,
});
