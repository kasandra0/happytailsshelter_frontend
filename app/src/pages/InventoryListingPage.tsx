import { ManageInventoryItemForm } from "@/components/form/manageInventoryItemForm";
import { Modal } from "@/components/modal/modal";
import { DataTable } from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import { useInventoryItemStore } from "@/store/inventoryItems/inventoryItemsStore";
import type { InventoryItem } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import type { ColumnDef } from "@tanstack/table-core";
import { MoreHorizontal } from "lucide-react";
import { useMemo, type FC, useEffect, useState } from "react";
import { NavLink } from "react-router";

interface InventoryListingPageProps {}

const InventoryListingPage: FC<InventoryListingPageProps> = () => {
  const columns: ColumnDef<InventoryItem>[] = useMemo(
    () => [
      { accessorKey: "inventory_item_id", header: "ID" },
      {
        id: "name",
        accessorKey: "name",
        header: "Item Name",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <NavLink to={`${item.inventory_item_id}`}>{item.name}</NavLink>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
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
                  <DropdownMenuItem
                    onClick={() => handleUpdateInventoryItem(inventoryItem)}
                  >
                    <span className="clickable"> Update Item</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleDeleteInventoryItem(inventoryItem.inventory_item_id)
                    }
                  >
                    <span className="clickable"> Delete Item</span>
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
    inventoryItems,
    selectedInventoryItem,
    fetchInventoryItems,
    updateInventoryItem,
    deleteInventoryItem,
    setSelectedInventoryItem,
  } = useInventoryItemStore();

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const handleUpdateInventoryItem = (inventoryItem: InventoryItem) => {
    setSelectedInventoryItem(inventoryItem);
    setModalOpen(true);
    console.log("update clicked");
  };

  const handleDeleteInventoryItem = async (id: number) => {
    await deleteInventoryItem(id);
  };

  const handleCancel = () => {};

  const handleSubmit = async (inventoryItem: InventoryItem) => {
    await updateInventoryItem(inventoryItem);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Inventory Item Listing</h2>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={inventoryItems} />
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Confirm Update"
        component={
          <ManageInventoryItemForm
            inventoryItem={selectedInventoryItem}
            onSubmit={handleSubmit}
          />
        }
        submitText="Update"
        onCancel={handleCancel}
        form="manage-inventory-item-form"
      />
    </div>
  );
};

export default InventoryListingPage;
