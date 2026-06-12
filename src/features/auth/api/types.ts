import { Database } from "@/supabase/scheme";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
