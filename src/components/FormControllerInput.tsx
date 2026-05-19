import { FieldError } from "react-hook-form";
import { ThemedInput } from "./ui";
import { YStack, Text, GetProps, Input } from "tamagui";

type FormControllerInputProps = Omit<GetProps<typeof ThemedInput>, "error"> & {
  name: string;
  error: FieldError | undefined;
  containerProps?: GetProps<typeof YStack>;
};

export const FormControllerInput = ({
  containerProps,
  error,
  ...props
}: FormControllerInputProps) => {
  return (
    <YStack {...props}>
      <Text fontSize={"$3"} fontWeight={"$6"} ml={"$2"} mb={"$1"}>
        {props.name}
      </Text>
      <ThemedInput {...props} error={!!error} />
      {error && (
        <Text fontSize={"$1"} color={"$red8"} l={"$2"}>
          {error?.message}
        </Text>
      )}
    </YStack>
  );
};
