import { YStack, XStack, Button, Text } from "tamagui";
import { Surface } from "@/src/components/ui";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Trash2 } from "@tamagui/lucide-icons-2";
import { ThemedInput } from "@/src/components/ui";
import { DocumentLineItem } from "@/src/db/types";

function LineItemRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: DocumentLineItem;
  onUpdate: (updates: Partial<DocumentLineItem>) => void;
  onDelete: () => void;
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
            </YStack>
          </XStack>
        </YStack>

        <Button
          icon={<Trash2 size={16} />}
          theme={"red"}
          chromeless
          circular
          size="$3"
          onPress={onDelete}
          hoverStyle={{ bg: "$red3" }}
        />
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
}

// Export only the main component
export const LineItemList = forwardRef<LineItemListHandle, LineItemListProps>(
  ({ initialItems, page = 1 }, ref) => {
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
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemovedIds((prev) => [...prev, id]);
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
            />
          ))}
      </YStack>
    );
  },
);
