import { supabase } from "@/supabase/client";
import { DocumentSchema } from "../types";

export async function updateDocument(
  id: string,
  data: Partial<DocumentSchema>,
) {
  const { data: updatedDocument, error } = await supabase
    .from("documents")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.log("Error updating document", error);
    throw error;
  }

  return updatedDocument;
}
