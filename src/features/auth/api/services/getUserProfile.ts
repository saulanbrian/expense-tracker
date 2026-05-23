import { supabase } from "@/supabase/client";

export const getUserProfile = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("No session found");
  }
  console.log("userId: ", session.user.id);
  return supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
};
