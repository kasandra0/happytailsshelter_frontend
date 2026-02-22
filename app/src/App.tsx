import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/ComponentDemos";
import { LoginForm } from "./pages/LoginPage";
import { Error404 } from "./pages/Error404";
import AnimalListingPage from "./pages/AnimalListingPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
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
  );
}

export default App;
