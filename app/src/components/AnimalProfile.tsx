import { useState, useEffect, type FC, useContext } from "react";
import type { Animal, FosterHistory, MedicalLog } from "@/types/types";
import { calculateAge } from "@/lib/utils";
import { Camera, MoreHorizontal } from "lucide-react";
import { useMedicalLogStore } from "@/store/medicalLog/medicalLogStore";
import { Button } from "./ui/button";
import { ManageMedicalLogForm } from "./form/manageMedicalLogForm";
import { Modal } from "./modal/modal";
import { DataTable } from "./table/Table";
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
import { useMemo } from "react";
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
import { ManageFosterHistoryForm } from "./form/manageFosterHistoryForm";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useAnimalStore } from "@/store/animals/animalStore";

export interface AnimalProfileProps {
  animal: Animal;
}

const STATUS_LABELS: Record<string, string> = {
  A: "Available",
  X: "Adopted",
  F: "Fostered",
};

const STATUS_STYLES: Record<string, string> = {
  A: "bg-yellow-100 text-yellow-800",
  X: "bg-gray-100 text-gray-600",
  F: "bg-purple-100 text-purple-800",
};

const AnimalProfile: FC<AnimalProfileProps> = ({ animal }) => {
  const { user } = useContext(GlobalContext);

  const dateOfBirth = animal.date_of_birth
    ? new Date(animal.date_of_birth)
    : null;
  const age = dateOfBirth ? calculateAge(dateOfBirth) : null;
  const statusLabel = animal.status
    ? STATUS_LABELS[animal.status] ?? animal.status
    : "Unknown";
  const statusStyle = animal.status
    ? STATUS_STYLES[animal.status] ?? "bg-gray-100 text-gray-600"
    : "bg-gray-100 text-gray-600";
  const photo = animal.photo_url;

  // Medical log modal
  const [medicalLogModalOpen, setMedicalLogModalOpen] = useState(false);
  const [medicalLogModalTitle, setMedicalLogModalTitle] = useState("");
  const { createMedicalLog } = useMedicalLogStore();

  // Foster history modal + delete dialog
  const [fosterModalOpen, setFosterModalOpen] = useState(false);
  const [fosterModalTitle, setFosterModalTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fosterHistoryToDeleteId, setFosterHistoryToDeleteId] = useState<
    number | null
  >(null);

  const {
    fosterHistory,
    selectedFosterHistory,
    fetchAnimalFosterHistory,
    createFosterHistory,
    updateFosterHistory,
    deleteFosterHistory,
    setSelectedFosterHistory,
  } = useFosterHistoryStore();

  const { updateAnimal, getAnimal } = useAnimalStore();

  useEffect(() => {
    fetchAnimalFosterHistory(animal.animal_id);
  }, [animal.animal_id]);

  // Medical log handlers
  const handleCreateMedicalLog = () => {
    setMedicalLogModalTitle("Create Medical Log Entry");
    setMedicalLogModalOpen(true);
  };

  const handleMedicalLogSubmit = async (medicalLog: MedicalLog) => {
    await createMedicalLog(medicalLog);
    setMedicalLogModalOpen(false);
  };

  // Foster history handlers
  const handleCreateFosterHistory = () => {
    setFosterModalTitle("Create Foster History Record");
    setSelectedFosterHistory(null);
    setFosterModalOpen(true);
  };

  const handleUpdateFosterHistory = (record: FosterHistory) => {
    setFosterModalTitle("Update Foster History Record");
    setSelectedFosterHistory(record);
    setFosterModalOpen(true);
  };

  const handleDeleteFosterHistory = (id: number) => {
    setFosterHistoryToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (fosterHistoryToDeleteId === null) return;
    await deleteFosterHistory(fosterHistoryToDeleteId);
    setFosterHistoryToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleFosterSubmit = async (record: FosterHistory) => {
    const { status, description, ...fosterPayload } = record as any;

    // update the animal's status and description
    await updateAnimal({
      ...animal,
      status,
      description,
    });

    // create/update the foster history record
    const payload = {
      ...fosterPayload,
      animal_id: animal.animal_id,
      staff_id: user?.userId,
    };

    record.foster_history_id === 0
      ? await createFosterHistory(payload)
      : await updateFosterHistory(payload);

    await getAnimal(animal.animal_id);

    setFosterModalOpen(false);
  };

  const fosterColumns: ColumnDef<FosterHistory>[] = useMemo(
    () => [
      { accessorKey: "foster_history_id", header: "ID" },
      { accessorKey: "user_id", header: "User ID" },
      { accessorKey: "staff_id", header: "Staff ID" },
      {
        accessorKey: "start_date",
        header: "Start Date",
        cell: ({ row }) => {
          const val = row.getValue("start_date");
          return val ? new Date(val as string).toLocaleDateString() : "-";
        },
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        cell: ({ row }) => {
          const val = row.getValue("end_date");
          return val ? new Date(val as string).toLocaleDateString() : "-";
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const record = row.original as FosterHistory;
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
                    onClick={() => handleUpdateFosterHistory(record)}
                  >
                    <span className="clickable">Update Record</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleDeleteFosterHistory(record.foster_history_id)
                    }
                  >
                    <span className="clickable">Delete Record</span>
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

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Animal Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0">
            {photo ? (
              <img
                className="h-64 w-full object-cover md:h-full md:w-64"
                src={photo}
                alt={`Photo of ${animal.name}`}
              />
            ) : (
              <div className="h-64 w-full bg-gray-200 flex flex-col items-center justify-center text-gray-500 md:h-full md:w-64">
                <Camera className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium">No image available</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 w-full">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{animal.name}</h1>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${statusStyle}`}
              >
                {statusLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-500">Species</p>
                <p className="text-gray-900">{animal.species}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Breed</p>
                <p className="text-gray-900">{animal.breed ?? "Unknown"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Date of Birth</p>
                <p className="text-gray-900">
                  {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Age</p>
                <p className="text-gray-900">
                  {age !== null
                    ? age === 0
                      ? "< 1 year"
                      : `${age} year${age !== 1 ? "s" : ""}`
                    : "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Gender</p>
                <p className="text-gray-900">{animal.gender ?? "Unknown"}</p>
              </div>
            </div>

            {animal.description && (
              <div>
                <p className="font-medium text-gray-500 text-sm">Description</p>
                <p className="text-gray-700 text-sm mt-1">
                  {animal.description}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleCreateMedicalLog}>
                Add Medical Log Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Foster History Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Foster History</h2>
          <Button onClick={handleCreateFosterHistory}>Create</Button>
        </div>
        <DataTable columns={fosterColumns} data={fosterHistory} />
      </div>

      {/* Medical Log Modal */}
      <Modal
        open={medicalLogModalOpen}
        onOpenChange={setMedicalLogModalOpen}
        title={medicalLogModalTitle}
        component={
          <ManageMedicalLogForm
            animal={animal}
            onSubmit={handleMedicalLogSubmit}
          />
        }
        onCancel={() => setMedicalLogModalOpen(false)}
        form="manage-medical-log-form"
      />

      {/* Foster History Modal */}
      <Modal
        open={fosterModalOpen}
        onOpenChange={setFosterModalOpen}
        title={fosterModalTitle}
        component={
          <ManageFosterHistoryForm
            animal={animal}
            fosterHistory={
              selectedFosterHistory ??
              ({
                animal_id: animal.animal_id,
                name: animal.name,
              } as FosterHistory)
            }
            onSubmit={handleFosterSubmit}
          />
        }
        onCancel={() => setFosterModalOpen(false)}
        form="manage-foster-history-form"
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the foster history record. This
              action cannot be undone.
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

export default AnimalProfile;
