import { useSuspenseQuery } from "@tanstack/react-query";
import { DocumentSchema } from "../types";
import { supabase } from "@/supabase/client";

type AnalyticsDocument = Pick<
  DocumentSchema,
  "currency" | "invoice_date" | "total_amount"
>;

export const useGetAnalytics = (pastDays?: number) => {
  return useSuspenseQuery<AnalyticsDocument[]>({
    queryKey: ["analytics", pastDays],
    queryFn: async () => {
      let query = supabase
        .from("documents")
        .select("*")
        .eq("status", "verified");

      if (pastDays) {
        const now = new Date();
        const fromDate = new Date(
          now.getTime() - pastDays * 24 * 60 * 60 * 1000,
        ).toISOString();
        query = query.gte("invoice_date", fromDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      //
      return data as AnalyticsDocument[];
    },
  });
};
