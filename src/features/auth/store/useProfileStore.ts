import { create } from "zustand";
import { Database } from "@/supabase/scheme";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type ProfileStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
