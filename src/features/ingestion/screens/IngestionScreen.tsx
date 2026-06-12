import { ThemedScreen } from "@/src/components";
import { CaptureZone } from "@/src/features/ingestion/components/CaptureZone";
import { useIngestionStore } from "../stores/IngestionStore";
import { FilePreview } from "@/src/features/ingestion/components/FilePreview";
import { ProgressContainer } from "../components/ProgressContainer";

export default function IngestionScreen() {
  const { file, pipelineStarted } = useIngestionStore();

  return (
    <ThemedScreen flexCenter>
      {pipelineStarted ? (
        <ProgressContainer />
      ) : file ? (
        <FilePreview file={file} />
      ) : (
        <CaptureZone />
      )}
    </ThemedScreen>
  );
}
