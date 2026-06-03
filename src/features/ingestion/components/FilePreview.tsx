import { styled, YStack, Text, Button } from "tamagui";
import { Image } from "expo-image";
import PdfView from "react-native-pdf";
import { useIngestionStore } from "../stores/IngestionStore";
import { IngestionFile } from "../types/IngestionFile";
import FileSubmitButton from "./FileSubmitButton";

export const FilePreview = () => {
  const { document, setDocument } = useIngestionStore();
  if (!document) return null;

  return (
    <YStack gap={"$3"}>
      <FileContainer document={document} />
      <YStack gap={"$2"}>
        <FileSubmitButton />
        <Button
          variant="outlined"
          rounded={"$radius.12"}
          onPress={() => setDocument(null)}
        >
          Cancel
        </Button>
      </YStack>
    </YStack>
  );
};

const FileContainer = ({ document }: { document: IngestionFile }) => {
  return (
    <YStack
      rounded={"$radius.2"}
      height={"75%"}
      aspectRatio={9 / 12}
      overflow={"hidden"}
    >
      {document.metadata.type === "pdf" ? (
        <PdfView
          source={{ uri: document.metadata.uri }}
          style={{ flex: 1 }}
          page={1}
        />
      ) : (
        <StyledImage
          source={{ uri: document.metadata.uri }}
          style={{ flex: 1 }}
        />
      )}
    </YStack>
  );
};

const StyledImage = styled(Image, {
  flex: 1,
});
