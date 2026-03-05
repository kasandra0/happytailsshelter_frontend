import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Animal, InventoryCheckout } from "@/types/types";
import { useUserStore } from "@/store/users/userStore";
import { useEffect } from "react";
import { useInventoryItemStore } from "@/store/inventoryItems/inventoryItemsStore";

export const inventoryItemCheckoutFormSchema = z.object({
  checkout_id: z.number().int().readonly(),
  animal_display: z.string().readonly(),
  animal_id: z.number().int().readonly(),
  inventory_item_id: z.number().int(),
  user_id: z.number().int(),
  quantity: z.number().int().positive("Quantity must be a positive number"),
  checkout_date: z.date(),
  return_date: z.date().optional(),
});

export type InventoryItemCheckoutFormValues = z.infer<
  typeof inventoryItemCheckoutFormSchema
>;

export interface ManageInventoryCheckoutFormProps {
  checkout: InventoryCheckout | null;
  animal: Animal;
  onSubmit: (data: InventoryCheckout) => void;
}

export const ManageInventoryItemCheckoutForm: React.FC<
  ManageInventoryCheckoutFormProps
> = ({ checkout, animal, onSubmit }) => {
  const { users, fetchUsers } = useUserStore();
  const { inventoryItems, fetchInventoryItems } = useInventoryItemStore();

  useEffect(() => {
    fetchUsers();
    fetchInventoryItems();
  }, []);

  const formatDate = (date?: Date | string) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  const form = useForm<InventoryItemCheckoutFormValues>({
    resolver: zodResolver(inventoryItemCheckoutFormSchema),
    defaultValues: {
      checkout_id: checkout?.checkout_id ?? 0,
      animal_display: `${animal.animal_id}: ${animal.name}`,
      animal_id: animal.animal_id,
      inventory_item_id: checkout?.inventory_item_id ?? 0,
      user_id: checkout?.user_id ?? 0,
      quantity: checkout?.quantity ?? 1,
      checkout_date: checkout?.checkout_date
        ? new Date(checkout.checkout_date)
        : new Date(),
      return_date: checkout?.return_date
        ? new Date(checkout.return_date)
        : undefined,
    },
  });

  useEffect(() => {
    form.reset({
      checkout_id: checkout?.checkout_id ?? 0,
      animal_display: animal.name,
      animal_id: animal.animal_id,
      inventory_item_id: checkout?.inventory_item_id ?? 0,
      user_id: checkout?.user_id ?? 0,
      quantity: checkout?.quantity ?? 1,
      checkout_date: checkout?.checkout_date
        ? new Date(checkout.checkout_date)
        : new Date(),
      return_date: checkout?.return_date
        ? new Date(checkout.return_date)
        : undefined,
    });
  }, [checkout]);

  const handleSubmit = (data: InventoryItemCheckoutFormValues) => {
    const { animal_display, ...payload } = data;
    onSubmit({ ...checkout, ...payload } as InventoryCheckout);
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>
          {checkout
            ? `Checkout Record: ${checkout.checkout_id}`
            : "New Checkout"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="manage-inventory-checkout-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup>
            {/* Animal — readonly */}
            <Controller
              name="animal_display"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="checkout-animal">Animal</FieldLabel>
                  <Input
                    {...field}
                    id="checkout-animal"
                    disabled
                    className="bg-muted text-muted-foreground"
                  />
                </Field>
              )}
            />

            <Controller
              name="user_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-user">Foster Parent</FieldLabel>
                  <select
                    id="checkout-user"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value={0}>Select a user</option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="inventory_item_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-item">Item</FieldLabel>
                  <select
                    id="checkout-item"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value={0}>Select an item</option>
                    {inventoryItems.map((item) => (
                      <option
                        key={item.inventory_item_id}
                        value={item.inventory_item_id}
                      >
                        {item.name} {item.type ? `(${item.type})` : ""}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Quantity */}
            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-quantity">Quantity</FieldLabel>
                  <Input
                    {...field}
                    id="checkout-quantity"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Checkout Date */}
            <Controller
              name="checkout_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-date">Checkout Date</FieldLabel>
                  <Input
                    id="checkout-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={formatDate(field.value)}
                    onChange={(e) => field.onChange(e.target.valueAsDate)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Return Date */}
            <Controller
              name="return_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="return-date">Return Date</FieldLabel>
                  <Input
                    id="return-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={formatDate(field.value)}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsDate ?? undefined)
                    }
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
