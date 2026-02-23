import AnimalListingComponent from "@/components/animal-listing/animalListingComponent";
import { DataTable } from "@/components/table/Table";
import type { Animal } from "@/types/animal";
import type { ColumnDef } from "@tanstack/react-table";
import React, { type FC } from "react";

interface AnimalListingPageProps {
  isStaff: boolean;
}

const AnimalListingPage: FC<AnimalListingPageProps> = ({ isStaff }) => {
  return <>{isStaff ? staffView() : nonStaffView()}</>;
};

const staffView = () => {
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

const nonStaffView = () => {
  return (
    <>
      <AnimalListingComponent />
    </>
  );
};

export default AnimalListingPage;
