import { CameraCapturedPicture } from "expo-camera";
import { DocumentPickerAsset } from "expo-document-picker";

export type IngestionFile = {
  rawFile: DocumentPickerAsset | CameraCapturedPicture;
  metadata: {
    name: string;
    bytes_size: number;
    uri: string;
    type: "pdf" | "image";
  };
};
