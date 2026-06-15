import React, { useState, useMemo } from "react";
import { Text, XStack, YStack, Button, Separator, Card, View } from "tamagui";
import { Surface } from "@/src/components/ui";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { DocumentDataField } from "./DocumentDataField";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle,
  Hash,
  Calendar,
  CreditCard,
  RotateCcw,
  AlertCircle,
  ArrowRight,
} from "@tamagui/lucide-icons-2";
import { DocumentLineItem } from "@/src/db/types";
import {
  DocumentProvider,
  useDocumentContext,
  DocumentWithItems,
} from "./context";

interface DocumentVerificationCardProps {
  document: DocumentWithItems;
  children?: React.ReactNode;
  onAction?: (document: DocumentWithItems) => void;
}

const DocumentVerificationCard = ({
  document,
  children,
  onAction,
}: DocumentVerificationCardProps) => {
  const content = children || (
    <>
      <DocumentVerificationCard.Header />
      <DocumentVerificationCard.Separator />
      <DocumentVerificationCard.MainData />
      <DocumentVerificationCard.Separator />
      <DocumentVerificationCard.LineItems />
      <DocumentVerificationCard.Footer />
    </>
  );

  return (
    <DocumentProvider document={document} onAction={onAction}>
      <Surface borderWidth={0.5} m="$2" p="$3" bg={"$color3"} rounded={"$2"}>
        <YStack gap="$2.5">{content}</YStack>
      </Surface>
    </DocumentProvider>
  );
};

const useCurrencyFormatter = (currency: string | null) => {
  return useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    });
  }, [currency]);
};

DocumentVerificationCard.Separator = () => (
  <Separator borderColor="$borderColor" />
);

DocumentVerificationCard.Header = () => {
  const { document } = useDocumentContext();

  const statusConfig = useMemo(() => {
    switch (document.status) {
      case "extracted":
        return { label: "Extracted", icon: CheckCircle };
      case "verified":
        return { label: "Verified", icon: CheckCircle };
      case "failed":
        return { label: "Failed", icon: AlertCircle };
      case "uploaded":
        return { label: "Uploaded", icon: FileText };
      default:
        return { label: document.status || "Unknown", icon: FileText };
    }
  }, [document.status]);

  return (
    <XStack justify="space-between" items="center">
      <XStack items="center" gap="$2" flex={1}>
        <View bg="$color3" p="$1.5" rounded="$3">
          <FileText size={16} color="$colorFocus" />
        </View>
        <YStack flex={1}>
          <Text fontSize="$5" fontWeight="700" color="$color" numberOfLines={1}>
            {document.vendor_name || "Unknown Vendor"}
          </Text>
          <XStack items={"center"} ml={-1}>
            <Hash size={10} color="$color10" />
            <Text color="$color10" fontSize="$2" fontWeight="500">
              {document.invoice_number || "N/A"}
            </Text>
          </XStack>
        </YStack>
      </XStack>

      <DocumentStatusBadge
        label={statusConfig.label}
        status={document.status}
        icon={statusConfig.icon}
      />
    </XStack>
  );
};

DocumentVerificationCard.MainData = () => {
  const { document } = useDocumentContext();
  const formatter = useCurrencyFormatter(document.currency);

  const formattedDate = useMemo(() => {
    if (!document.invoice_date) return "N/A";
    return new Date(document.invoice_date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [document.invoice_date]);

  return (
    <XStack justify="space-between" items="center">
      <DocumentDataField
        label="Invoice Date"
        value={formattedDate}
        icon={Calendar}
      />
      <DocumentDataField
        label="Total Amount"
        value={formatter.format(document.total_amount || 0)}
        icon={CreditCard}
        items="flex-end"
        valueFontSize="$6"
      />
    </XStack>
  );
};

DocumentVerificationCard.LineItems = () => {
  const { document } = useDocumentContext();
  const [showLineItems, setShowLineItems] = useState(false);
  const formatter = useCurrencyFormatter(document.currency);

  return (
    <YStack gap="$2.5">
      <XStack justify="space-between" items="center">
        <XStack items="center" gap="$2">
          <Text fontSize="$3" fontWeight="700" color="$color">
            Line Items
          </Text>
          <View
            bg="$color4"
            px="$2"
            py="$0.5"
            rounded="$10"
            borderWidth={0.5}
            borderColor="$borderColor"
          >
            <Text fontSize="$1" fontWeight="800" color="$color11">
              {document.lineItems.length}
            </Text>
          </View>
        </XStack>
        <Button
          size="$2"
          circular
          chromeless
          scaleIcon={1.2}
          bg={showLineItems ? "$color4" : "transparent"}
          icon={showLineItems ? ChevronUp : ChevronDown}
          onPress={() => setShowLineItems(!showLineItems)}
        />
      </XStack>

      {showLineItems && (
        <YStack gap="$2" mt="$1">
          {document.lineItems.length > 0 ? (
            document.lineItems.map((item) => (
              <LineItemCard
                key={item.id}
                item={item}
                formatCurrency={(val) => formatter.format(val || 0)}
              />
            ))
          ) : (
            <YStack items="center" py="$4">
              <Text color="$color10" fontSize="$2" fontWeight="500">
                No line items found
              </Text>
            </YStack>
          )}
        </YStack>
      )}
    </YStack>
  );
};

DocumentVerificationCard.Footer = () => {
  const { document, onAction } = useDocumentContext();

  const actionConfig = useMemo(() => {
    switch (document.status) {
      case "extracted":
        return {
          label: "Verify Document",
          icon: ArrowRight,
          theme: "accent" as const,
        };
      case "failed":
        return {
          label: "Retry Extraction",
          icon: RotateCcw,
          theme: "red" as const,
        };
      default:
        return null;
    }
  }, [document.status]);

  if (!actionConfig) return null;

  return (
    <YStack gap="$2.5">
      <DocumentVerificationCard.Separator />
      <Button
        size="$3"
        theme={actionConfig.theme}
        iconAfter={actionConfig.icon}
        iconSize={"$3"}
        onPress={() => onAction?.(document)}
        bg="$color7"
        pressStyle={{ bg: "$color8" }}
      >
        <Text color="white" fontWeight="700">
          {actionConfig.label}
        </Text>
      </Button>
    </YStack>
  );
};

const LineItemCard = ({
  item,
  formatCurrency,
}: {
  item: DocumentLineItem;
  formatCurrency: (val: number | null) => string;
}) => (
  <Card
    p="$2.5"
    borderWidth={0.5}
    borderColor="$borderColor"
    bg="$backgroundHover"
    rounded="$3"
  >
    <XStack justify="space-between" items="center">
      <YStack gap="$1" flex={1}>
        <Text
          fontSize="$3"
          fontWeight="600"
          color="$color"
          numberOfLines={3}
          width={"90%"}
        >
          {item.description}
        </Text>
        <XStack items="center" gap="$2" flexWrap="wrap">
          <Text fontSize="$1" fontWeight="500" color="$color10">
            Qty: {item.quantity || 1} × {formatCurrency(item.unit_price)}
          </Text>
        </XStack>
      </YStack>
      <Text
        fontSize="$4"
        fontWeight="700"
        color="$color"
        adjustsFontSizeToFit
        width={"30%"}
        numberOfLines={1}
      >
        {formatCurrency(item.total_price)}
      </Text>
    </XStack>
  </Card>
);

export default DocumentVerificationCard;
