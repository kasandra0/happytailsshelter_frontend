import type { InventoryItem } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";

export const inventoryItemSchema = z.object({
  inventory_item_id: z.number().int().readonly(),
  name: z.string().min(1, "Name is required"),
  type: z.string().optional(),
  cost: z.string().optional(),
  quantity: z
    .number()
    .positive("Quantity must be a positive number")
    .optional(),
});

export interface ManageInventoryItemFormProps {
  inventoryItem: InventoryItem | null;
  onSubmit: (data: InventoryItem) => void;
}

export const ManageInventoryItemForm: React.FC<
  ManageInventoryItemFormProps
> = ({ inventoryItem, onSubmit }) => {
  const form = useForm<z.infer<typeof inventoryItemSchema>>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      inventory_item_id: inventoryItem?.inventory_item_id ?? 0,
      name: inventoryItem?.name ?? "",
      type: inventoryItem?.type ?? "",
      cost: inventoryItem?.cost ?? "0",
      quantity: inventoryItem?.quantity ?? 0,
    },
  });

  const title =
    inventoryItem === null
      ? "New Inventory Item"
      : `${inventoryItem?.name}: ${inventoryItem?.inventory_item_id}`;

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="manage-inventory-item-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="inventory-item-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="inventory-item-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Dog Leash 6 ft."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="inventory_item-type">Type</FieldLabel>
                  <Input
                    {...field}
                    id="inventory_item-type"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Housing"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="cost"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="inventory_item-cost">cost</FieldLabel>
                  <Input
                    {...field}
                    id="inventory_item-cost"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 17.38"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="inventory-item-quantity">
                    Quantity{" "}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="inventory-item-quantity"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 3"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
