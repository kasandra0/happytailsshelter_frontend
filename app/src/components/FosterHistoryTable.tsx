import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  type FC,
} from "react";
import { ADMIN_ROLE, type Animal, type FosterHistory } from "@/types/types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { DataTable } from "./table/Table";
import { Modal } from "./modal/modal";
import { ManageFosterHistoryForm } from "./form/manageFosterHistoryForm";
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
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
import { useAnimalStore } from "@/store/animals/animalStore";
import { GlobalContext } from "@/hooks/GlobalContext";

export interface FosterHistoryTableProps {
  animal: Animal;
}

const FosterHistoryTable: FC<FosterHistoryTableProps> = ({ animal }) => {
  const { user } = useContext(GlobalContext);

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

  const handleCreateFosterHistory = () => {
    setFosterModalTitle("Create Foster History Record");
    setSelectedFosterHistory(null);
    setFosterModalOpen(true);
  };

  const handleUpdateFosterHistory = useCallback(
    (record: FosterHistory) => {
      setFosterModalTitle("Update Foster History Record");
      setSelectedFosterHistory(record);
      setFosterModalOpen(true);
    },
    [setSelectedFosterHistory]
  );

  const handleDeleteFosterHistory = useCallback((id: number) => {
    setFosterHistoryToDeleteId(id);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = async () => {
    if (fosterHistoryToDeleteId === null) return;
    await deleteFosterHistory(fosterHistoryToDeleteId);
    setFosterHistoryToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleFosterSubmit = async (record: FosterHistory) => {
    const { status, description, ...fosterPayload } = record as any;

    await updateAnimal({
      ...animal,
      status,
      description,
    });

    const payload = {
      ...fosterPayload,
      animal_id: animal.animal_id,
      staff_id: user?.user_id,
    };

    record.foster_history_id === 0
      ? await createFosterHistory(payload)
      : await updateFosterHistory(payload);

    await getAnimal(animal.animal_id);

    setFosterModalOpen(false);
  };

  const fosterColumns: ColumnDef<FosterHistory>[] = useMemo(
    () => [
      {
        id: "user",
        header: "Checked Out By",
        cell: ({ row }) => {
          const user = row.original.user_foster_history_user_idTouser as any;
          return user
            ? `${user.first_name} ${user.last_name ?? ""}`
            : row.original.user_id;
        },
      },
      {
        accessorKey: "staff_id",
        header: "Staff Member",
        cell: ({ row }) => {
          const user = row.original.user_foster_history_staff_idTouser as any;
          return user
            ? `${user.first_name} ${user.last_name ?? ""}`
            : row.original.user_id;
        },
      },
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
    [handleUpdateFosterHistory, handleDeleteFosterHistory]
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Foster History</h2>
          <Button onClick={handleCreateFosterHistory}>Create</Button>
        </div>
        <DataTable columns={fosterColumns} data={fosterHistory} />
      </div>

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
    </>
  );
};

export default FosterHistoryTable;
