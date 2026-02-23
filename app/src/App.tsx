import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./pages/ComponentDemos";
import { LoginForm } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Error404 } from "./pages/Error404";
import { AnimalProfilePage } from "./pages/AnimalProfilepage";
import AnimalListingPage from "./pages/AnimalListingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-1 flex-row p-4">
        <Routes>
          <Route path="/" element={<></>} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/animals" element={<AnimalListingPage isStaff={false} />} />
          <Route path="/animals/:id" element={<Demo />} />
          <Route path="/animals/new" element={<Demo />} />
          <Route path="/animals/:id" element={<AnimalProfilePage animal={{} as any} />} />

          <Route path="/inventory" element={<Demo />} />

          <Route path="/components" element={<Demo />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
