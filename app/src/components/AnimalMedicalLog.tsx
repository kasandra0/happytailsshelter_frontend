import { useState, useEffect, useMemo, type FC, useContext } from "react";
import { ADMIN_ROLE, type Animal, type MedicalLog } from "@/types/types";
import { useMedicalLogStore } from "@/store/medicalLog/medicalLogStore";
import { DataTable } from "./table/Table";
import { Button } from "./ui/button";
import { Modal } from "./modal/modal";
import { ManageMedicalLogForm } from "./form/manageMedicalLogForm";
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
import { GlobalContext } from "@/hooks/GlobalContext";

export interface AnimalMedicalLogProps {
  animal: Animal;
  isReadOnly?: boolean;
}

const AnimalMedicalLog: FC<AnimalMedicalLogProps> = ({
  animal,
  isReadOnly = false,
}) => {
  const [medicalLogs, setMedicalLogs] = useState<MedicalLog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [logToDeleteId, setLogToDeleteId] = useState<number | null>(null);

  const { user } = useContext(GlobalContext);

  const {
    selectedMedicalLog,
    fetchMedicalLogsForAnimal,
    createMedicalLog,
    updateMedicalLog,
    deleteMedicalLog,
    setSelectedMedicalLog,
  } = useMedicalLogStore();

  useEffect(() => {
    
    fetchMedicalLogsForAnimal(animal.animal_id).then(setMedicalLogs);
  }, [animal.animal_id, fetchMedicalLogsForAnimal]);

  const handleCreate = () => {
    setModalTitle("Create Medical Log Entry");
    setSelectedMedicalLog(undefined);
    setModalOpen(true);
  };

  const handleUpdate = (log: MedicalLog) => {
    setModalTitle("Update Medical Log Entry");
    setSelectedMedicalLog(log);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setLogToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (logToDeleteId === null) return;
    await deleteMedicalLog(logToDeleteId);
    setMedicalLogs((prev) => prev.filter((ml) => ml.log_history_id !== logToDeleteId));
    setLogToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleSubmit = async (log: MedicalLog) => {
    const updated =
      log.log_history_id === 0
        ? await createMedicalLog(animal.animal_id, log)
        : await updateMedicalLog(log);
    setMedicalLogs(updated);
    setModalOpen(false);
  };

  const columns: ColumnDef<MedicalLog>[] = useMemo(
    () => [
      {
        accessorKey: "created_date",
        header: "Created Date",
        cell: ({ row }) => {
          const val = row.getValue("created_date");
          return val ? new Date(val as string).toLocaleString() : "-";
        },
      },
      {
        id: "user",
        header: "Logged By",
        cell: ({ row }) => {
          const user = row.original.user;
          return user
            ? `${user.first_name} ${user.last_name}`
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
      { accessorKey: "description", header: "Description" },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          if (isReadOnly) return null;

          const log = row.original as MedicalLog;
          const isAdmin = user?.role === ADMIN_ROLE;
          const isOwner = log.user_id.toString() === user?.user_id.toString();

          if (!isAdmin && !isOwner) return null;

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
                  <DropdownMenuItem onClick={() => handleUpdate(log)}>
                    <span className="clickable">Update</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(log.log_history_id)}
                  >
                    <span className="clickable">Delete</span>
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Medical Logs</h2>
        {!isReadOnly && <Button onClick={handleCreate}>Create</Button>}
      </div>

      <DataTable columns={columns} data={medicalLogs} />

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        component={
          <ManageMedicalLogForm
            animal={animal}
            medicalLog={selectedMedicalLog}
            onSubmit={handleSubmit}
          />
        }
        onCancel={() => setModalOpen(false)}
        form="manage-medical-log-form"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this medical log entry. This action
              cannot be undone.
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

export default AnimalMedicalLog;
