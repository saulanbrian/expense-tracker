import { create } from "zustand";
import { IngestionFile } from "../types/IngestionFile";

type IngestionStoreState = {
  file: IngestionFile | null;
};

type IngestionStoreActions = {
  setFile: (file: IngestionStoreState["file"]) => void;
  clearStore: () => void;
};

type IngestionStoreType = IngestionStoreActions & IngestionStoreState;

export const useIngestionStore = create<IngestionStoreType>((set, get) => ({
  file: null,
  setFile: (file: IngestionStoreState["file"]) => {
    set({ file });
  },
  clearStore: () => {
    set({ file: null });
  },
}));
