// src/layouts/DashboardLayout.tsx
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "admin" | "staff" | "fosterparent";
}

export default function SidebarLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-background gap-1 overflow-hidden">
      {/* Sidebar - slides in/out */}
      <aside
        className={`
          shrink-0 bg-card overflow-hidden
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-48" : "w-0"}
        `}
      >
        <div className="w-48 h-full p-4">
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {/* Sidebar trigger button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-muted transition-color"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <PanelLeft />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Happy Tails</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}