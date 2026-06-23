import { ThemedScreen, LoadingScreen } from "@/src/components";
import { useLocalSearchParams } from "expo-router";
import { Suspense, useCallback, useRef } from "react";
import { useGetDocument } from "@/src/db/queries/documents";
import { ArrowRight, CheckCircle2 } from "@tamagui/lucide-icons-2";
import { Button, Separator, Spinner, Text, XStack, YStack } from "tamagui";
import DocumentDetail, {
  HeaderFieldsHandle,
  LineItemListHandle,
} from "@/src/components/DocumentDetail";
import { DocumentLineItem, DocumentSchema } from "@/src/db/types";
import { useVerifyDocument } from "@/src/features/verification/hooks/useVerifyDocument";

export default function DocumentDetailVerificationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedScreen p="$0">
      <Suspense fallback={<LoadingScreen />}>
        {id ? <VerificationDetail id={id} /> : <Text>No ID provided</Text>}
      </Suspense>
    </ThemedScreen>
  );
}

function VerificationDetail({ id }: { id: string }) {
  const { data } = useGetDocument(id);
  const { mutate, isPending } = useVerifyDocument();

  //Sections Ref
  const headerRef = useRef<HeaderFieldsHandle>(null);
  const lineItemsRef = useRef<LineItemListHandle>(null);

  const handleSave = useCallback(() => {
    if (!headerRef.current || !lineItemsRef.current) {
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
  }, [id, mutate]);

  if (!data) return <Text>Document not found</Text>;

  const { document_line_items, ...document } = data;

  return (
    <YStack flex={1} bg="$background">
      <YStack flex={1}>
        <DocumentDetail
          document={document as DocumentSchema}
          lineItems={(document_line_items as DocumentLineItem[]) || []}
          mode="edit"
          headerRef={headerRef}
          lineItemsRef={lineItemsRef}
        />
      </YStack>

      <YStack
        px="$3"
        pb="$3"
        pt="$2"
        bg="$background"
        borderTopWidth={0.5}
        borderColor="$borderColor"
      >
        <Separator borderColor="$borderColor" opacity={0.5} mb="$3" />
        <Button
          theme="accent"
          size="$4"
          rounded="$4"
          height="$5"
          px="$4"
          disabled={isPending}
          onPress={handleSave}
          pressStyle={{ bg: "$color8" }}
          iconAfter={
            isPending ? (
              <Spinner color="$color" size="small" />
            ) : (
              <ArrowRight size={18} />
            )
          }
        >
          <XStack items="center" gap="$2">
            <CheckCircle2 size={16} color="$color12" />
            <Text color="$color12" fontWeight="700">
              {isPending ? "Saving changes" : "Verify and save"}
            </Text>
          </XStack>
        </Button>
      </YStack>
    </YStack>
  );
}
