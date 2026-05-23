import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";

export const useSupabaseAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setAuthenticated(!!session);
    });

    (async () => {
      const session = supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    })();

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return { authenticated, loading };
};
