import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/scheme";

export async function insertDocument(
  document: Database["public"]["Tables"]["documents"]["Insert"],
) {
  const { data, error } = await supabase
    .from("documents")
    .insert(document)
    .select("*")
    .single();

  return { data, error };
}
