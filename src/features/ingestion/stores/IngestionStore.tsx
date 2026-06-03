import { create } from "zustand";
import { IngestionFile } from "../types/IngestionFile";

type IngestionStoreState = {
  document: IngestionFile | null;
};

type IngestionStoreActions = {
  setDocument: (document: IngestionStoreState["document"]) => void;
  clearStore: () => void;
};

type IngestionStoreType = IngestionStoreActions & IngestionStoreState;

export const useIngestionStore = create<IngestionStoreType>((set, get) => ({
  document: null,
  setDocument: (document: IngestionStoreState["document"]) => {
    set({ document });
  },
  clearStore: () => {
    set({ document: null });
  },
}));
