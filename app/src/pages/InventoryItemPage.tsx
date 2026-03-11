import { DataTable } from "@/components/table/Table";
import { useInventoryCheckoutStore } from "@/store/inventoryCheckout/inventoryCheckoutStore";
import { useInventoryItemStore } from "@/store/inventoryItems/inventoryItemsStore";
import type { InventoryCheckout } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const columns: ColumnDef<InventoryCheckout>[] = [
  {
    accessorKey: "checkout_date",
    header: "Checkout Date",
    cell: ({ row }) => {
      const val = row.getValue("checkout_date");
      return val ? new Date(val as string).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
    cell: ({ row }) => {
      const val = row.getValue("return_date");
      return val ? new Date(val as string).toLocaleDateString() : "-";
    },
  },
  { accessorKey: "quantity", header: "Quantity" },
  {
    id: "animal",
    header: "Animal ID",
    cell: ({ row }) => row.original.animal_id,
  },
  {
    id: "user",
    header: "Foster Parent",
    cell: ({ row }) => {
      const user = row.original.user;
      return user
        ? `${user.first_name} ${user.last_name ?? ""}`.trim()
        : row.original.user_id;
    },
  },
];

export default function InventoryItemPage() {
  const { id } = useParams();
  const itemId = Number(id);

  const { inventoryItems, fetchInventoryItems } = useInventoryItemStore();
  const { inventoryCheckouts, fetchInventoryCheckouts } =
    useInventoryCheckoutStore();

  useEffect(() => {
    fetchInventoryItems();
    fetchInventoryCheckouts();
  }, []);

  const item = inventoryItems.find((i) => i.inventory_item_id === itemId);

  const checkoutsForItem = useMemo(
    () => inventoryCheckouts.filter((c) => c.inventory_item_id === itemId),
    [inventoryCheckouts, itemId]
  );

  const rentedOut = useMemo(() => {
    const now = new Date();
    return checkoutsForItem
      .filter((c) => {
        const returnDate = c.return_date as unknown as Date | null;
        return returnDate === null || new Date(returnDate) > now;
      })
      .reduce((sum, c) => sum + c.quantity, 0);
  }, [checkoutsForItem]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          {item?.name ?? "Inventory Item"}
        </h1>
        {item ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Type:</span> {item.type ?? "-"}
            </div>
            <div>
              <span className="font-medium">Quantity:</span>{" "}
              {item.quantity ?? "-"}
            </div>
            <div>
              <span className="font-medium">Cost:</span> {item.cost ?? "-"}
            </div>
            <div>
              <span className="font-medium">Last Updated:</span>{" "}
              {item.lastupdated
                ? new Date(item.lastupdated).toLocaleDateString()
                : "-"}
            </div>
            <div>
              <span className="font-medium">Rented Out:</span> {rentedOut}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Loading item details...</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Checkout History</h2>
        <DataTable columns={columns} data={checkoutsForItem} />
      </div>
    </div>
  );
}
