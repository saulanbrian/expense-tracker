import { BarChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { YStack, Text, useTheme } from "tamagui";
import { useGetAnalytics } from "@/src/db/queries/analytics";
import {
  aggregateByDay,
  formatDate,
  formatYLabel,
} from "../../utils/analytics";

export function SpendingChart({ pastDays }: { pastDays?: number }) {
  const { data } = useGetAnalytics(pastDays);
  const theme = useTheme();

  const dailyTotals = useMemo(() => aggregateByDay(data ?? []), [data]);

  const totalSpending = useMemo(
    () => dailyTotals.reduce((sum, d) => sum + d.total, 0),
    [dailyTotals],
  );

  const barColor = "#3B82F6";
  const labelColor = theme.color11?.val ?? "#999";
  const axisColor = theme.borderColor?.val ?? "#333";

  const chartData = useMemo(
    () =>
      dailyTotals.map((d) => ({
        value: d.total,
        label: formatDate(d.date),
        frontColor: barColor,
      })),
    [dailyTotals, barColor],
  );

  if (dailyTotals.length === 0) {
    return (
      <YStack items="center" justify="center" flex={1} px="$4">
        <YStack
          items="center"
          justify="center"
          gap="$2"
          bg="$color3"
          rounded="$4"
          borderWidth={0.5}
          borderColor="$borderColor"
          p="$6"
          width="100%"
        >
          <Text color="$color10" fontSize="$4" style={{ textAlign: "center" }}>
            No spending data for this period
          </Text>
          <Text color="$color11" fontSize="$3" style={{ textAlign: "center" }}>
            Upload and verify documents to see your spending breakdown.
          </Text>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack gap="$3" flex={1}>
      <YStack px="$4" gap="$1">
        <Text
          color="$color10"
          fontSize="$2"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Total Spending
        </Text>
        <Text
          color="$color12"
          fontSize="$8"
          fontWeight="700"
          fontVariant={["tabular-nums"]}
          letterSpacing={-0.5}
        >
          $
          {totalSpending.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </YStack>

      <YStack
        mx="$4"
        bg="$color3"
        rounded="$4"
        borderWidth={0.5}
        borderColor="$borderColor"
        p="$3"
        pb="$0"
      >
        <BarChart
          data={chartData}
          height={220}
          barWidth={20}
          spacing={16}
          initialSpacing={12}
          endSpacing={12}
          roundedTop
          isAnimated
          animationDuration={400}
          yAxisThickness={0.5}
          yAxisColor={axisColor}
          xAxisThickness={0.5}
          xAxisColor={axisColor}
          yAxisTextStyle={{ color: labelColor, fontSize: 11 }}
          xAxisLabelTextStyle={{ color: labelColor, fontSize: 10 }}
          noOfSections={4}
          rulesThickness={0.5}
          rulesColor={axisColor}
          dashWidth={4}
          dashGap={3}
          yAxisLabelWidth={40}
          formatYLabel={formatYLabel}
          showReferenceLine1
        />
      </YStack>
    </YStack>
  );
}
