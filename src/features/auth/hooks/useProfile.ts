import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/scheme";
import { useEffect, useState } from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  return { profile, loading };
};
