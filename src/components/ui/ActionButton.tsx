import { MutationStatus } from "@tanstack/react-query";
import { Button, Spinner, ButtonProps as TButtonProps } from "tamagui";

type ActionButtonProps = Omit<TButtonProps, "icon" | "iconAfter"> & {
  state: MutationStatus;
};

export default function ActionButton({ state, ...props }: ActionButtonProps) {
  return (
    <Button
      {...(state === "pending"
        ? { ...props, icon: () => <Spinner color={"$color"} /> }
        : props)}
    />
  );
}
