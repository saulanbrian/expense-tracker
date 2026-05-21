import { ThemedScreen } from "@/src/components";
import { CaptureZone } from "@/src/features/ingestion/components/CaptureZone";
import { useIngestionStore } from "../stores/IngestionStore";
import { FilePreview } from "@/src/features/ingestion/components/FilePreview";

export default function IngestionScreen() {
  const { stagedFile } = useIngestionStore();

  return (
    <ThemedScreen flexCenter>
      {stagedFile ? (
        <FilePreview ingestionFile={stagedFile} />
      ) : (
        <CaptureZone />
      )}
    </ThemedScreen>
  );
}
