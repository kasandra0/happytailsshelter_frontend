import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/ComponentDemos";
import { LoginPage } from "./pages/LoginPage";
import { Error404 } from "./pages/Error404";
import { AnimalProfilePage } from "./pages/AnimalProfilepage";
import AnimalListingPage from "./pages/AnimalListingPage";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import AdoptPage from "./pages/AdoptPage";
import { createContext } from "react";
import useGlobalContext from "./hooks/useGlobalContext";

function App() {
  // after authentication is connected - use setUser function to set user in the global context
  const {setUser} = useGlobalContext();
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-1 flex-row p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} /> 

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/animals" element={<AnimalListingPage />} />
            <Route path="/animals/:id" element={<Demo />} />
            <Route path="/animals/new" element={<Demo />} />
            <Route path="/animals/:id" element={<AnimalProfilePage animal={{} as any} />} />
            <Route path="/animals/:id/adopt" element={<AdoptPage />} />

            <Route path="/inventory" element={<Demo />} />ls

            <Route path="/components" element={<Demo />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
