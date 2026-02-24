import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/ComponentDemos";
import { LoginPage } from "./pages/LoginPage";
import { Error404 } from "./pages/Error404";
import { AnimalProfilePage } from "./pages/AnimalProfilepage";
import AnimalListingPage from "./pages/AnimalListingPage";
import { DashboardPage } from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import AdoptPage from "./pages/AdoptPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-1 flex-row p-4">
          <Routes>
            <Route path="/" element={<></>} />

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
      <div className="flex flex-1 flex-row p-4">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<></>} /> 
            <Route path="/staff/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/staff/animals"
              element={<AnimalListingPage />}
            />
            <Route path="/staff/animals/:id" element={<Demo />} />
            <Route path="/staff/animals/new" element={<Demo />} />
            <Route path="/staff/inventory" element={<Demo />} />
            <Route path="/components" element={<Demo />} />
            <Route path="/*" element={<Error404 />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
