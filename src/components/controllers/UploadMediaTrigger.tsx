import * as DocumentPicker from "expo-document-picker";
import { useMediaLibraryPermissions } from "expo-image-picker";
import React, { useCallback } from "react";

type HandleUploadReturnType =
  Promise<DocumentPicker.DocumentPickerResult | null>;

type UploadMediaTriggerProps = {
  children: (onPress: () => HandleUploadReturnType) => React.ReactNode;
  options?: DocumentPicker.DocumentPickerOptions;
};

export default function UploadMediaTrigger({
  children,
  options,
}: UploadMediaTriggerProps) {
  const [permission, requestPermission] = useMediaLibraryPermissions();

  const handleUpload = useCallback(async (): HandleUploadReturnType => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        return null;
      }
    }
    const data = await DocumentPicker.getDocumentAsync(options);
    return data;
  }, [permission, requestPermission]);

  return <>{children(handleUpload)}</>;
}
