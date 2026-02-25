import { DataTable } from "@/components/table/Table";
import SidebarLayout from "@/layout/SidebarLayout";
import { api } from "@/lib/api";
import type { Animal } from "@/types/animal";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type FC } from "react";

interface AnimalListingPageProps {}

const AnimalListingPage: FC<AnimalListingPageProps> = () => {
  const columns: ColumnDef<Animal>[] = [
    { accessorKey: "animal_id", header: "Animal ID" },
    {
      accessorKey: "name",
      header: "Animal Name",
    },
    {
      accessorKey: "date_of_birth",
      header: "Age",
      cell: ({ row }) => {
        const now = new Date();
        const formattedDate = new Date(row.getValue("date_of_birth"));
        return now.getUTCFullYear() - formattedDate.getUTCFullYear();
      },
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
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await api.get<any>("animals");
        setAnimals(data.data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <SidebarLayout>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold">Animal Listing</h2>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={animals} />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AnimalListingPage;
