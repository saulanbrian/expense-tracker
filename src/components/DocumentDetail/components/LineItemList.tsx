import { YStack, XStack, Button, Text } from "tamagui";
import { Surface, ThemedInput } from "@/src/components/ui";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Trash2 } from "@tamagui/lucide-icons-2";
import { DocumentLineItem } from "@/src/db/types";

function LineItemRow({
  item,
  onUpdate,
  onDelete,
  mode,
}: {
  item: DocumentLineItem;
  onUpdate: (updates: Partial<DocumentLineItem>) => void;
  onDelete: () => void;
  mode: "edit" | "readonly";
}) {
  return (
    <Surface p="$3" rounded="$3" borderWidth={0.5} bg="$color2">
      <XStack gap="$3" items="flex-start">
        <YStack flex={1} gap="$3">
          <YStack gap="$1">
            <Text
              color="$color10"
              fontSize="$1"
              textTransform="uppercase"
              fontWeight="700"
            >
              Description
            </Text>
            {mode === "edit" ? (
              <ThemedInput
                value={item.description}
                onChangeText={(val) => onUpdate({ description: val })}
                borderWidth={0}
                bg="transparent"
                p={0}
                fontSize="$4"
                fontWeight="600"
                multiline
              />
            ) : (
              <Text fontSize="$4" fontWeight="600" color="$color12">
                {item.description || "—"}
              </Text>
            )}
          </YStack>

          <XStack gap="$4">
            <YStack flex={1} gap="$1">
              <Text
                color="$color10"
                fontSize="$1"
                textTransform="uppercase"
                fontWeight="700"
              >
                Qty
              </Text>
              {mode === "edit" ? (
                <ThemedInput
                  value={String(item.quantity || 0)}
                  onChangeText={(val) =>
                    onUpdate({ quantity: parseInt(val) || 0 })
                  }
                  bg="$color3"
                  size="$2"
                  py="$2"
                  rounded="$2"
                  fontWeight="700"
                />
              ) : (
                <Text fontSize="$3" fontWeight="700" color="$color12">
                  {String(item.quantity || 0)}
                </Text>
              )}
            </YStack>
            <YStack flex={2} gap="$1">
              <Text
                color="$color10"
                fontSize="$1"
                textTransform="uppercase"
                fontWeight="700"
              >
                Unit Price
              </Text>
              {mode === "edit" ? (
                <ThemedInput
                  value={String(item.unit_price || 0)}
                  onChangeText={(val) =>
                    onUpdate({ unit_price: parseFloat(val) || 0 })
                  }
                  bg="$color3"
                  size="$2"
                  py="$2"
                  rounded="$2"
                  fontWeight="700"
                />
              ) : (
                <Text fontSize="$3" fontWeight="700" color="$color12">
                  {String(item.unit_price || 0)}
                </Text>
              )}
            </YStack>
          </XStack>
        </YStack>

        {mode === "edit" && (
          <Button
            icon={<Trash2 size={16} />}
            theme={"red"}
            chromeless
            circular
            size="$3"
            onPress={onDelete}
            hoverStyle={{ bg: "$red3" }}
          />
        )}
      </XStack>
    </Surface>
  );
}

export interface LineItemListHandle {
  getUpdates: () => {
    updated: DocumentLineItem[];
    removedItemIds: string[];
    updatedItemIds: string[];
  };
}

interface LineItemListProps {
  initialItems: DocumentLineItem[];
  page?: number;
  mode: "edit" | "readonly";
}

// Export only the main component
export const LineItemList = forwardRef<LineItemListHandle, LineItemListProps>(
  ({ initialItems, page = 1, mode }, ref) => {
    const [items, setItems] = useState(initialItems);
    const [updatedItemsIds, setUpdatedItemsIds] = useState<string[]>([]);
    const [removedIds, setRemovedIds] = useState<string[]>([]);

    useImperativeHandle(ref, () => ({
      getUpdates: () => ({
        updated: items,
        updatedItemIds: updatedItemsIds,
        removedItemIds: removedIds,
      }),
    }));

    const updateLineItem = (id: string, updates: Partial<DocumentLineItem>) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );
      setUpdatedItemsIds((prev) => {
        if (prev.includes(id)) return [...prev];
        return [...prev, id];
      });
    };

    const deleteLineItem = (id: string) => {
      setRemovedIds((ids) => [...ids, id]);
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <YStack gap="$3">
        {items
          .filter((item) => item.page_number === page)
          .map((item) => (
            <LineItemRow
              key={item.id}
              item={item}
              onUpdate={(updates) => updateLineItem(item.id, updates)}
              onDelete={() => deleteLineItem(item.id)}
              mode={mode}
            />
          ))}
      </YStack>
    );
  },
);

LineItemList.displayName = "LineItemList";
