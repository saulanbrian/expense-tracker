import { ThemedScreen } from "@/src/components/ui";
import { Suspense, useMemo, useState } from "react";
import { YStack } from "tamagui";
import type { FilterOption } from "../AnalyticsScreen/components/DateFilter";
import { DateFilter } from "../AnalyticsScreen/components/DateFilter";
import { SpendingChart } from "../AnalyticsScreen/components/SpendingChart";
import { getPastDays } from "../utils/analytics";

export default function AnalyticsScreen() {
  const [filter, setFilter] = useState<FilterOption>("30d");

  const pastDays = useMemo(() => {
    return getPastDays(filter);
  }, [filter]);

  return (
    <ThemedScreen>
      <YStack flex={1} gap="$4" pt="$4">
        <DateFilter value={filter} onChange={setFilter} />
        <Suspense>
          <SpendingChart pastDays={pastDays} />
        </Suspense>
      </YStack>
    </ThemedScreen>
  );
}
