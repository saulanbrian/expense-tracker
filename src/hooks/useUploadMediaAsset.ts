import { useMediaLibraryPermissions } from "expo-image-picker";
import { useCallback } from "react";
import * as DocumentPicker from "expo-document-picker";

export const useUploadMediaAsset = () => {
  const [permission, requestPermission] = useMediaLibraryPermissions();

  const uploadAsset = useCallback(
    async (options: DocumentPicker.DocumentPickerOptions) => {
      if (!permission?.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          return;
        }
      }

      return await DocumentPicker.getDocumentAsync(options);
    },
    [permission, requestPermission],
  );

  return { uploadAsset, permission };
};
