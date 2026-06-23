import PagedPdfPreview from "@/src/components/PagedPdfPreview";
import { DocumentLineItem, DocumentSchema } from "@/src/db/types";
import { FileText } from "@tamagui/lucide-icons-2";
import { Image, ImageStyle } from "expo-image";
import { Ref, useMemo, useState } from "react";
import { ScrollView, View, YStack } from "tamagui";
import { HeaderFields, HeaderFieldsHandle } from "./components/HeaderFields";
import { LineItemList, LineItemListHandle } from "./components/LineItemList";
import { SectionHeader } from "./components/SectionHeader";
import { supabase } from "@/supabase/client";

export type DocumentDetailMode = "edit" | "readonly";

export type { HeaderFieldsHandle, LineItemListHandle };

export interface DocumentDetailProps {
  document: DocumentSchema;
  lineItems: DocumentLineItem[];
  mode: DocumentDetailMode;
  headerRef?: Ref<HeaderFieldsHandle>;
  lineItemsRef?: Ref<LineItemListHandle>;
}

export default function DocumentDetail({
  document,
  lineItems,
  mode,
  headerRef,
  lineItemsRef,
}: DocumentDetailProps) {
  const [previewPage, setPreviewPage] = useState(1);
  const isImageType = useMemo(
    () => document.file_type !== "application/pdf",
    [document],
  );
  const documentFilePublicUrl = useMemo(() => {
    const { data } = supabase.storage
      .from("documents")
      .getPublicUrl(document.storage_path);
    return data.publicUrl;
  }, [document]);

  const documentSourceStyle = useMemo(
    () => ({
      height: "100%",
      width: "100%",
    }),
    [],
  );

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <YStack p="$4" gap="$5">
        <YStack gap="$3">
          <SectionHeader
            title="General Info"
            detail="Primary fields extracted from the document."
          />
          <HeaderFields
            ref={headerRef}
            mode={mode}
            initialData={{
              vendor_name: document.vendor_name,
              invoice_number: document.invoice_number,
            }}
          />
        </YStack>

        <YStack gap="$3">
          <SectionHeader
            title="Document Source"
            icon={FileText}
            detail="Review the original file before checking extracted values."
          />
          <View
            height={420}
            width="100%"
            rounded="$4"
            borderWidth={0.5}
            bg="$color3"
            borderColor="$borderColor"
            items="center"
            justify="center"
            overflow="hidden"
          >
            {isImageType ? (
              <Image
                source={{ uri: documentFilePublicUrl }}
                contentFit={"cover"}
                style={documentSourceStyle as ImageStyle}
              />
            ) : (
              <PagedPdfPreview
                uri={document.storage_path}
                flex={1}
                onPageChange={setPreviewPage}
                style={documentSourceStyle}
              />
            )}
          </View>
        </YStack>

        <YStack gap="$3">
          <SectionHeader
            title="Line Items"
            detail={`Compare extracted items against page ${previewPage}.`}
          />
          <LineItemList
            page={previewPage}
            ref={lineItemsRef}
            mode={mode}
            initialItems={lineItems}
          />
        </YStack>
      </YStack>
    </ScrollView>
  );
}
