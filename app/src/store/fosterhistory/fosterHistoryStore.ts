import axios from "axios";
import type { Animal, FosterHistory } from "@/types/types";
import { create } from "zustand";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

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
      const response = await axiosInstance.get<{ data: FosterHistory[] }>(`api/foster-history/user/${userId}`);

      response.data.data.forEach((history: FosterHistory) => {
        history.animal = {
            animal_id: history.animal_id,
            photo_url: history.photo_url,
            microchip: history.microchip,
            name: history.name,
            species: history.species,
            breed: history.breed,
            date_of_birth: history.date_of_birth,
        } as Animal;
      });
      set({ fosterHistory: response.data.data });
    } catch (error) {
    //   set({ error: "Failed to fetch animals" });
    } finally {
    //   set({ loading: false });
    }
  }

}));
