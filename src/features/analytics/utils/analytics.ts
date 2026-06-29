import type { DocumentSchema } from "@/src/db/types";

/** Time range options for the analytics date filter. */
export type FilterOption = "7d" | "30d" | "ytd" | "all";

/** Converts a FilterOption to a number of days to look back.
 *  Returns `undefined` for "all" (no date filter). */
export function getPastDays(option: FilterOption): number | undefined {
  switch (option) {
    case "7d":
      return 7;
    case "30d":
      return 30;
    case "ytd": {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return Math.floor(
        (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000),
      );
    }
    case "all":
      return undefined;
  }
}

/** A single day's aggregated spending total. */
export type DailyTotal = {
  date: string;
  total: number;
};

/** Groups documents by invoice date and sums usd_conversion_total per day.
 *  Skips items where usd_conversion_total is null.
 *  Returns results sorted chronologically. */
export function aggregateByDay(
  items: Pick<DocumentSchema, "invoice_date" | "usd_conversion_total">[],
): DailyTotal[] {
  const map = new Map<string, number>();

  for (const item of items) {
    if (!item.invoice_date || item.usd_conversion_total == null) continue;
    const day = item.invoice_date.split("T")[0];
    map.set(day, (map.get(day) ?? 0) + item.usd_conversion_total);
  }

  return Array.from(map.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Formats an ISO date string (YYYY-MM-DD) to a short label like "Jan 15". */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Formats a numeric label for the chart Y-axis as a compact currency string.
 *  Values >= 1000 are shown as "$X.Xk". */
export function formatYLabel(label: string): string {
  const num = parseFloat(label);
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}k`;
  return `$${num.toFixed(0)}`;
}
