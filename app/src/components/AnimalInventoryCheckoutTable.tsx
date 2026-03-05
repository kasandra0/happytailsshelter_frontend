import { useState, useEffect, useMemo, type FC } from "react";
import type { Animal, InventoryCheckout } from "@/types/types";
import { useInventoryCheckoutStore } from "@/store/inventoryCheckout/inventoryCheckoutStore";
import { DataTable } from "./table/Table";
import { Button } from "./ui/button";
import { Modal } from "./modal/modal";
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
import { ManageInventoryItemCheckoutForm } from "./form/manageInventoryItemCheckoutForm";

export interface AnimalInventoryCheckoutProps {
  animal: Animal;
}

const AnimalInventoryCheckout: FC<AnimalInventoryCheckoutProps> = ({
  animal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkoutToDeleteId, setCheckoutToDeleteId] = useState<number | null>(
    null
  );
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    inventoryCheckouts,
    selectedInventoryCheckout,
    fetchInventoryCheckoutsForAnimal,
    createInventoryCheckout,
    updateInventoryCheckout,
    deleteInventoryCheckout,
    setSelectedInventoryCheckout,
  } = useInventoryCheckoutStore();

  useEffect(() => {
    fetchInventoryCheckoutsForAnimal(animal.animal_id);
  }, [animal.animal_id]);

  const handleCreate = () => {
    setModalTitle("Create Checkout Entry");
    setSelectedInventoryCheckout(null);
    setModalOpen(true);
  };

  const handleUpdate = (checkout: InventoryCheckout) => {
    setModalTitle("Update Checkout Entry");
    setSelectedInventoryCheckout(checkout);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setCheckoutToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (checkoutToDeleteId === null) return;
    await deleteInventoryCheckout(checkoutToDeleteId);
    setCheckoutToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleSubmit = async (checkout: InventoryCheckout) => {
    try {
      const payload = { ...checkout, animal_id: animal.animal_id };
      checkout.checkout_id === 0
        ? await createInventoryCheckout(payload)
        : await updateInventoryCheckout(payload);
      setModalOpen(false);
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "An error occurred during checkout.";
      setErrorMessage(message);
      setErrorDialogOpen(true);
    }
  };

  const columns: ColumnDef<InventoryCheckout>[] = useMemo(
    () => [
      {
        accessorKey: "checkout_date",
        header: "Checkout Date",
        cell: ({ row }) => {
          const val = row.getValue("checkout_date");
          return val ? new Date(val as string).toLocaleDateString() : "-";
        },
      },
      { accessorKey: "quantity", header: "Quantity" },

      {
        accessorKey: "return_date",
        header: "Return Date",
        cell: ({ row }) => {
          const val = row.getValue("return_date");
          return val ? new Date(val as string).toLocaleDateString() : "-";
        },
      },
      {
        id: "inventory_item",
        header: "Item",
        cell: ({ row }) =>
          row.original.inventory_item?.name ?? row.original.inventory_item_id,
      },
      {
        id: "user",
        header: "Checked Out By",
        cell: ({ row }) => {
          const user = row.original.user as any;
          return user
            ? `${user.first_name} ${user.last_name ?? ""}`
            : row.original.user_id;
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const checkout = row.original as InventoryCheckout;
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
                  <DropdownMenuItem onClick={() => handleUpdate(checkout)}>
                    <span className="clickable">Update</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(checkout.checkout_id)}
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
        <h2 className="text-xl font-bold">Inventory Checkouts</h2>
        <Button onClick={handleCreate}>Create</Button>
      </div>

      <DataTable columns={columns} data={inventoryCheckouts} />

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        component={
          <ManageInventoryItemCheckoutForm
            checkout={selectedInventoryCheckout}
            animal={animal}
            onSubmit={handleSubmit}
          />
        }
        onCancel={() => setModalOpen(false)}
        form="manage-inventory-checkout-form"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the checkout record. This action
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

      <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Checkout Failed</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AnimalInventoryCheckout;
