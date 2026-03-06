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
import MyFosterProfilePage from "./pages/MyFosterProfilePage";

import SignUpPage from "./pages/SignUpPage"
import { useEffect, useState } from "react";
import { ADMIN_ROLE, FOSTER_PARENT_ROLE, type User } from "./types/types";
import { getCurrentUser } from "./services/userService";
import { Forbidden403 } from "./pages/Forbidden403";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoading(false);
        return;
      }
      getCurrentUser().then((userData) => {
        setUser(userData);
        setIsLoading(false);
      }).catch((error) => {
        setUser(null);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
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
                <Route path="forbidden" element={<Forbidden403/>} />
                <Route path="*" element={<Error404 />} />
              </Route>

              <Route element={<ProtectedRoute requiredRole={ADMIN_ROLE} />}>
                <Route path="/admin" element={<SidebarLayout />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="animals" element={<AnimalListingPage />} />
                  <Route path="animals/new" element={<AnimalIntakePage />} />
                  <Route path="animals/:id" element={<AnimalProfilePage />} />
                  <Route path="inventory" element={<InventoryListingPage />} />
                  <Route path="inventory/:id" element={<InventoryItemPage />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute requiredRole={FOSTER_PARENT_ROLE} />}>
                <Route path="/fosterparent" element={<SidebarLayout />}>
                  <Route path="dashboard" element={<MyAnimalsPage />} />
                  <Route path="myanimals" element={<MyAnimalsPage />} />
                  <Route path="profile" element={<MyFosterProfilePage />} />
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
