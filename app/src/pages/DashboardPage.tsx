import SidebarLayout from "@/layout/SidebarLayout";

export function DashboardPage() {

    return (
        <SidebarLayout>
            <div className="flex flex-1 flex-col gap-4 p-4 items-center">
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <p>Welcome to the dashboard! Here you can see an overview of your data.</p>
                </div>
            </div>
        </SidebarLayout>
    )
}