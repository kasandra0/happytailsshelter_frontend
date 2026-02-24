import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/ComponentDemos";
import { LoginForm } from "./pages/LoginPage";
import { Error404 } from "./pages/Error404";
import { AnimalProfilePage } from "./pages/AnimalProfilepage";
import AnimalListingPage from "./pages/AnimalListingPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-1 flex-row p-4">
          <Routes>
            <Route path="/" element={<></>} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginForm />} />

            <Route path="/animals" element={<AnimalListingPage />} />
            <Route path="/animals/:id" element={<Demo />} />
            <Route path="/animals/new" element={<Demo />} />
            <Route path="/animals/:id" element={<AnimalProfilePage animal={{} as any} />} />

            <Route path="/inventory" element={<Demo />} />

            <Route path="/components" element={<Demo />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </BrowserRouter>
      <div className="flex flex-1 flex-row p-4">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<></>} /> {/* landing page */}
            <Route path="/staff/dashboard" element={<DashboardPage />} />
            {/* dashboard page */}
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/staff/animals"
              element={<AnimalListingPage />}
            />
            {/* list of all animals in the shelter */}
            <Route path="/staff/animals/:id" element={<Demo />} />
            {/* individual animal profile page */}
            <Route path="/staff/animals/new" element={<Demo />} />
            {/* intake form to add a new animal */}
            <Route path="/staff/inventory" element={<Demo />} />
            {/* list of all inventory items in shelter */}
            <Route path="/components" element={<Demo />} />
            {/* page to demo components */}
            <Route path="/*" element={<Error404 />} />
            {/* catch all route for 404 page */}
            {/* Add more routes here as needed */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
