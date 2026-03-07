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
import { GlobalContext } from "@/hooks/GlobalContext";
import ChatbotPage from "@/pages/ChatbotPage";
import { logout } from "@/services/authService";
import { ADMIN_ROLE } from "@/types/types";
import { PanelLeft } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, Outlet, useMatches, useNavigate, type UIMatch } from "react-router-dom";

interface RouteHandle {
  title?: string;
}

interface NavItem {
  title: string;
  url: string;
}

interface NavGroup {
  title: string;
  url: string;
  items: NavItem[];
}

interface NavData {
  navMain: NavGroup[];
}

interface DashboardLayoutProps {
}

export default function SidebarLayout({}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, setUser } = useContext(GlobalContext);
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const pageTitle = matches[matches.length - 1]?.handle?.title ?? "Happy Tails";

  const navigate = useNavigate();
  const adminNav: NavGroup = {
    title: "Employee Tools",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: "Animals",
        url: "/admin/animals",
      },
      {
        title: "Inventory",
        url: "/admin/inventory",
      },
    ],
  };
  const fosterparentNav: NavGroup = {
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
  let navData: NavData = { navMain: [] };
  if (user) {
    navData = {
      navMain: user.role === ADMIN_ROLE ? [adminNav, fosterparentNav] : [fosterparentNav],
    };
  }

  async function handleLogout(): Promise<void> {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
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
        <div className="w-48 h-full p-4 flex flex-col">
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
                {navData.navMain.map((item) => (
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
              <SidebarFooter className="mt-auto mb-5 p-4 border-t border-sidebar-border/50">
                <SidebarMenuButton onClick={handleLogout} className="w-full">
                  Logout
                </SidebarMenuButton>
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-muted transition-color"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <PanelLeft />
          </button>
          <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-background">
          <Outlet />
        </main>
      </div>

      <ChatbotPage />
    </div>
  );
}
