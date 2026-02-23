import { DataTable } from "@/components/table/Table";
import SidebarLayout from "@/layout/SidebarLayout";
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

  const data: Animal[] = [
    {
      animal_id: 1,
      microchip: "100000000000001",
      name: "Daredevil",
      date_of_birth: new Date("2019-03-15"),
      gender: "M",
      color: "Golden",
      breed: "Golden Retriever",
      species: "Dog",
      weight: 28.5,
      status: "A",
      description: "Friendly and energetic dog who loves to fetch.",
      created_at: new Date("2026-02-18 02:06:06.877472"),
      updated_at: new Date("2026-02-18 02:06:06.877472"),
    },
    {
      animal_id: 2,
      microchip: "100000000000002",
      name: "Luna",
      date_of_birth: new Date("2020-07-22"),
      gender: "F",
      color: "Black",
      breed: "Domestic Shorthair",
      species: "Cat",
      weight: 4.2,
      status: "A",
      description: "Calm indoor cat who enjoys sunbathing.",
      created_at: new Date("2026-02-18 02:06:06.877472"),
      updated_at: new Date("2026-02-18 02:06:06.877472"),
    },
    {
      animal_id: 3,
      microchip: "100000000000003",
      name: "Bruno",
      date_of_birth: new Date("2018-11-05"),
      gender: "M",
      color: "Brindle",
      breed: "Boxer",
      species: "Dog",
      weight: 32.1,
      status: "F",
      description: "Playful and loyal companion good with kids.",
      created_at: new Date("2026-02-18 02:06:06.877472"),
      updated_at: new Date("2026-02-18 02:06:06.877472"),
    },
    {
      animal_id: 4,
      microchip: "100000000000002",
      name: "Bow tie",
      date_of_birth: new Date("2019-03-15"),
      gender: "M",
      color: "Golden",
      breed: "Golden Retriever",
      species: "Dog",
      weight: 28.5,
      status: "A",
      description: "Friendly and energetic dog who loves to fetch.",
      created_at: new Date("2026-02-18 02:06:06.877472"),
      updated_at: new Date("2026-02-18 02:06:06.877472"),
    },
    {
      animal_id: 5,
      microchip: "100000000000004",
      name: "Spider",
      date_of_birth: new Date("2020-07-22"),
      gender: "M",
      color: "Black",
      breed: "Domestic Shorthair",
      species: "Cat",
      weight: 4.2,
      status: "A",
      description: "Energetic playful rascal",
      created_at: new Date("2026-02-18 02:06:06.877472"),
      updated_at: new Date("2026-02-18 02:06:06.877472"),
    },
    {
      animal_id: 6,
      microchip: "100000000000006",
      name: "Max",
      date_of_birth: new Date("2018-11-05"),
      gender: "M",
      color: "Brindle",
      breed: "Boxer",
      species: "Dog",
      weight: 32.1,
      status: "F",
      description: "Playful and loyal companion good with kids.",
      created_at: new Date("2026-02-18 02:06:06.877472"),
      updated_at: new Date("2026-02-18 02:06:06.877472"),
    },
  ];
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
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
