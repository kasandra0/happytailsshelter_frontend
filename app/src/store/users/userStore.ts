import { axiosInstance } from "@/services/authService";
import { USER_STATUS_ACTIVE, type User } from "@/types/types";
import { create } from "zustand";

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = (await axiosInstance.get<{ data: User[] }>("users"))
        .data;
      set({ users: response.data.filter((user) => user.status === USER_STATUS_ACTIVE) });
    } catch (error) {
      set({ error: "Failed to fetch users" });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
