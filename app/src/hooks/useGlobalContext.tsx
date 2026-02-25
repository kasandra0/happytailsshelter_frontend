import type { User } from "@/types/types";
import { createContext, useContext } from "react";

type GlobalContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const GlobalContextObject: GlobalContextType = {
  user: null,
  setUser: () => {},
};

export const GlobalContext = createContext(GlobalContextObject);
const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;