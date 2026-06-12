import { create, StateCreator } from "zustand";
import { IngestionFile } from "../types/IngestionFile";

const socketUrl = process.env.EXPO_PUBLIC_WS_URL || "ws://127.0.0.1:8000";

export enum StageStatus {
  NotStarted = "not_yet_started",
  InProgress = "in_progress",
  Completed = "completed",
  Failed = "failed",
}

export enum PipelineStage {
  Retrieving = "retrieving_document_information",
  Analyzing = "analyzing_document",
  Extracting = "extracting_data",
  Drafting = "drafting_document",
}

type StoreValues = {
  currentTaskId: string | null;
  file: IngestionFile | null;
  socket: WebSocket | null;
  pipelineStarted: boolean;
  pipelineStage: Record<PipelineStage, StageStatus>;
};

const defaultValues: StateCreator<StoreValues> = () => {
  return {
    file: null,
    socket: null,
    currentTaskId: null,
    pipelineStarted: false,
    pipelineStage: {
      [PipelineStage.Retrieving]: StageStatus.NotStarted,
      [PipelineStage.Analyzing]: StageStatus.NotStarted,
      [PipelineStage.Extracting]: StageStatus.NotStarted,
      [PipelineStage.Drafting]: StageStatus.NotStarted,
    },
  };
};

type IngestionStoreType = StoreValues & {
  setFile: (file: IngestionFile | null) => void;
  setCurrentTaskId: (id: string) => void;
  connectToSocket: () => void;
  disconnectFromSocket: () => void;
  updatePipelineStage: (
    processName: PipelineStage,
    status: StageStatus,
  ) => void;
  setPipelineStarted: (status: boolean) => void;
};

export const useIngestionStore = create<IngestionStoreType>(
  (set, get, store) => ({
    ...defaultValues(set, get, store),
    setFile: (file: StoreValues["file"]) => set({ file }),
    connectToSocket: () => {
      if (get().socket) {
        get().socket?.close();
      }
      const id = get().currentTaskId;
      if (!id) {
        return;
      }

      const socket = new WebSocket(`${socketUrl}/ingestion/ws/${id}`);

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event.reason);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(JSON.stringify(data, null, 2));
        if (data.pipeline_stage && data.stage_status) {
          set((state) => ({
            pipelineStage: {
              ...state.pipelineStage,
              [data.pipeline_stage]: data.stage_status,
            },
          }));

          const { pipeline_stage: stage, stage_status: status } = data;

          if (status === "completed" && stage === PipelineStage.Drafting) {
            socket.close();
          }
          if (status === "failed") {
            socket.close();
          }
        }
      };

      set({ socket });
    },
    disconnectFromSocket: () => {
      if (get().socket) {
        get().socket?.close();
        set({ socket: null });
      }
    },
    setCurrentTaskId: (id: string) => {
      set({ currentTaskId: id });
    },
    setPipelineStarted: (started: boolean) => {
      set({ pipelineStarted: started });
    },
    updatePipelineStage: (stageName: PipelineStage, status: StageStatus) => {
      set((state) => ({
        pipelineStage: { ...state.pipelineStage, [stageName]: status },
      }));
    },
  }),
);
