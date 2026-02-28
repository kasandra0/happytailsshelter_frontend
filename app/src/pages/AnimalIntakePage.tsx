import { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { ManageAnimalForm } from "@/components/form/manageAnimalForm";
import { useAnimalStore } from "@/store/animals/animalStore";
import type { Animal } from "@/types/types";


export default function AnimalIntakePage() {
  const navigate = useNavigate();
  const { createAnimal } = useAnimalStore();

  const handleSubmit = async (animal: Animal) => {
    const { animal_id, ...newAnimal } = animal;
    await createAnimal(newAnimal);
    navigate("/animals"); 
  };


  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Animal Intake</h2>
          <p className="text-sm text-muted-foreground">
            Add a new animal to the shelter database.
          </p>
        </div>

        <Button asChild variant="outline">
          <NavLink to="/animals">Back to Listing</NavLink>
        </Button>
      </div>

      <div className="container mx-auto py-10">
        <div className="rounded-md border p-6">
          <h3 className="text-lg font-semibold mb-6">Intake Form</h3>

          <form id="manage-animal-form" onSubmit={(e) => e.preventDefault()}>
            <ManageAnimalForm animal={null} onSubmit={handleSubmit} />
            
            <div className="mt-6">
              <Button type="submit" form="manage-animal-form">
                Add New Animal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}