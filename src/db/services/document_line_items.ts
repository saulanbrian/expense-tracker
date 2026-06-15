import { supabase } from "@/supabase/client";
import { DocumentLineItem } from "../types";

export async function updateDocumentLineItem(
  id: string,
  data: Partial<DocumentLineItem>,
) {
  const { data: updatedDocumentLineItem, error } = await supabase
    .from("document_line_items")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.log("Error updating document line item", error);
    throw error;
  }

  return updatedDocumentLineItem;
}

export async function deleteDocumentLineItem(id: string) {
  const { error } = await supabase
    .from("document_line_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Error deleting document line item", error);
    throw error;
  }

  return true;
}
