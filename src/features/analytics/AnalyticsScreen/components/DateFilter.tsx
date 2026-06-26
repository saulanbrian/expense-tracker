import { Button, Text, XStack } from "tamagui";
import type { FilterOption } from "../../utils/analytics";

const options: { label: string; value: FilterOption }[] = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "YTD", value: "ytd" },
  { label: "All", value: "all" },
];

type DateFilterProps = {
  value: FilterOption;
  onChange: (option: FilterOption) => void;
};

function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <XStack gap="$2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <Button
            key={option.value}
            size="$3"
            rounded="$4"
            theme={active ? "accent" : undefined}
            bg={active ? undefined : "$color4"}
            pressStyle={{ opacity: 0.8 }}
            onPress={() => onChange(option.value)}
          >
            <Text
              fontWeight="700"
              color={active ? "$color12" : "$color11"}
              fontSize="$3"
            >
              {option.label}
            </Text>
          </Button>
        );
      })}
    </XStack>
  );
}

export { DateFilter };
export type { FilterOption };
