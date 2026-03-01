import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { Error404 } from "./pages/Error404";
import { AnimalProfilePage } from "./pages/AnimalProfilepage";
import AnimalListingPage from "./pages/AnimalListingPage";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import AdoptPage from "./pages/AdoptPage";
import { GlobalContext } from "./hooks/GlobalContext";
import SidebarLayout from "./layout/SidebarLayout";
import AnimalIntakePage from "./pages/AnimalIntakePage";
import InventoryListingPage from "./pages/InventoryListingPage";
import InventoryItemPage from "./pages/InventoryItemPage";
import MyAnimalsPage from "./pages/MyAnimalsPage";

import SignUpPage from "./pages/SignUpPage"
import { useEffect, useState } from "react";
import type { User } from "./types/types";
import { getCurrentUser } from "./services/userService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      const exp = (payload.exp)
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoading(false);
        return;
      }
    }
    getCurrentUser().then((userData) => {
      console.log("Current user data fetched:", userData);
      setUser(userData);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Error fetching current user:", error);
      setUser(null);
      setIsLoading(false);
    });
  }, []);



  return (
    <>
      <GlobalContext.Provider value={{ user, setUser, isLoading: isLoading }}>
        <BrowserRouter>
          <div className="flex flex-1 flex-row">
            <Routes>
              <Route path="/">
                <Route path="" element={<LandingPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="error" element={<Error404 />} />
                <Route path="*" element={<Error404 />} />
              </Route>

              <Route element={<ProtectedRoute requiredRole={2} />}>
                <Route path="/admin" element={<SidebarLayout userRole={"admin"} />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="animals" element={<AnimalListingPage />} />
                  <Route path="animals/new" element={<AnimalIntakePage />} />
                  <Route path="animals/:id" element={<AnimalProfilePage />} />
                  <Route path="inventory" element={<InventoryListingPage />} />
                  <Route path="inventory/:id" element={<InventoryItemPage />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute requiredRole={1} />}>
                <Route path="/fosterparent" element={<SidebarLayout userRole={"user"} />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="myanimals" element={<MyAnimalsPage />} />
                  <Route path="profile" element={<></>} />
                  <Route path="animals/:id/adopt" element={<AdoptPage />} />
                  <Route path="animals/:id" element={<AnimalProfilePage />} />
                </Route>
              </Route>

            </Routes>
          </div>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
