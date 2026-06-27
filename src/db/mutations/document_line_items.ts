import { useMutation } from "@tanstack/react-query";
import { DocumentLineItem } from "../types";
import {
  updateDocumentLineItem,
  deleteDocumentLineItem,
} from "../services/document_line_items";

export const useUpdateDocumentLineItem = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<DocumentLineItem>;
    }) => {
      return await updateDocumentLineItem(id, data);
    },
  });
};

export const useDeleteDocumentLineItem = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteDocumentLineItem(id);
    },
  });
};
