import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Demo from "./ComponentDemos";

export function DashboardPage() {

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <p>Welcome to the dashboard! Here you can see an overview of your data.</p>
                    </div>
                </SidebarInset>
            </SidebarProvider>

        </>
    )
}