import "./App.css";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./components/ui/calendar/calendar";
import React from "react";
import { DatePickerDemo } from "./pages/DatePickerDemo";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/table/Table";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Separator } from "@radix-ui/react-select";
import { AppSidebar } from "./components/app-sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./components/ui/breadcrumb";
import Demo from "./pages/ComponentDemos";

function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());




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
