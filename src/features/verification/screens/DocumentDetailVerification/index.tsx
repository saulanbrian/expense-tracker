import { ThemedScreen, LoadingScreen, StackHeader } from "@/src/components";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Suspense, useCallback, useRef } from "react";
import { useGetDocument } from "@/src/db/queries/documents";
import { ActionButton } from "@/src/components";
import { YStack, ScrollView, View, Text, XStack } from "tamagui";
import { FileText } from "@tamagui/lucide-icons-2";
import { SectionHeader } from "./components/SectionHeader";
import { HeaderFields, HeaderFieldsHandle } from "./components/HeaderFields";
import { LineItemList, LineItemListHandle } from "./components/LineItemList";
import { DocumentLineItem } from "@/src/db/types";
import { useVerifyDocument } from "../../hooks/useVerifyDocument";

export default function DocumentDetailVerificationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedScreen p="$0">
      <Suspense fallback={<LoadingScreen />}>
        {id ? <DocumentDetail id={id} /> : <Text>No ID provided</Text>}
      </Suspense>
    </ThemedScreen>
  );
}

function DocumentDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data } = useGetDocument(id);
  const headerRef = useRef<HeaderFieldsHandle>(null);
  const lineItemsRef = useRef<LineItemListHandle>(null);
  const { mutate, isPending, status } = useVerifyDocument();

  if (!data) return <Text>Document not found</Text>;

  const { document_line_items, ...document } = data;

  const handleSave = useCallback(() => {
    if (!headerRef.current || !lineItemsRef.current) {
      console.log("Refs not ready");
      return;
    }

    const header = headerRef.current.getUpdates();
    const lineItemChanges = lineItemsRef.current.getUpdates();

    mutate({
      documentId: id,
      updateFields: header,
      lineItemsToDelete: lineItemChanges.removedItemIds,
      lineItemsToUpdate: lineItemChanges.updated.filter((item) =>
        lineItemChanges.updatedItemIds.includes(item.id),
      ),
    });
  }, [id, mutate, router]);

  return (
    <View flex={1}>
      <ScrollView flex={1} contentContainerStyle={{ pb: 100 }}>
        <YStack p="$4" gap="$6">
          <YStack>
            <SectionHeader title="General Info" />
            <HeaderFields
              ref={headerRef}
              initialData={{
                vendor_name: document.vendor_name,
                invoice_number: document.invoice_number,
              }}
            />
          </YStack>

          <YStack>
            <SectionHeader title="Document Source" icon={FileText} />
            <View
              height={280}
              width="100%"
              rounded="$3"
              borderWidth={0.5}
              bg="$color3"
              borderColor="$borderColor"
              items="center"
              justify="center"
              overflow="hidden"
            >
              <View p="$4" items="center" gap="$2">
                <FileText size={40} color="$color8" />
                <Text color="$color11" fontWeight="600" text="center">
                  Preview Placeholder
                </Text>
                <Text color="$color9" fontSize="$1" text="center" px="$4">
                  {document.storage_path}
                </Text>
              </View>
            </View>
          </YStack>

          <YStack gap="$3">
            <XStack justify="space-between" items="center" px="$1">
              <SectionHeader title="Line Items" />
            </XStack>
            <LineItemList
              ref={lineItemsRef}
              initialItems={(document_line_items as DocumentLineItem[]) || []}
            />
          </YStack>
        </YStack>
      </ScrollView>

      <View
        position="absolute"
        b={0}
        l={0}
        r={0}
        bg="$background"
        p="$4"
        borderTopWidth={0.5}
        borderColor="$borderColor"
      >
        <ActionButton
          state={status}
          disabled={isPending}
          onPress={handleSave}
          theme={"blue"}
        >
          Verify & Save
        </ActionButton>
      </View>
    </View>
  );
}
