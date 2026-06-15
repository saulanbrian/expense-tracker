import { Text, XStack, Theme } from "tamagui";
import { Component as LucideIcon } from "@tamagui/lucide-icons-2";
import { DocumentSchema } from "@/src/db/types";
import { useMemo } from "react";

interface StatusBadgeProps {
  status: DocumentSchema["status"];
  label?: string;
  icon: typeof LucideIcon;
}

export const DocumentStatusBadge = ({
  label,
  icon: Icon,
  status,
}: StatusBadgeProps) => {
  const theme = useMemo(() => {
    switch (status) {
      case "extracted":
        return "green";
      case "verified":
        return "blue";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  }, [status]);

  return (
    <XStack
      bg="$background"
      borderWidth={0.5}
      borderColor="$color7"
      px="$2"
      py="$1"
      rounded="$10"
      items="center"
      gap="$1.5"
      theme={theme}
    >
      <Icon size={10} color="$color7" />
      <Text
        fontSize="$1"
        fontWeight="800"
        textTransform="uppercase"
        letterSpacing={0.5}
        color="$color7"
      >
        {label ?? status}
      </Text>
    </XStack>
  );
};
