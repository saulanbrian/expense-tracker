import { useMutation } from "@tanstack/react-query";
import { DocumentSchema } from "../types";
import { updateDocument } from "../services/documents";

export const useUpdateDocument = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<DocumentSchema>;
    }) => {
      return await updateDocument(id, data);
    },
  });
};
