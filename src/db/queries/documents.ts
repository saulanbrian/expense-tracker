import { supabase } from "@/supabase/client";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Document } from "../types";

export const useGetInifiniteDocuments = ({
  statusFilter,
}: {
  statusFilter?: Document["status"];
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["documents", statusFilter],
    queryFn: async ({ pageParam }) => {
      let query = supabase
        .from("documents")
        .select("*, document_line_items(*)")
        .order("created_at", { ascending: false })
        .range(pageParam * 10, pageParam * 10 + 11);

      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      return {
        currentPage: pageParam,
        results: data.slice(0, 10),
        hasNextPage: data.length === 11,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
    },
    initialPageParam: 0,
  });
};

export const useGetDocument = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*, document_line_items(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
