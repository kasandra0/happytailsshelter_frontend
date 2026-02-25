import type { User } from "@/types/types";
import { useState } from "react";
import { GlobalContext } from "./useGlobalContext";

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <GlobalContext.Provider 
        value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
}