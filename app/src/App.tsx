import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Demo from "./pages/ComponentDemos";
import { LoginForm } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} /> {/* landing page */}
        <Route path="/dashboard" element={<DashboardPage />} /> {/* dashboard page */}
        <Route path="/login" element={<LoginForm />} />
        
        <Route path="/components" element={<Demo />} />  {/* page to demo components */}
        <Route path="/*" element={<></>} /> {/* catch all route for 404 page */}
        
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
