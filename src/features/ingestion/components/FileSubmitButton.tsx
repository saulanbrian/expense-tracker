import { useCallback, useEffect, useMemo } from "react";
import ActionButton from "@/src/components/ui/ActionButton";
import { useProfile } from "../../auth/hooks/useProfile";
import useStartIngestion from "../hooks/useStartIngestion";
import { useIngestionStore } from "../stores/IngestionStore";

export default function FileSubmitButton() {
  const { mutate, status } = useStartIngestion();
  const { file } = useIngestionStore();
  const { profile } = useProfile();

  const handleSubmit = useCallback(async () => {
    if (!profile || !file) return;
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
