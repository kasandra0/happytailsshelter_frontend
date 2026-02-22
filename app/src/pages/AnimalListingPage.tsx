import { DataTable } from "@/components/table/Table";
import { api } from "@/lib/api";
import type { Animal } from "@/types/animal";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, type FC } from "react";

interface AnimalListingPageProps {
}

const AnimalListingPage: FC<AnimalListingPageProps> = () => {
  const columns: ColumnDef<Animal>[] = [
    { accessorKey: "id", header: "Animal ID" },
    {
      accessorKey: "name",
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
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await api.get<Animal[]>('animal');
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={animals} />
    </div>
  );
};

export default AnimalListingPage;
