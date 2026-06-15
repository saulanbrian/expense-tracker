import DocumentVerificationCard from "@/src/components/DocumentVerificationCard";
import { FlashList } from "@shopify/flash-list";
import { useGetInifiniteDocuments } from "@/src/db/queries/documents";
import { mapInfiniteQueryResult } from "@/src/db/utils/mapInfiniteQueryResult";
import { Document, DocumentLineItem } from "@/src/db/types";
import { DocumentWithItems } from "@/src/components/DocumentVerificationCard/context";
import { Suspense } from "react";
import LoadingScreen from "@/src/components/LoadingScreen";
import { useRouter } from "expo-router";
import { ThemedScreen } from "@/src/components";

export default function VerificationInitialScreen() {
  return (
    <ThemedScreen>
      <Suspense fallback={<LoadingScreen />}>
        <UnverfiedDocuments />
      </Suspense>
    </ThemedScreen>
  );
}

const UnverfiedDocuments = () => {
  const { data } = useGetInifiniteDocuments({ statusFilter: "extracted" });
  const router = useRouter();

  return (
    <FlashList
      data={mapInfiniteQueryResult(data)}
      renderItem={({ item }) => {
        const { document_line_items, ...document } = item;
        const documentWithItems: DocumentWithItems = {
          ...(document as Document),
          lineItems: document_line_items as DocumentLineItem[],
        };
        return (
          <DocumentVerificationCard
            document={documentWithItems}
            onAction={(document) => {
              router.push(`/verification/${document.id}`);
            }}
          />
        );
      }}
    />
  );
};
