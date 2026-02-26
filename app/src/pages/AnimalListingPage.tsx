import { ManageAnimalForm } from "@/components/form/manageAnimalForm";
import { Modal } from "@/components/modal/modal";
import { DataTable } from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import { useAnimalStore } from "@/store/animals/animalStore";
import type { Animal } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState, type FC, useMemo } from "react";

interface AnimalListingPageProps {}

const AnimalListingPage: FC<AnimalListingPageProps> = () => {
  const columns: ColumnDef<Animal>[] = useMemo(
    () => [
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
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const animal = row.original as Animal;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-white border-2"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => handleUpdateAnimal(animal)}>
                    <span className="clickable"> Update Animal</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteAnimal(animal.animal_id)}
                  >
                    <span className="clickable"> Delete Animal</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const [modalOpen, setModalOpen] = useState(false);
  const {
    animals,
    selectedAnimal,
    fetchAnimals,
    updateAnimal,
    deleteAnimal,
    setSelectedAnimal,
  } = useAnimalStore();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleUpdateAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setModalOpen(true);
    console.log("update clicked");
  };

  const handleDeleteAnimal = async (id: number) => {
    await deleteAnimal(id);
  };

  const handleCancel = () => {};

  const handleSubmit = async (animal: Animal) => {
    await updateAnimal(animal);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Animal Listing</h2>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={animals} />
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Confirm Update"
        component={
          <ManageAnimalForm animal={selectedAnimal} onSubmit={handleSubmit} />
        }
        submitText="Update"
        onCancel={handleCancel}
        form="manage-animal-form"
      />
    </div>
  );
};

export default AnimalListingPage;
