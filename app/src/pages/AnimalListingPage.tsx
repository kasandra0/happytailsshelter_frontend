import { ManageAnimalForm } from "@/components/form/ManageAnimalForm";
import { Modal } from "@/components/modal/modal";
import { DataTable } from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import SidebarLayout from "@/layout/SidebarLayout";
import { api } from "@/lib/api";
import type { Animal } from "@/types/animal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
            <DropdownMenuContent align="end" className="w-40 bg-white border-2">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => updateAnimal(animal)}>
                  Update Animal
                </DropdownMenuItem>
                <DropdownMenuItem
                // onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Delete Animal
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>({} as Animal);

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

  const updateAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setModalOpen(true);
    console.log("update clicked");
  };

  const handleCancel = () => {};

  const handleSubmit = async () => {};

  return (
    <SidebarLayout>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold">Animal Listing</h2>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={animals} />
        </div>

        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Confirm Update"
          component={<ManageAnimalForm animal={selectedAnimal} />}
          submitText="Update"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </SidebarLayout>
  );
};

export default AnimalListingPage;
