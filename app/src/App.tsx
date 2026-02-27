import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Demo from "./pages/ComponentDemos";
import { LoginPage } from "./pages/LoginPage";
import { Error404 } from "./pages/Error404";
import { AnimalProfilePage } from "./pages/AnimalProfilepage";
import AnimalListingPage from "./pages/AnimalListingPage";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import AdoptPage from "./pages/AdoptPage";
import useGlobalContext from "./hooks/useGlobalContext";
import SidebarLayout from "./layout/SidebarLayout";
import AnimalIntakePage from "./pages/AnimalIntakePage";
import InventoryListingPage from "./pages/InventoryListingPage";
import InventoryItemPage from "./pages/InventoryItemPage";
import MyAnimals from "./pages/MyAnimalsPage";
import MyAnimalsPage from "./pages/MyAnimalsPage";

import SignUpPage from "./pages/SignUpPage"
import { useEffect, useState } from "react";

function App() {
  // after authentication is connected - use setUser function to set user in the global context
  const { setUser, user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      if(user) console.log("User in global context on App load:", user);

        if (!user) {
          setIsLoading(false);
          redirect("/");
          return;
        }
  }, [setUser, user]);



  return (
    <>
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

            <Route path="/staff" element={<SidebarLayout userRole={"admin"} />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="animals" element={<AnimalListingPage />} />
              <Route path="animals/new" element={<AnimalIntakePage />} />
              <Route path="animals/:id" element={<AnimalProfilePage />} />
              <Route path="inventory" element={<InventoryListingPage />} />
              <Route path="inventory/:id" element={<InventoryItemPage />} />
            </Route>

            <Route path="/fosterparent" element={<SidebarLayout userRole={"user"} />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="myanimals" element={<MyAnimalsPage />} />
              <Route path="profile" element={<></>} />
              <Route path="animals/:id/adopt" element={<AdoptPage />} />
              <Route path="animals/:id" element={<AnimalProfilePage />} />
            </Route>

            <Route path="/">
              <Route path="components" element={<Demo />} />


            </Route>
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
