import { ThemedScreen } from "@/src/components/ui";
import { Suspense, useMemo, useState } from "react";
import { YStack, ScrollView } from "tamagui";
import { useGetAnalytics } from "@/src/db/queries/analytics";
import type { FilterOption } from "../AnalyticsScreen/components/DateFilter";
import { DateFilter } from "../AnalyticsScreen/components/DateFilter";
import { ChartSkeleton } from "../AnalyticsScreen/components/ChartSkeleton";
import { SpendingChart } from "../AnalyticsScreen/components/SpendingChart";
import { VendorSpendingList } from "../AnalyticsScreen/components/VendorSpendingList";
import { getPastDays } from "../utils/analytics";

function AnalyticsContent({ pastDays }: { pastDays?: number }) {
  const { data } = useGetAnalytics(pastDays);

  return (
    <YStack gap="$4">
      <SpendingChart data={data} />
      <VendorSpendingList data={data} />
    </YStack>
  );
}

export default function AnalyticsScreen() {
  const [filter, setFilter] = useState<FilterOption>("30d");

  const pastDays = useMemo(() => {
    return getPastDays(filter);
  }, [filter]);

  return (
    <ThemedScreen>
      <ScrollView>
        <YStack flex={1} gap="$4" pt="$4">
          <DateFilter value={filter} onChange={setFilter} />
          <Suspense fallback={<ChartSkeleton />}>
            <AnalyticsContent pastDays={pastDays} />
          </Suspense>
        </YStack>
      </ScrollView>
    </ThemedScreen>
  );
}
