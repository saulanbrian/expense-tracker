import { Text, XStack, YStack, Spinner, Button } from "tamagui";
import {
  StageStatus,
  useIngestionStore,
  PipelineStage,
} from "../../../stores/IngestionStore";
import {
  CheckCircle2,
  Circle as CircleIcon,
  AlertCircle,
  ArrowRight,
} from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { useCallback } from "react";

const STAGE_LABELS: Record<PipelineStage, string> = {
  [PipelineStage.Retrieving]: "Initializing Pipeline",
  [PipelineStage.Analyzing]: "Analyzing Document",
  [PipelineStage.Extracting]: "Extracting Data",
  [PipelineStage.Drafting]: "Finalizing Results",
};

const StatusIcon = ({ status }: { status: StageStatus }) => {
  switch (status) {
    case StageStatus.Completed:
      return (
        <XStack items="center" justify="center" width={24} height={24}>
          <CheckCircle2 color="$green10" size={24} />
        </XStack>
      );
    case StageStatus.InProgress:
      return (
        <XStack items="center" justify="center" width={24} height={24}>
          <Spinner size="small" color="$blue10" />
        </XStack>
      );
    case StageStatus.Failed:
      return (
        <XStack items="center" justify="center" width={24} height={24}>
          <AlertCircle color="$red10" size={24} />
        </XStack>
      );
    default:
      return (
        <XStack items="center" justify="center" width={24} height={24}>
          <CircleIcon color="$gray8" size={20} />
        </XStack>
      );
  }
};

const Step = ({
  stage,
  status,
  isLast,
}: {
  stage: PipelineStage;
  status: StageStatus;
  isLast: boolean;
}) => {
  const isActive = status === StageStatus.InProgress;
  const isCompleted = status === StageStatus.Completed;
  const isFailed = status === StageStatus.Failed;
  const isNotStarted = status === StageStatus.NotStarted;

  return (
    <XStack gap="$4" items="stretch">
      <YStack items="center" width={24} mt="$1">
        <StatusIcon status={status} />
        {!isLast && (
          <YStack
            flex={1}
            width={2}
            bg={isCompleted ? "$green10" : "$gray5"}
            mx="$1"
          />
        )}
      </YStack>
      <YStack flex={1} pb={isLast ? 0 : "$5"} gap="$1">
        <Text
          fontSize="$5"
          fontWeight={isActive ? "700" : "500"}
          color={isNotStarted ? "$gray8" : "$color"}
        >
          {STAGE_LABELS[stage]}
        </Text>
        <Text
          fontSize="$3"
          fontWeight="400"
          color={isFailed ? "$red10" : isActive ? "$blue10" : "$gray9"}
        >
          {status.replace(/_/g, " ")}
        </Text>
      </YStack>
    </XStack>
  );
};

export const ProgressContainer = () => {
  const { pipelineStage, clearStore } = useIngestionStore();
  const router = useRouter();

  const handleVerify = useCallback(() => {
    clearStore();
    router.push("/verification");
  }, [clearStore, router]);

  const stages = Object.keys(pipelineStage) as PipelineStage[];

  return (
    <YStack
      flex={1}
      theme={"surface1"}
      p={"$6"}
      py={"$8"}
      width={"100%"}
      justify={"center"}
    >
      <YStack gap="$6">
        <YStack gap="$2">
          <Text
            fontSize="$8"
            fontWeight="800"
            textIndent="center"
            color="$color"
          >
            Processing Document
          </Text>
          <Text fontSize="$2" color="$gray10">
            Please wait while we handle your document
          </Text>
        </YStack>

        <YStack>
          {stages.map((stage, index) => (
            <Step
              key={stage}
              stage={stage}
              status={pipelineStage[stage]}
              isLast={index === stages.length - 1}
            />
          ))}
        </YStack>
      </YStack>
      <Button
        iconAfter={ArrowRight}
        rounded={"$radius.12"}
        my={"$4"}
        theme={"accent"}
        items="center"
        px={"$3"}
        onPress={handleVerify}
      >
        <Button.Text
          textAlignVertical="center"
          fontSize={"$4"}
          fontWeight={"700"}
        >
          Verify
        </Button.Text>
      </Button>
    </YStack>
  );
};
