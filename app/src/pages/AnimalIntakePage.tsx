import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { useAnimalStore } from "@/store/animals/animalStore";
import type { Animal } from "@/types/types";

const animalFormSchema = z.object({
  animal_id: z.number().int().readonly(),
  microchip: z.string().min(1, "Microchip is required"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name must be at most 64 characters"),
  date_of_birth: z.date(),
  gender: z.string().max(1, "Must be M or F"),
  color: z.string().optional(),
  breed: z.string().optional(),
  species: z.string().min(1, "Species is required"),
  weight: z.number().positive("Weight must be a positive number").optional(),
  status: z.string().refine((val) => ["A", "X", "F"].includes(val), {
    message: "Invalid status",
  }),
  description: z.string().optional(),
});

type AnimalFormValues = z.infer<typeof animalFormSchema>;

export default function AnimalIntakePage() {
  const navigate = useNavigate();
  const { createAnimal } = useAnimalStore();

  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      animal_id: 0,
      microchip: "",
      name: "",
      date_of_birth: new Date(),
      gender: "",
      color: "",
      breed: "",
      species: "",
      weight: undefined,
      status: "A",
      description: "",
    },
  });

  const onSubmit = async (data: AnimalFormValues) => {
    try {
      await createAnimal(data as Animal);
      navigate("/animals");
    } catch (error) {
      console.error("Failed to create animal:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Adoption Intake Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="create-animal-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                      placeholder="e.g. M, F"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="weight"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="animal-weight">Weight</FieldLabel>
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

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Create Animal
                </Button>
              </div>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}