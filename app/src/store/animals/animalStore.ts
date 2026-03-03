import { api } from "@/lib/api";
import type { Animal } from "@/types/types";
import { create } from "zustand";

interface AnimalState {
  animals: Animal[];
  selectedAnimal: Animal | null;
  loading: boolean;
  error: string | null;

  fetchAnimals: () => Promise<void>;
  createAnimal: (animal: Omit<Animal, "animal_id">) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
  deleteAnimal: (animal_id: number) => Promise<void>;
  setSelectedAnimal: (animal: Animal | null) => void;
}

export const useAnimalStore = create<AnimalState>((set) => ({
  animals: [],
  selectedAnimal: null,
  loading: false,
  error: null,

  fetchAnimals: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<{ data: Animal[] }>("api/animals");
      set({ animals: response.data });
    } catch (error) {
      set({ error: "Failed to fetch animals" });
    } finally {
      set({ loading: false });
    }
  },

  createAnimal: async (animal) => {
    set({ loading: true, error: null });
    try {
      const noIdData = {
        microchip: animal.microchip,
        name: animal.name,
        date_of_birth: animal.date_of_birth,
        gender: animal.gender,
        color: animal.color,
        breed: animal.breed,
        species: animal.species,
        weight: animal.weight,
        status: animal.status,
        description: animal.description,
      };
      const response = await api.post<{ data: Animal }>("/api/animals", noIdData);
      set((state) => ({ animals: [...state.animals, response.data] }));
    } catch (error) {
      set({ error: "Failed to create animal" });
    } finally {
      set({ loading: false });
    }
  },

  updateAnimal: async (animal) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put<{ data: Animal }>(
        `/api/animals/${animal.animal_id}`,
        animal
      );
      set((state) => ({
        animals: state.animals.map((a) =>
          a.animal_id === animal.animal_id ? response.data : a
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update animal" });
    } finally {
      set({ loading: false });
    }
  },

  deleteAnimal: async (animal_id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/api/animals/${animal_id}`);
      set((state) => ({
        animals: state.animals.filter((a) => a.animal_id !== animal_id),
      }));
    } catch (error) {
      set({ error: "Failed to delete animal" });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedAnimal: (animal) => set({ selectedAnimal: animal }),
}));
