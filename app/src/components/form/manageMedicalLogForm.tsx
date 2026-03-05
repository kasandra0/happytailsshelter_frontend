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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import type { Animal, MedicalLog } from "@/types/types";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useContext } from "react";

export const medicalLogFormSchema = z.object({
  log_history_id: z.number().int().readonly(),
  animal_id: z.number().int(),
  animal_name: z.string().readonly(),
  user_id: z.number().int(),
  type: z.number().optional(),
  created_date: z.date(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  description: z.string().optional(),
});

export interface ManageMedicalLogFormProps {
  animal?: Animal;
  medicalLog?: MedicalLog;
  onSubmit: (data: MedicalLog) => void;
}

export const ManageMedicalLogForm: React.FC<ManageMedicalLogFormProps> = ({
  animal,
  medicalLog,
  onSubmit,
}) => {
  const { user } = useContext(GlobalContext);

  const form = useForm<z.infer<typeof medicalLogFormSchema>>({
    resolver: zodResolver(medicalLogFormSchema),
    defaultValues: {
      log_history_id: medicalLog?.log_history_id ?? 0,
      animal_name: animal?.name,
      animal_id: animal?.animal_id ?? medicalLog?.animal_id,
      user_id: user?.user_id,
      type: medicalLog?.type ?? undefined,
      created_date: medicalLog?.created_date
        ? new Date(medicalLog.created_date)
        : new Date(),
      start_date: medicalLog?.start_date
        ? new Date(medicalLog.start_date)
        : new Date(),
      end_date: medicalLog?.end_date
        ? new Date(medicalLog.end_date)
        : undefined,
      description: medicalLog?.description ?? "",
    },
  });

  const formatDate = (date?: Date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{`Medical Log: ${
          medicalLog?.log_history_id ?? "New"
        }`}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="manage-medical-log-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="start_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="log-start-date">Start Date</FieldLabel>
                  <Input
                    id="log-start-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={formatDate(field.value)}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(
                        val ? new Date(val + "T00:00:00") : undefined
                      );
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="end_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="log-end-date">End Date</FieldLabel>
                  <Input
                    id="log-end-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={formatDate(field.value)}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(
                        val ? new Date(val + "T00:00:00") : undefined
                      );
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="log-description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="log-description"
                      placeholder="Describe the medical event, treatment, or notes."
                      rows={6}
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
