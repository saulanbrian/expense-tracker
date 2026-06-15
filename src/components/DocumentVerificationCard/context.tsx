import React, { createContext, useContext, ReactNode } from "react";
import { DocumentLineItem, DocumentSchema } from "@/src/db/types";

export type DocumentWithItems = DocumentSchema & {
  lineItems: DocumentLineItem[];
};

interface DocumentContextType {
  document: DocumentWithItems;
  onAction?: (document: DocumentWithItems) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentProvider"
    );
  }
  return context;
};

interface DocumentProviderProps {
  children: ReactNode;
  document: DocumentWithItems;
  onAction?: (document: DocumentWithItems) => void;
}

export const DocumentProvider = ({
  children,
  document,
  onAction,
}: DocumentProviderProps) => {
  return (
    <DocumentContext.Provider value={{ document, onAction }}>
      {children}
    </DocumentContext.Provider>
  );
};
