import { YStack, XStack, Button, Separator, Text } from "tamagui";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Pencil } from "@tamagui/lucide-icons-2";
import { ThemedInput } from "@/src/components/ui";
import { Document } from "@/src/db/types";

function HeaderField({
  label,
  value,
  onChange,
  isLarge = false,
  mode,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isLarge?: boolean;
  mode: "edit" | "readonly";
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <YStack gap="$1" py="$2">
      <Text
        color="$color10"
        fontSize="$1"
        textTransform="uppercase"
        fontWeight="700"
        letterSpacing={0.5}
      >
        {label}
      </Text>
      <XStack gap="$2" items="center" justify="space-between">
        {isEditing && mode === "edit" ? (
          <ThemedInput
            value={value}
            onChangeText={onChange}
            flex={1}
            autoFocus
            size="$3"
            fontWeight="700"
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <Text
            fontSize={isLarge ? "$7" : "$5"}
            fontWeight="800"
            color="$color12"
            flex={1}
            numberOfLines={1}
          >
            {value || (mode === "edit" ? `Enter ${label}` : "—")}
          </Text>
        )}
        {mode === "edit" && (
          <Button
            icon={
              <Pencil size={14} color={isEditing ? "$colorFocus" : "$color10"} />
            }
            chromeless
            circular
            size="$2"
            onPress={() => setIsEditing(!isEditing)}
            bg={isEditing ? "$backgroundFocus" : "transparent"}
          />
        )}
      </XStack>
    </YStack>
  );
}

export interface HeaderFieldsHandle {
  getUpdates: () => Pick<Document, "vendor_name" | "invoice_number">;
}

interface HeaderFieldsProps {
  initialData: Pick<Document, "vendor_name" | "invoice_number">;
  mode: "edit" | "readonly";
}

// Export only the main component
export const HeaderFields = forwardRef<HeaderFieldsHandle, HeaderFieldsProps>(
  ({ initialData, mode }, ref) => {
    const [data, setData] = useState(initialData);

    useImperativeHandle(ref, () => ({
      getUpdates: () => data,
    }));

    const updateField = (field: keyof Document, value: any) => {
      setData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <YStack
        p="$3"
        rounded="$3"
        borderWidth={0.5}
        bg="$color2"
        borderColor="$borderColor"
      >
        <HeaderField
          label="Vendor Name"
          value={data.vendor_name || "N/A"}
          onChange={(val) => updateField("vendor_name", val)}
          isLarge
          mode={mode}
        />
        <Separator borderColor="$borderColor" opacity={0.5} />
        <HeaderField
          label="Invoice Number"
          value={data.invoice_number || ""}
          onChange={(val) => updateField("invoice_number", val)}
          mode={mode}
        />
      </YStack>
    );
  },
);

HeaderFields.displayName = "HeaderFields";
