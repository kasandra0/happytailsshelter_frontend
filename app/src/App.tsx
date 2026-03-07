import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import { ADMIN_ROLE, FOSTER_PARENT_ROLE, type User } from "./types/types";
import { getCurrentUser } from "./services/userService";
import { Forbidden403 } from "./pages/Forbidden403";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <LandingPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "error", element: <Error404 /> },
      { path: "forbidden", element: <Forbidden403 /> },
      { path: "*", element: <Error404 /> },
    ],
  },
  {
    element: <ProtectedRoute requiredRole={ADMIN_ROLE} />,
    children: [
      {
        path: "/admin",
        element: <SidebarLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage />, handle: { title: "Dashboard" } },
          { path: "animals", element: <AnimalListingPage />, handle: { title: "Animal Listing" } },
          { path: "animals/new", element: <AnimalIntakePage />, handle: { title: "Animal Intake" } },
          { path: "animals/:id", element: <AnimalProfilePage />, handle: { title: "Animal Profile" } },
          { path: "inventory", element: <InventoryListingPage />, handle: { title: "Inventory" } },
          { path: "inventory/:id", element: <InventoryItemPage />, handle: { title: "Inventory Item" } },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute requiredRole={FOSTER_PARENT_ROLE} />,
    children: [
      {
        path: "/fosterparent",
        element: <SidebarLayout />,
        children: [
          { path: "dashboard", element: <MyAnimalsPage />, handle: { title: "Dashboard" } },
          { path: "myanimals", element: <MyAnimalsPage />, handle: { title: "My Animals" } },
          { path: "profile", element: <MyFosterProfilePage />, handle: { title: "My Profile" } },
          { path: "animals/:id/adopt", element: <AdoptPage />, handle: { title: "Adopt Animal" } },
          { path: "animals/:id", element: <AnimalProfilePage />, handle: { title: "Animal Profile" } },
        ],
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoading(false);
        return;
      }
      getCurrentUser()
        .then((userData) => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch(() => {
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoading: isLoading }}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}

export default App;