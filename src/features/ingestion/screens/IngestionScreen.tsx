import { ThemedScreen } from "@/src/components";
import { CaptureZone } from "@/src/features/ingestion/components/CaptureZone";
import { useIngestionStore } from "../stores/IngestionStore";
import { FilePreview } from "@/src/features/ingestion/components/FilePreview";

export default function IngestionScreen() {
  const { file } = useIngestionStore();

  return (
    <ThemedScreen flexCenter>
      {file ? <FilePreview /> : <CaptureZone />}
    </ThemedScreen>
  );
}
