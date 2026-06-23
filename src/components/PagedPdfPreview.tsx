import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Pdf, { PdfRef } from "react-native-pdf";
import { Button, Text, View, XStack, YStack, YStackProps } from "tamagui";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons-2";
import { LoadingScreen } from "@/src/components/ui";
import { useFetchPdfBlob } from "../hooks/useFetchPdfBlob";

type PdfPreviewProps = YStackProps & {
  uri: string;
  onPageChange?: (page: number) => void;
};

export default function PagedPdfPreview({
  uri,
  onPageChange,
  ...props
}: PdfPreviewProps) {
  const { blobPath, loading } = useFetchPdfBlob(uri);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const pdfRef = useRef<PdfRef>(null);

  const source = useMemo(() => ({ uri: blobPath, cache: true }), [blobPath]);

  const pageIncrement = useCallback(() => {
    if (pdfRef.current && numberOfPages > page) {
      setPage(page + 1);
      pdfRef.current?.setPage(page + 1);
    }
  }, [numberOfPages, page]);

  const pageDecrement = useCallback(() => {
    if (pdfRef.current && page > 1) {
      setPage(page - 1);
      pdfRef.current?.setPage(page - 1);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [blobPath]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      pdfRef.current?.setPage(3);
    }, 1000);

    return clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <YStack
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      {...props}
    >
      <View flex={1} width="100%" height="100%">
        <Pdf
          key={blobPath}
          ref={pdfRef}
          source={source}
          scrollEnabled={false}
          style={{ flex: 1, width: "100%", height: "100%" }}
          horizontal={true}
          enablePaging={true}
          fitPolicy={0}
          enableAntialiasing={true}
          onLoadComplete={(numPages) => setNumberOfPages(numPages || 1)}
          onError={(error) => console.error("Pdf preview error:", error)}
          onPageChanged={onPageChange}
          minScale={1.0}
          maxScale={4.0}
        />
      </View>

      {numberOfPages > 1 && (
        <XStack
          position="absolute"
          b="$3"
          l="$4"
          r="$4"
          height={46}
          bg="$background"
          borderWidth={1}
          borderColor="$borderColor"
          rounded={999}
          items="center"
          px="$2"
          justify="space-between"
          elevation={10}
          shadowColor="$shadowColor"
          shadowRadius={8}
          shadowOpacity={0.15}
          z={10}
        >
          <Button
            icon={
              <ChevronLeft size={20} color={page <= 1 ? "$color8" : "$color"} />
            }
            circular
            chromeless
            disabled={page <= 1}
            onPress={pageDecrement}
            pressStyle={{ opacity: 0.5 }}
          />

          <Text fontSize={14} fontWeight="600" color="$color">
            Page {page} of {numberOfPages}
          </Text>

          <Button
            icon={
              <ChevronRight
                size={20}
                color={page >= numberOfPages ? "$color8" : "$color"}
              />
            }
            circular
            chromeless
            disabled={page >= numberOfPages}
            onPress={pageIncrement}
            pressStyle={{ opacity: 0.5 }}
          />
        </XStack>
      )}
    </YStack>
  );
}
