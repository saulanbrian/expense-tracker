import { useMemo } from "react";
import { XStack, YStack, Text } from "tamagui";
import type { AnalyticsDocument } from "@/src/db/queries/analytics";

type VendorTotal = {
  vendor: string;
  total: number;
  pct: number;
};

function aggregateByVendor(
  items: Pick<AnalyticsDocument, "vendor_name" | "usd_conversion_total">[],
): VendorTotal[] {
  const map = new Map<string, number>();

  for (const item of items) {
    if (!item.vendor_name || item.usd_conversion_total == null) continue;
    map.set(
      item.vendor_name,
      (map.get(item.vendor_name) ?? 0) + item.usd_conversion_total,
    );
  }

  const grandTotal = Array.from(map.values()).reduce((s, v) => s + v, 0);

  return Array.from(map.entries())
    .map(([vendor, total]) => ({
      vendor,
      total,
      pct: grandTotal > 0 ? (total / grandTotal) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}

function barColor(pct: number): string {
  if (pct < 5) return "#3B82F6";
  if (pct < 15) return "#06B6D4";
  if (pct < 30) return "#F59E0B";
  return "#EF4444";
}

type VendorSpendingListProps = {
  data: AnalyticsDocument[];
};

export function VendorSpendingList({ data }: VendorSpendingListProps) {
  const vendorTotals = useMemo(
    () => aggregateByVendor(data ?? []),
    [data],
  );

  if (vendorTotals.length === 0) return null;

  return (
    <YStack px="$2" gap="$3">
      <XStack items="center" justify="space-between">
        <Text
          color="$color10"
          fontSize="$2"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Top 10 Vendors
        </Text>
      </XStack>

      <YStack
        bg="$color3"
        rounded="$4"
        borderWidth={0.5}
        borderColor="$borderColor"
        overflow="hidden"
      >
        {vendorTotals.map((v, i) => (
          <YStack
            key={v.vendor}
            px="$3"
            py="$3"
            gap="$2"
            borderBottomWidth={i < vendorTotals.length - 1 ? 0.5 : 0}
            borderBottomColor="$borderColor"
          >
            <XStack items="center" justify="space-between">
              <Text
                color="$color12"
                fontSize="$3"
                fontWeight="500"
                flex={1}
                numberOfLines={1}
              >
                {v.vendor}
              </Text>
              <XStack items="center" gap="$3">
                <Text
                  color="$color12"
                  fontSize="$3"
                  fontWeight="600"
                  fontVariant={["tabular-nums"]}
                >
                  {v.pct.toFixed(1)}%
                </Text>
                <Text
                  color="$color11"
                  fontSize="$3"
                  fontWeight="500"
                  fontVariant={["tabular-nums"]}
                >
                  $
                  {v.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </XStack>
            </XStack>
            <YStack height={4} rounded="$2" bg="$color4" overflow="hidden">
              <YStack
                width={`${Math.max(v.pct, 1)}%`}
                height={4}
                rounded="$2"
                style={{ backgroundColor: barColor(v.pct) }}
              />
            </YStack>
          </YStack>
        ))}
      </YStack>
    </YStack>
  );
}
