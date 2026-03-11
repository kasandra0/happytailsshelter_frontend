import { ManageInventoryItemForm } from "@/components/form/manageInventoryItemForm";
import { Modal } from "@/components/modal/modal";
import { DataTable } from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import { useInventoryCheckoutStore } from "@/store/inventoryCheckout/inventoryCheckoutStore";
import { useInventoryItemStore } from "@/store/inventoryItems/inventoryItemsStore";
import type { InventoryItem } from "@/types/types";
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

import type { ColumnDef } from "@tanstack/table-core";
import { MoreHorizontal } from "lucide-react";
import { useMemo, type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InventoryListingPageProps {}

const InventoryListingPage: FC<InventoryListingPageProps> = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inventoryItemToDeleteId, setInventoryItemToDeleteId] = useState<
    number | null
  >(null);
  const [modalTitle, setModalTitle] = useState("");
  const {
    inventoryItems,
    selectedInventoryItem,
    fetchInventoryItems,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    setSelectedInventoryItem,
  } = useInventoryItemStore();

  const { inventoryCheckouts, fetchInventoryCheckouts } =
    useInventoryCheckoutStore();

  useEffect(() => {
    fetchInventoryItems();
    fetchInventoryCheckouts();
  }, []);

  const rentedOutByItemId = useMemo(() => {
    const now = new Date();
    const map = new Map<number, number>();
    for (const c of inventoryCheckouts) {
      const returnDate = c.return_date as unknown as Date | null;
      const isActive = returnDate === null || new Date(returnDate) > now;
      if (isActive) {
        map.set(c.inventory_item_id, (map.get(c.inventory_item_id) ?? 0) + c.quantity);
      }
    }
    return map;
  }, [inventoryCheckouts]);

  const handleCreateInventoryItem = () => {
    setModalTitle("Create Inventory Item");
    setSelectedInventoryItem(null);
    setModalOpen(true);
  };

  const handleUpdateInventoryItem = (inventoryItem: InventoryItem) => {
    setModalTitle("Update Inventory Item");
    setSelectedInventoryItem(inventoryItem);
    setModalOpen(true);
  };

  const handleDeleteInventoryItem = (id: number) => {
    setInventoryItemToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const columns: ColumnDef<InventoryItem>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Item Name",
        cell: ({ row }) => row.original.name,
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "quantity",
        header: "In Stock",
      },
      {
        id: "rentedOut",
        header: "Rented Out",
        cell: ({ row }) =>
          rentedOutByItemId.get(row.original.inventory_item_id) ?? 0,
      },
      {
        accessorKey: "cost",
        header: "Price",
      },
      {
        accessorKey: "lastupdated",
        header: "Last Updated",
        cell: ({ row }) => {
          const date = row.getValue("lastupdated");
          return date
            ? new Date(row.getValue("lastupdated")).toLocaleString()
            : "";
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const inventoryItem = row.original as InventoryItem;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
                    onClick={(e) => {e.stopPropagation(); handleUpdateInventoryItem(inventoryItem)}}
                  >
                    <span className="clickable">Update Item</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) =>
                    {e.stopPropagation();
                      handleDeleteInventoryItem(inventoryItem.inventory_item_id)
                    }
                    }
                  >
                    <span className="clickable">Delete Item</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [rentedOutByItemId]
  );

  const handleConfirmDelete = async () => {
    if (inventoryItemToDeleteId === null) return;
    await deleteInventoryItem(inventoryItemToDeleteId);
    setInventoryItemToDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleCancel = () => {};

  const handleSubmit = async (inventoryItem: InventoryItem) => {
    if (selectedInventoryItem) {
      await updateInventoryItem(inventoryItem);
    } else {
      const { inventory_item_id, ...newItem } = inventoryItem;
      await createInventoryItem(newItem);
    }
    setModalOpen(false);
    setSelectedInventoryItem(null);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">

      <div className="container mx-auto">
        <div className="flex flex-row justify-end my-2">
          <Button className="justify-end" onClick={handleCreateInventoryItem}>
            Create
          </Button>
        </div>
        <DataTable columns={columns} data={inventoryItems}
          onRowClick={(item) => navigate(`${item.inventory_item_id}`)}
        />
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        component={
          <ManageInventoryItemForm
            inventoryItem={selectedInventoryItem}
            onSubmit={handleSubmit}
          />
        }
        onCancel={handleCancel}
        form="manage-inventory-item-form"
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the inventory item. This action
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

export default InventoryListingPage;
