import { api } from "@/lib/api";
import type { Animal, FosterHistory } from "@/types/types";
import { create } from "zustand";

interface FosterHistoryState {
  fosterHistory: FosterHistory[];
//   selected: Animal | null;
//   loading: boolean;
//   error: string | null;

  // Actions
  fetchUserFosterHistory: (userId: number) => Promise<void>;
//   createAnimal: (animal: Omit<Animal, "animal_id">) => Promise<void>;
//   updateAnimal: (animal: Animal) => Promise<void>;
//   deleteAnimal: (animal_id: number) => Promise<void>;
//   setSelectedAnimal: (animal: Animal | null) => void;
}

export const userFosterHistoryStore = create<FosterHistoryState>((set) => ({
  fosterHistory: [],
//   selectedAnimal: null,
//   loading: false,
//   error: null,

  fetchUserFosterHistory: async (userId) => {
    // set({ loading: true, error: null });
    try {
      const response = await api.get<{ data: FosterHistory[] }>(`foster-history/user/${userId}`);
      response.data.forEach((history) => {
        history.animal = {
            animal_id: history.animal_id,
            microchip: history.microchip,
            name: history.name,
            species: history.species,
            breed: history.breed,
            date_of_birth: history.date_of_birth,            
        } as Animal;
      });
      set({ fosterHistory: response.data });
    } catch (error) {
    //   set({ error: "Failed to fetch animals" });
    } finally {
    //   set({ loading: false });
    }
  }

}));
