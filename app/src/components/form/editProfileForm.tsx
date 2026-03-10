import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { User } from "@/types/types";
import { Card, CardContent } from "../ui/card";

const editProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

interface EditProfileFormProps {
  user: User;
  onSubmit: (data: EditProfileFormValues) => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSubmit }) => {
  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number ?? "",
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
    <form id="edit-profile-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-first-name">First Name</FieldLabel>
              <Input
                {...field}
                id="profile-first-name"
                aria-invalid={fieldState.invalid}
                autoComplete="given-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="last_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-last-name">Last Name</FieldLabel>
              <Input
                {...field}
                id="profile-last-name"
                aria-invalid={fieldState.invalid}
                autoComplete="family-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-email">Email</FieldLabel>
              <Input
                {...field}
                id="profile-email"
                type="email"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone_number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-phone">Phone Number</FieldLabel>
              <Input
                {...field}
                id="profile-phone"
                type="tel"
                aria-invalid={fieldState.invalid}
                autoComplete="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
    </CardContent>
    </Card>
  );
};
