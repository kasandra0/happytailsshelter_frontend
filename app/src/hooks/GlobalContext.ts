import type { User } from "@/types/types";
import { createContext } from "react";

type GlobalContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

export const defaultUser: User = {
  userId: 0,
  role: 0,
  email: "",
  first_name: "",
  last_name: "",
};

export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
});
