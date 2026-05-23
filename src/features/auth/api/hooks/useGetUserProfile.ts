import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/getUserProfile";

export const useGetUserProfile = () => {
  return useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await getUserProfile();
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
