"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import type { Animal } from "@/types/animal";

export const animalFormSchema = z.object({
  animal_id: z.number().int().readonly(),
  microchip: z.string().min(1, "Microchip is required"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name must be at most 64 characters"),
  date_of_birth: z.date(),
  gender: z.string().optional(),
  color: z.string().optional(),
  breed: z.string().optional(),
  species: z.string().min(1, "Species is required"),
  weight: z.number().positive("Weight must be a positive number").optional(),
  status: z.string().optional(),
  description: z.string().optional(),
});

export interface ManageAnimalFormInputs {
  animal?: Animal;
}

export const ManageAnimalForm: React.FC<ManageAnimalFormInputs> = ({
  animal,
}) => {
  const form = useForm<z.infer<typeof animalFormSchema>>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      animal_id: animal?.animal_id ?? 0,
      microchip: animal?.microchip ?? "",
      name: animal?.name ?? "",
      date_of_birth: animal?.date_of_birth ?? new Date(),
      gender: animal?.gender,
      color: animal?.color,
      breed: animal?.breed,
      species: animal?.species,
      weight: animal?.weight,
      status: animal?.species ?? "",
      description: animal?.description ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof animalFormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{animal?.animal_id}</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="manage-animal-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="animal-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Buddy"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Microchip */}
            <Controller
              name="microchip"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-microchip">Microchip</FieldLabel>
                  <Input
                    {...field}
                    id="animal-microchip"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 985112345678903"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Species */}
            <Controller
              name="species"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-species">Species</FieldLabel>
                  <Input
                    {...field}
                    id="animal-species"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Dog, Cat"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Breed */}
            <Controller
              name="breed"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-breed">Breed</FieldLabel>
                  <Input
                    {...field}
                    id="animal-breed"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Labrador"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Gender */}
            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-gender">Gender</FieldLabel>
                  <Input
                    {...field}
                    id="animal-gender"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Male, Female"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Color */}
            <Controller
              name="color"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-color">Color</FieldLabel>
                  <Input
                    {...field}
                    id="animal-color"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Brown, Black"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Weight */}
            <Controller
              name="weight"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-weight">Weight (kg)</FieldLabel>
                  <Input
                    {...field}
                    id="animal-weight"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 12.5"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Date of Birth */}
            <Controller
              name="date_of_birth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="animal-dob">Date of Birth</FieldLabel>
                  <Input
                    id="animal-dob"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.valueAsDate)}
                  />
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
                  <FieldLabel htmlFor="animal-status">Status</FieldLabel>
                  <Input
                    {...field}
                    id="animal-status"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Available, Adopted"
                    autoComplete="off"
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
                  <FieldLabel htmlFor="animal-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="animal-description"
                      placeholder="Describe the animal's personality, history, or any special needs."
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
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
