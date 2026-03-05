import * as React from "react";
import { useEffect } from "react";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import type { Animal, FosterHistory } from "@/types/types";
import { useUserStore } from "@/store/users/userStore";

export const fosterHistoryFormSchema = z.object({
  foster_history_id: z.number().int().readonly(),
  animal_id: z.number().int().readonly(),
  user_id: z.number().int(),
  animal_display: z.string().readonly(), // readonly display field, not submitted
  status: z.string().refine((val) => ["A", "X", "F"].includes(val), {
    message: "Invalid status",
  }),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  description: z.string().optional(),
});

export type FosterHistoryFormValues = z.infer<typeof fosterHistoryFormSchema>;

export interface ManageFosterHistoryFormProps {
  fosterHistory: FosterHistory | null;
  animal: Animal;
  onSubmit: (data: FosterHistory) => void;
}

export const ManageFosterHistoryForm: React.FC<
  ManageFosterHistoryFormProps
> = ({ fosterHistory, onSubmit, animal }) => {
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (date?: Date | string) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  const form = useForm<FosterHistoryFormValues>({
    resolver: zodResolver(fosterHistoryFormSchema),
    defaultValues: {
      foster_history_id: fosterHistory?.foster_history_id ?? 0,
      animal_id: fosterHistory?.animal_id ?? 0,
      user_id: Number(fosterHistory?.user_id) ?? 0,
      animal_display: `${animal.animal_id}: ${animal.name}`,
      status: (animal.status as "A" | "X" | "F") ?? "A",
      start_date: fosterHistory?.start_date
        ? new Date(fosterHistory.start_date)
        : new Date(),
      end_date: fosterHistory?.end_date
        ? new Date(fosterHistory.end_date)
        : undefined,
      description: animal.description ?? "",
    },
  });

  // Map form values back to FosterHistory shape for the parent
  const handleSubmit = (data: FosterHistoryFormValues) => {
    onSubmit({
      ...fosterHistory,
      ...data,
    } as FosterHistory);
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>
          {fosterHistory
            ? `Foster Record: ${fosterHistory.name} (ID: ${fosterHistory.foster_history_id})`
            : "New Foster Record"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="manage-foster-history-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup>
            {/* Animal — readonly display */}
            <Controller
              name="animal_display"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="foster-animal">Animal</FieldLabel>
                  <Input
                    {...field}
                    id="foster-animal"
                    disabled
                    className="bg-muted text-muted-foreground"
                  />
                </Field>
              )}
            />

            {/* Foster Parent */}
            <Controller
              name="user_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="foster-user-id">
                    Foster Parent
                  </FieldLabel>
                  <select
                    id="foster-user-id"
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

            {/* Status */}
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="foster-status">Status</FieldLabel>
                  <select
                    {...field}
                    id="foster-status"
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="">Select a status</option>
                    <option value="A">Available</option>
                    <option value="X">Adopted</option>
                    <option value="F">Fostered</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Start Date */}
            <Controller
              name="start_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="foster-start-date">
                    Start Date
                  </FieldLabel>
                  <Input
                    id="foster-start-date"
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

            {/* End Date */}
            <Controller
              name="end_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="foster-end-date">End Date</FieldLabel>
                  <Input
                    id="foster-end-date"
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

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="foster-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="foster-description"
                      placeholder="Any notes about this foster arrangement."
                      rows={4}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {(field.value ?? "").length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
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
