import { ThemedScreen } from "@/src/components/ui";
import { CaptureZone } from "./IngestionScreen/components/CaptureZone";
import { useIngestionStore } from "../stores/IngestionStore";
import { FilePreview } from "./IngestionScreen/components/FilePreview";
import { ProgressContainer } from "./IngestionScreen/components/ProgressContainer";

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
