import { supabase } from "@/supabase/client";
import { IngestionFile } from "../types/IngestionFile";

type UploadProps = {
  file: NonNullable<IngestionFile>;
  userId: string;
};

export async function uploadDocumentFile({ file, userId }: UploadProps) {
  const fileName = file.metadata.uri.split("/").pop();

  const formData = new FormData();
  formData.append("file", {
    uri: file.metadata.uri,
    type: file.metadata.type === "pdf" ? "application/pdf" : "image/jpeg",
    name: fileName,
  } as any);

  const filePath = `${userId}/${fileName}`;

  const data = await supabase.storage
    .from("documents")
    .upload(filePath, formData);

  return data;
}
