import { calculateAge } from "@/lib/utils";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AnimalProfilePageProps {}

export function AnimalProfilePage({}: AnimalProfilePageProps) {
  const { getAnimal, selectedAnimal } = useAnimalStore();
  const params = useParams();

  useEffect(() => {
    const animalId = params.id;

    if (!animalId) {
      console.error("No animal ID provided in URL parameters.");
      return;
    }

    getAnimal(Number(animalId));
  }, [params]);
  const dateOfBirth = selectedAnimal?.date_of_birth
    ? new Date(selectedAnimal.date_of_birth)
    : null;
  return (
    <div className="p-4">
      {selectedAnimal ? (
        <div>
          <h1 className="text-2xl font-bold">{selectedAnimal?.name}</h1>
          <div className="flex flex-col gap-2 mt-4">
            <p>Breed: {selectedAnimal?.breed}</p>
            <p>
              DOB: {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Unknown"}
            </p>
            <p>Age: {dateOfBirth ? calculateAge(dateOfBirth) : "Unknown"}</p>
            <p>Gender: {selectedAnimal?.gender}</p>
            <p>Description: {selectedAnimal?.description}</p>
            <p>Status: {selectedAnimal?.status}</p>
          </div>
        </div>
      ) : (
        <p>Loading animal details...</p>
      )}
    </div>
  );
}
