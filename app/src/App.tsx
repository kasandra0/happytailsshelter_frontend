import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Demo from "./pages/ComponentDemos";

function App() {

  return (
    <>
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 items-center">
        <h1 className="text-primary text-3xl underline">Hello world!</h1>

        <Demo />
      </div>
      </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
