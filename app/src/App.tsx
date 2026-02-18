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

function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  //Dev note: these types we will need to define on the components where we want to render the table, probably in its own file is good

  type Animal = {
    id: string;
    animalName: string;
    age: number;
    gender: "Male" | "Female";
    status: "Adopted" | "Available";
  };

  //dev note these need to match the type

  const columns: ColumnDef<Animal>[] = [
    { accessorKey: "id", header: "Animal ID" },
    {
      accessorKey: "animalName",
      header: "Animal Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  const data: Animal[] = [
    { id: "1", animalName: "Lucky", age: 2, gender: "Male", status: "Adopted" },
    {
      id: "2",
      animalName: "Spot",
      age: 2,
      gender: "Female",
      status: "Adopted",
    },
    {
      id: "3",
      animalName: "Rover",
      age: 4,
      gender: "Male",
      status: "Available",
    },
    { id: "4", animalName: "Rex", age: 3, gender: "Male", status: "Adopted" },
    {
      id: "5",
      animalName: "Chuck",
      age: 7,
      gender: "Male",
      status: "Available",
    },
  ];

  return (
    <>
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 items-center">
        <h1 className="text-primary text-3xl underline">Hello world!</h1>

        <Button>default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        <br />
        <br />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fosterparent">Foster Parent</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <br />

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />

        <DatePickerDemo />

        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
