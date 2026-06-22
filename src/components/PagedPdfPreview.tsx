import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Pdf, { PdfRef } from "react-native-pdf";
import { Button, Text, View, XStack, YStack, YStackProps } from "tamagui";
import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons-2";
import LoadingScreen from "./LoadingScreen";
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
  const pdfRef = useRef<PdfRef>(null);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const currentPageRef = useRef(1);

  // Reset page state to 1 when the file changes
  useEffect(() => {
    currentPageRef.current = 1;
    setPage(1);
  }, [blobPath]);

  // Memoize source object to avoid recreations on re-render which can cause native crashes
  const source = useMemo(() => ({ uri: blobPath, cache: true }), [blobPath]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (pdfRef.current && newPage !== currentPageRef.current) {
        currentPageRef.current = newPage;
        setPage(newPage);
        onPageChange?.(newPage);
        pdfRef.current.setPage(newPage);
      }
    },
    [onPageChange],
  );

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
          key={blobPath} // Remount PDF component only if the underlying file changes
          source={source}
          ref={pdfRef}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
          horizontal={true}
          enablePaging={true}
          fitPolicy={2}
          enableAntialiasing={true}
          onLoadComplete={(numPages) => setNumberOfPages(numPages || 1)}
          onPageChanged={(p) => {
            if (p !== currentPageRef.current) {
              currentPageRef.current = p;
              setPage(p);
              onPageChange?.(p);
            }
          }}
          onError={(error) => console.error("Pdf preview error:", error)}
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
            onPress={() => handlePageChange(Math.max(1, page - 1))}
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
            onPress={() => handlePageChange(Math.min(numberOfPages, page + 1))}
            pressStyle={{ opacity: 0.5 }}
          />
        </XStack>
      )}
    </YStack>
  );
}
