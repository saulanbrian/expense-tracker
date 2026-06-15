import { Database } from "@/supabase/scheme";

export interface Document extends Omit<
  Database["public"]["Tables"]["documents"]["Row"],
  "status"
> {
  status: "uploaded" | "extracted" | "failed" | "verified" | null;
}

export type DocumentSchema = Document;

export type DocumentLineItem =
  Database["public"]["Tables"]["document_line_items"]["Row"];
