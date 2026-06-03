import { useIngestionStore } from "../stores/IngestionStore";
import { useCallback } from "react";
import { useProfile } from "../../auth/hooks/useUser";
import { uploadDocumentFile } from "../services/uploadDocumentFile";
import { insertDocument } from "../services/insertDocument";
import { useMutation } from "@tanstack/react-query";
import ActionButton from "@/src/components/ui/ActionButton";

export default function FileSubmitButton() {
  const { document, setDocument } = useIngestionStore();
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
      setDocument(null);
    },
  });

  const hanldeSubmit = useCallback(async () => {
    if (!document || !profile)
      return {
        error: "cannot retrieve document or profile",
        data: null,
      };

    const fileInfo = document.metadata;

    const { data: uploadData, error: uploadError } = await uploadDocumentFile({
      file: document,
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
  }, [document, loadingProfile, profile, setDocument]);

  return (
    <ActionButton
      theme={"accent"}
      disabled={!document || status === "pending"}
      rounded={"$radius.12"}
      onPress={() => submit()}
      state={status}
    >
      Submit
    </ActionButton>
  );
}
