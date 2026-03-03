// src/layouts/DashboardLayout.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { logout } from "@/services/authService";
import { PanelLeft } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  userRole?: "admin" | "user";
}

export default function SidebarLayout({ userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const adminNav = {
    title: "Employee Tools",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
      },
      {
        title: "Animals",
        url: "animals",
      },
      {
        title: "Inventory",
        url: "inventory",
      },
      {
        title: "Intake Form",
        url: "animals/new",
      },
    ],
  };
  const userNav = {
    title: "Foster Parent Tools",
    url: "#",
    items: [
      {
        title: "My Animals",
        url: "/fosterparent/myanimals",
      },
      {
        title: "My Profile",
        url: "/fosterparent/profile",
      },
    ],
  };
  const data = {
    navMain: userRole === "admin" ? [adminNav] : [userNav],
  };

  async function handleLogout(): Promise<void> {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

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
            <Sidebar collapsible="none">
              <SidebarHeader>
                <div className="flex h-16 items-center px-6 border-b border-sidebar-border/50">
                  <img
                    src="/src/assets/happytails-icon.svg"
                    alt="Happy Tails Shelter logo: a stylized icon representing a pet shelter, accompanied by the text Happy Tails in bold serif font"
                    className="h-8 w-8 mr-2"
                  />
                  <span className="font-heading font-bold text-xl tracking-tight text-primary">
                    Happy Tails
                  </span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                  <SidebarGroup key={item.title}>
                    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <NavLink to={item.url}>
                              {({ isActive }) => (
                                <SidebarMenuButton
                                  isActive={isActive}
                                  disabled={isActive}
                                  className={
                                    isActive
                                      ? "bg-primary text-primary-foreground opacity-70"
                                      : ""
                                  }
                                >
                                  {item.title}
                                </SidebarMenuButton>
                              )}
                            </NavLink>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenuButton onClick={handleLogout} className="w-full">
                  Logout
                </SidebarMenuButton>
                <div className="flex h-16 items-center px-6 border-t border-sidebar-border/50">
                  <span className="text-sm text-muted-foreground">
                    Logged in as{" "}
                    {userRole === "admin" ? "Admin" : "Foster Parent"}
                  </span>
                </div>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
          </SidebarProvider>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
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
