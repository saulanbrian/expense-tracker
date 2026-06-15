import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocument } from "@/src/db/services/documents";
import {
  updateDocumentLineItem,
  deleteDocumentLineItem,
} from "@/src/db/services/document_line_items";
import { DocumentSchema, DocumentLineItem } from "@/src/db/types";

interface VerifyDocumentParams {
  documentId: string;
  updateFields: Partial<DocumentSchema>;
  lineItemsToDelete: string[];
  lineItemsToUpdate: DocumentLineItem[];
}

export const useVerifyDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      documentId,
      updateFields,
      lineItemsToDelete,
      lineItemsToUpdate,
    }: VerifyDocumentParams) => {
      await updateDocument(documentId, { ...updateFields, status: "verified" });

      const updatePromises = lineItemsToUpdate.map((item) =>
        updateDocumentLineItem(item.id, item),
      );

      const deletePromises = lineItemsToDelete.map((id) =>
        deleteDocumentLineItem(id),
      );

      await Promise.all([...updatePromises, ...deletePromises]);
    },
    onSuccess: (_, { documentId }) => {
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
      queryClient.invalidateQueries({ queryKey: ["documents", "extracted"] });
    },
  });
};
