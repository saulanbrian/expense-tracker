import { create } from "zustand";
import { IngestionFile } from "../types/IngestionFile";

type IngestionState = {
  stagedFile: IngestionFile | null;
};

type IngestionActions = {
  setStagedFile: (stagedFile: IngestionFile | null) => void;
  clearStore: () => void;
};

type IngestionStoreType = IngestionState & IngestionActions;

export const useIngestionStore = create<IngestionStoreType>((set, get) => ({
  stagedFile: null,
  setStagedFile: (stagedFile: IngestionFile | null) => set({ stagedFile }),
  clearStore: () => set({ stagedFile: null }),
}));
