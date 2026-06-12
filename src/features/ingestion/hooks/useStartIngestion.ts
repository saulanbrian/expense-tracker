import { useMutation } from "@tanstack/react-query";
import {
  useIngestionStore,
  PipelineStage,
  StageStatus,
} from "../stores/IngestionStore";
import { uploadDocumentFile } from "../services/uploadDocumentFile";
import { insertDocument } from "../services/insertDocument";
import { api } from "@/src/api";
import { IngestionFile } from "../types/IngestionFile";

export default function useStartIngestion() {
  const {
    updatePipelineStage,
    setPipelineStarted,
    setCurrentTaskId,
    connectToSocket,
  } = useIngestionStore();

  return useMutation({
    mutationFn: async ({
      profileId,
      organizationId,
      file,
    }: {
      profileId: string;
      file: IngestionFile;
      organizationId: string;
    }) => {
      //Uplload file to storage
      const { data: uploadedFile, error: uploadError } =
        await uploadDocumentFile({ file, userId: profileId });
      if (uploadError) {
        throw uploadError;
      }

      //Insert document into database
      const metadata = file.metadata;
      const { data: document, error } = await insertDocument({
        file_name: metadata.name,
        file_size_bytes: metadata.bytes_size,
        uploaded_by: profileId,
        organization_id: organizationId,
        storage_path: uploadedFile.path,
        file_type: metadata.type === "pdf" ? "application/pdf" : "image/jpeg",
      });
      if (error || !document) {
        throw error ?? new Error("Failed to insert document");
      }

      //Start ingestion
      const res = await api.post(`/ingestion?document_id=${document.id}`);
      if (res.status !== 200) {
        throw new Error("Failed to start ingestion");
      }
      setCurrentTaskId(res.data.task_id);
      connectToSocket();
      setPipelineStarted(true);
      updatePipelineStage(PipelineStage.Retrieving, StageStatus.InProgress);
      return res.data;
    },
  });
}
