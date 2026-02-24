import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Employee Tools",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Animals",
          url: "/animals",
        },
        {
          title: "Inventory",
          url: "#",
        },
        {
          title: "Intake Form",
          url: "#",
        },
      ],
    },
    {
      title: "App Settings",
      url: "#",
      items: [
        {
          title: "Theme Mode",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="none">
      <SidebarHeader>
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border/50">
          <img src="/src/assets/happytails-icon.svg" alt="Happy Tails Shelter logo: a stylized icon representing a pet shelter, accompanied by the text Happy Tails in bold serif font" className="h-8 w-8 mr-2" />
          <span className="font-heading font-bold text-xl tracking-tight text-primary">Happy Tails</span>
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
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
