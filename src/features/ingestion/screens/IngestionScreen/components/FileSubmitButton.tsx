import ActionButton from "@/src/components/ui/ActionButton";
import { useCallback } from "react";
import { useProfile } from "@/src/features/auth/hooks/useProfile";
import useStartIngestion from "@/src/features/ingestion/hooks/useStartIngestion";
import { useIngestionStore } from "@/src/features/ingestion/stores/IngestionStore";

export default function FileSubmitButton() {
  const { mutate, status } = useStartIngestion();
  const { file } = useIngestionStore();
  const { profile } = useProfile();

  const handleSubmit = useCallback(async () => {
    if (!profile || !file) return;
    console.log("pressed");
    mutate({
      profileId: profile.id,
      organizationId: profile.organization_id!,
      file,
    });
  }, [profile, mutate, file]);

  return (
    <ActionButton
      theme={"accent"}
      disabled={status === "pending"}
      rounded={"$radius.12"}
      onPress={handleSubmit}
      state={status}
    >
      Submit
    </ActionButton>
  );
}
