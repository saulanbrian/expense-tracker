import { useIngestionStore } from "../stores/IngestionStore";
import { useCallback } from "react";
import { useProfile } from "../../auth/hooks/useUser";
import { uploadDocumentFile } from "../services/uploadDocumentFile";
import { insertDocument } from "../services/insertDocument";
import { useMutation } from "@tanstack/react-query";
import ActionButton from "@/src/components/ui/ActionButton";

export default function FileSubmitButton() {
  const { file, setFile } = useIngestionStore();
  const { profile, loading: loadingProfile } = useProfile();
  const { mutate: submit, status } = useMutation({
    mutationFn: async () => {
      const { data, error } = await hanldeSubmit();
      if (error) {
        throw new Error(error.toString());
      }
      return data;
    },
    onSuccess: () => {
      setFile(null);
    },
  });

  const hanldeSubmit = useCallback(async () => {
    if (!file || !profile)
      return {
        error: "cannot retrieve file or profile",
        data: null,
      };

    const fileInfo = file.metadata;

    const { data: uploadData, error: uploadError } = await uploadDocumentFile({
      file: file,
      userId: profile.id,
    });

    if (uploadData) {
      const { data, error } = await insertDocument({
        file_name: fileInfo.name,
        file_size_bytes: fileInfo.bytes_size,
        file_type: fileInfo.type == "pdf" ? "application/pdf" : "image/jpeg",
        organization_id: profile.organization_id!,
        storage_path: uploadData.path,
        uploaded_by: profile.id,
      });
      return { data, error };
    }
    return { data: uploadData, error: uploadError };
  }, [file, loadingProfile, profile, setFile]);

  return (
    <ActionButton
      theme={"accent"}
      disabled={!file || status === "pending"}
      rounded={"$radius.12"}
      onPress={() => submit()}
      state={status}
    >
      Submit
    </ActionButton>
  );
}
