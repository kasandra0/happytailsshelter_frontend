import { ManageAnimalForm } from "@/components/form/manageAnimalForm";
import { ManageMedicalLogForm } from "@/components/form/manageMedicalLogForm";
import { Modal } from "@/components/modal/modal";
import { DataTable } from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import { calculateAge } from "@/lib/utils";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useMedicalLogStore } from "@/store/medicalLog/medicalLogStore";
import type { Animal, MedicalLog } from "@/types/types";
import { STATUS_LABELS, STATUS_STYLES } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState, type FC, useMemo } from "react";
import { NavLink } from "react-router-dom";

interface AnimalListingPageProps {}

const AnimalListingPage: FC<AnimalListingPageProps> = () => {
  const columns: ColumnDef<Animal>[] = useMemo(
    () => [
      { accessorKey: "microchip", header: "Microchip Number" },
      {
        id: "name",
        accessorKey: "name",
        header: "Animal Name",
        cell: ({ row }) => {
          const animal = row.original;
          return <NavLink to={`${animal.animal_id}`}>{animal.name}</NavLink>;
        },
      },
      {
        accessorKey: "date_of_birth",
        header: "Age",
        cell: ({ row }) => {
          const dateOfBirth = row.getValue("date_of_birth") as string;
          const birthDate = new Date(dateOfBirth);
          return calculateAge(birthDate);
        },
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const animal = row.original;

          const statusLabel = animal.status
            ? STATUS_LABELS[animal.status] ?? animal.status
            : "Unknown";
          const statusStyle = animal.status
            ? STATUS_STYLES[animal.status] ?? "bg-gray-100 text-gray-600"
            : "bg-gray-100 text-gray-600";
          return <span className={statusStyle}>{statusLabel}</span>;
        },
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
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-white border-2"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => handleUpdateAnimalMedicalLog(animal)}
                  >
                    <span className="clickable">Add Medical Log Entry</span>
                  </DropdownMenuItem>
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [animalToDeleteId, setAnimalToDeleteId] = useState<number | null>(null);
  const [medicalLogModalOpen, setMedicalLogModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const {
    animals,
    selectedAnimal,
    fetchAnimals,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    setSelectedAnimal,
  } = useAnimalStore();

  const { createMedicalLog, fetchMedicalLogsForAnimal } = useMedicalLogStore();

  useEffect(() => {
    fetchAnimals();
    if (selectedAnimal) {
      fetchMedicalLogsForAnimal(selectedAnimal.animal_id);
    }
  }, []);

  const handleUpdateAnimalMedicalLog = (animal: Animal) => {
    setSelectedAnimal(animal);
    setMedicalLogModalOpen(true);
  };

  const handleUpdateAnimal = (animal: Animal) => {
    setModalTitle("Update Animal");
    setSelectedAnimal(animal);
    setModalOpen(true);
  };

  const handleCreateAnimal = () => {
    setModalTitle("Create Animal");
    setSelectedAnimal(undefined);
    setModalOpen(true);
  };

  const handleDeleteAnimal = (id: number) => {
    setAnimalToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (animalToDeleteId === null) return;
    await deleteAnimal(animalToDeleteId);
    setAnimalToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setMedicalLogModalOpen(false);
  };

  const handleSubmit = async (animal: Animal) => {
    animal.animal_id === 0
      ? await createAnimal(animal)
      : await updateAnimal(animal);
    setModalOpen(false);
  };
  const handleMedicalLogSubmit = async (medicalLog: MedicalLog) => {
    if (selectedAnimal) {
      await createMedicalLog(selectedAnimal.animal_id, medicalLog);
      setMedicalLogModalOpen(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-2xl text-center font-bold">Animal Listing</h2>

      <div className="container mx-auto">
        <div className="flex flex-row justify-end my-2">
          <Button className="justify-end" onClick={handleCreateAnimal}>
            Create
          </Button>
        </div>
        <DataTable columns={columns} data={animals} />
      </div>

      <Modal
        open={medicalLogModalOpen}
        onOpenChange={setMedicalLogModalOpen}
        title="Add Medical Log Entry"
        component={
          <ManageMedicalLogForm
            animal={selectedAnimal}
            onSubmit={handleMedicalLogSubmit}
          />
        }
        onCancel={handleCancel}
        form="manage-medical-log-form"
      />
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        component={
          <ManageAnimalForm animal={selectedAnimal} onSubmit={handleSubmit} />
        }
        onCancel={handleCancel}
        form="manage-animal-form"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the animal. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AnimalListingPage;
