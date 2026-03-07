import type { User } from "@/types/types";
import { createContext } from "react";

type GlobalContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
});
