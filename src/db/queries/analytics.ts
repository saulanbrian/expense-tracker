import { useSuspenseQuery } from "@tanstack/react-query";
import { DocumentSchema } from "../types";
import { supabase } from "@/supabase/client";

type AnalyticsDocument = Pick<
  DocumentSchema,
  "currency" | "invoice_date" | "total_amount"
>;

const generateMockAnalyticsData = (): AnalyticsDocument[] => {
  const currencies = ["USD", "EUR", "GBP", "CAD"];
  const mockData: AnalyticsDocument[] = [];
  const now = new Date();

  // Generates 75 mock data points
  for (let i = 0; i < 75; i++) {
    // Distribute dates randomly over the past 60 days to test the `pastDays` filter
    const randomDaysAgo = Math.floor(Math.random() * 60);
    const invoiceDate = new Date(
      now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000,
    );

    // Generate a random invoice total between 10.00 and 5000.00
    const totalAmount = parseFloat(
      (Math.random() * (5000 - 10) + 10).toFixed(2),
    );

    // Pick a random currency
    const currency = currencies[Math.floor(Math.random() * currencies.length)];

    mockData.push({
      currency,
      invoice_date: invoiceDate.toISOString(),
      total_amount: totalAmount,
    });
  }
  return mockData;
};

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

      return data as AnalyticsDocument[];
    },
  });
};
