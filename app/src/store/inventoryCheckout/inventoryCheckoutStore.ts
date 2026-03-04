import { axiosInstance } from "@/services/authService";
import type { InventoryCheckout } from "@/types/types";
import { create } from "zustand";

interface InventoryCheckoutState {
  inventoryCheckouts: InventoryCheckout[];
  selectedInventoryCheckout: InventoryCheckout | null;
  loading: boolean;
  error: string | null;

  fetchInventoryCheckouts: () => Promise<void>;
  fetchInventoryCheckoutsForAnimal: (animalId: number) => Promise<void>;
  fetchInventoryCheckoutById: (id: number) => Promise<void>;
  createInventoryCheckout: (
    inventoryCheckout: Omit<InventoryCheckout, "inventory_checkout_id">
  ) => Promise<void>;
  updateInventoryCheckout: (
    inventoryCheckout: InventoryCheckout
  ) => Promise<void>;
  deleteInventoryCheckout: (id: number) => Promise<void>;
  setSelectedInventoryCheckout: (
    inventoryCheckout: InventoryCheckout | null
  ) => void;
}

export const useInventoryCheckoutStore = create<InventoryCheckoutState>(
  (set) => ({
    inventoryCheckouts: [],
    selectedInventoryCheckout: null,
    loading: false,
    error: null,

    fetchInventoryCheckouts: async () => {
      set({ loading: true, error: null });
      try {
        const response = (
          await axiosInstance.get<{ data: InventoryCheckout[] }>(
            "inventory-checkout"
          )
        ).data;
        set({ inventoryCheckouts: response.data });
      } catch (error) {
        set({ error: "Failed to fetch inventory checkouts" });
      } finally {
        set({ loading: false });
      }
    },

    fetchInventoryCheckoutsForAnimal: async (animalId) => {
      set({ loading: true, error: null });
      try {
        const response = (
          await axiosInstance.get<{ data: InventoryCheckout[] }>(
            `inventory-checkout/animal/${animalId}`
          )
        ).data;
        set({ inventoryCheckouts: response.data });
      } catch (error) {
        set({ error: "Failed to fetch inventory checkouts for animal" });
      } finally {
        set({ loading: false });
      }
    },

    fetchInventoryCheckoutById: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = (
          await axiosInstance.get<{ data: InventoryCheckout }>(
            `inventory-checkout/${id}`
          )
        ).data;
        set({ selectedInventoryCheckout: response.data });
      } catch (error) {
        set({ error: "Failed to fetch inventory checkout" });
      } finally {
        set({ loading: false });
      }
    },

    createInventoryCheckout: async (inventoryCheckout) => {
      set({ loading: true, error: null });
      try {
        const response = (
          await axiosInstance.post<{ data: InventoryCheckout }>(
            "inventory-checkout",
            inventoryCheckout
          )
        ).data;
        set((state) => ({
          inventoryCheckouts: [...state.inventoryCheckouts, response.data],
        }));
      } catch (error) {
        set({ error: "Failed to create inventory checkout" });
      } finally {
        set({ loading: false });
      }
    },

    updateInventoryCheckout: async (inventoryCheckout) => {
      set({ loading: true, error: null });
      try {
        const response = (
          await axiosInstance.put<{ data: InventoryCheckout }>(
            `inventory-checkout/${inventoryCheckout.checkout_id}`,
            inventoryCheckout
          )
        ).data;
        set((state) => ({
          inventoryCheckouts: state.inventoryCheckouts.map((c) =>
            c.checkout_id === inventoryCheckout.checkout_id ? response.data : c
          ),
        }));
      } catch (error) {
        set({ error: "Failed to update inventory checkout" });
      } finally {
        set({ loading: false });
      }
    },

    deleteInventoryCheckout: async (id) => {
      set({ loading: true, error: null });
      try {
        await axiosInstance.delete(`inventory-checkout/${id}`);
        set((state) => ({
          inventoryCheckouts: state.inventoryCheckouts.filter(
            (c) => c.checkout_id !== id
          ),
        }));
      } catch (error) {
        set({ error: "Failed to delete inventory checkout" });
      } finally {
        set({ loading: false });
      }
    },

    setSelectedInventoryCheckout: (inventoryCheckout) =>
      set({ selectedInventoryCheckout: inventoryCheckout }),
  })
);
