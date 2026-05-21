import { styled, YStack, Text, Button } from "tamagui";
import { Image } from "expo-image";
import { IngestionFile } from "../types/IngestionFile";

export const FilePreview = ({
  ingestionFile,
}: {
  ingestionFile: IngestionFile;
}) => {
  return (
    <YStack gap={"$2"}>
      {ingestionFile.type === "image" ? (
        <StyledImage source={{ uri: ingestionFile.uri }} />
      ) : (
        <Text>pdf: {ingestionFile.name}</Text>
      )}
      <Button>
        <Text>Process</Text>
      </Button>
    </YStack>
  );
};

const StyledImage = styled(Image, {
  rounded: "$radius.2",
  height: "80%",
  aspectRatio: 9 / 12,
});
