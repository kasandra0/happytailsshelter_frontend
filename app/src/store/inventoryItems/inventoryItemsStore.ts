import { api } from "@/lib/api";
import type { InventoryItem } from "@/types/types";
import { create } from "zustand";

interface InventoryItemState {
  inventoryItems: InventoryItem[];
  selectedInventoryItem: InventoryItem | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchInventoryItems: () => Promise<void>;
  createInventoryItem: (
    inventoryItem: Omit<InventoryItem, "inventory_item_id">
  ) => Promise<void>;
  updateInventoryItem: (inventoryItem: InventoryItem) => Promise<void>;
  deleteInventoryItem: (inventoryItemId: number) => Promise<void>;
  setSelectedInventoryItem: (inventoryItem: InventoryItem | null) => void;
}

export const useInventoryItemStore = create<InventoryItemState>((set) => ({
  inventoryItems: [],
  selectedInventoryItem: null,
  loading: false,
  error: null,

  fetchInventoryItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<{ data: InventoryItem[] }>(
        "inventory-items"
      );
      set({ inventoryItems: response.data });
    } catch (error) {
      set({ error: "Failed to fetch inventory items" });
    } finally {
      set({ loading: false });
    }
  },

  createInventoryItem: async (inventoryItem: Omit<InventoryItem, "inventory_item_id">) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post<{ data: InventoryItem }>(
        "inventory-items", inventoryItem,
      );
      set((state) => ({
        inventoryItems: [...state.inventoryItems, response.data],
      }));
    } catch (error) {
      set({ error: "Failed to create inventory item" });
    } finally {
      set({ loading: false });
    }
  },

  updateInventoryItem: async (inventoryItem) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put<{ data: InventoryItem }>(
        `inventory-items/${inventoryItem.inventory_item_id}`,
        inventoryItem
      );

      set((state) => ({
        inventoryItems: state.inventoryItems.map((i) =>
          i.inventory_item_id === inventoryItem.inventory_item_id
            ? response.data
            : i
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update inventory item" });
    } finally {
      set({ loading: false });
    }
  },

  deleteInventoryItem: async (inventoryItemId) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`inventory-items/${inventoryItemId}`);
      set((state) => ({
        inventoryItems: state.inventoryItems.filter(
          (i) => i.inventory_item_id !== inventoryItemId
        ),
      }));
    } catch (error) {
      set({ error: "Failed to delete inventory item" });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedInventoryItem: (inventoryItem) =>
    set({ selectedInventoryItem: inventoryItem }),
}));
