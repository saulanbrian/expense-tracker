import { useEffect, useState } from "react";
import RNFetchBlob from "react-native-blob-util";
import { supabase } from "@/supabase/client";

export const useFetchPdfBlob = (uri: string) => {
  const [blobPath, setBlobPath] = useState<string>();
  const [loading, setLoading] = useState(true);

  const fetchPdfBlob = async () => {
    const data = supabase.storage.from("documents").getPublicUrl(uri);
    const dirs = RNFetchBlob.fs.dirs;
    const res = await RNFetchBlob.config({
      path: `${dirs.DocumentDir}/${uri}`,
      fileCache: true,
      appendExt: "pdf",
    }).fetch("GET", data.data.publicUrl);
    setBlobPath(res.path() ?? undefined);
    setLoading(false);
  };

  useEffect(() => {
    fetchPdfBlob();
  }, []);

  return { blobPath, loading };
};
