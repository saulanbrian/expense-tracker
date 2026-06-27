import { LineChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { YStack, Text, useTheme } from "tamagui";
import { useGetAnalytics } from "@/src/db/queries/analytics";
import { aggregateByDay, formatDate } from "../../utils/analytics";

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
        value: Math.log10(d.total),
        label: formatDate(d.date),
        originalValue: d.total,
      })),
    [dailyTotals],
  );

  const formatLogYLabel = (label: string) => {
    const val = Math.pow(10, parseFloat(label));
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${Math.round(val / 1000)}k`;
    return `$${Math.floor(Math.round(val))}`;
  };

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
        <LineChart
          data={chartData}
          height={220}
          spacing={60}
          initialSpacing={12}
          endSpacing={40}
          color={barColor}
          thickness={3}
          yAxisThickness={0.5}
          yAxisColor={axisColor}
          xAxisThickness={0.5}
          xAxisColor={axisColor}
          yAxisTextStyle={{ color: labelColor, fontSize: 11 }}
          xAxisLabelTextStyle={{ color: labelColor, fontSize: 10 }}
          noOfSections={6}
          maxValue={6}
          rulesThickness={0.5}
          rulesColor={axisColor}
          dashWidth={4}
          dashGap={3}
          yAxisLabelWidth={44}
          formatYLabel={formatLogYLabel}
          showVerticalLines
          verticalLinesColor={axisColor}
          dataPointsColor={barColor}
          areaChart
          startFillColor={barColor}
          endFillColor={barColor}
          startOpacity={0.3}
          endOpacity={0.05}
          showDataPointOnFocus
          pointerConfig={{
            pointerLabelComponent: (items: any[]) => {
              const item = items[0];
              return (
                <Text
                  color="$color12"
                  fontSize="$2"
                  fontWeight="600"
                  width={100}
                  adjustsFontSizeToFit
                >
                  $
                  {Math.round(item?.originalValue ?? 0).toLocaleString("en-US")}
                </Text>
              );
            },
          }}
        />
      </YStack>
    </YStack>
  );
}
