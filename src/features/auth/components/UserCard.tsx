import { Suspense } from "react";
import { Spinner, Text, XStack, XStackProps, YStack } from "tamagui";
import { useGetUserProfile } from "../api/hooks/useGetUserProfile";

export const UserCard = (props: XStackProps) => {
  return (
    <XStack
      items={"center"}
      justify={"center"}
      {...props}
      theme={"accent"}
      bg={"$background"}
    >
      <Suspense fallback={<Spinner size="small" />}>
        <CardContent />
      </Suspense>
    </XStack>
  );
};

const CardContent = () => {
  const {
    data: { id },
  } = useGetUserProfile();

  return (
    <>
      <Text>{id}</Text>
    </>
  );
};
