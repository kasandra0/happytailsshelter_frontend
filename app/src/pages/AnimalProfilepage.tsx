import { getAnimalById } from "@/lib/api";
import { calculateAge } from "@/lib/utils";
import type { Animal } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AnimalProfilePageProps {
}

export function AnimalProfilePage({ }: AnimalProfilePageProps) {
  const [animal, setAnimal] = useState<Animal>();
  const params = useParams();
  const fetchAnimal = async (id: string) => {
    const animalId = parseInt(id, 10);
    if (isNaN(animalId)) {
      console.error("Invalid animal ID:", id);
      return;
    }
    try {
      const fetchedAnimal = await getAnimalById(animalId);
      setAnimal(fetchedAnimal);
    } catch (error) {
      console.error("Error fetching animal:", error);
    }
  };
  useEffect(() => {
    const animalId = params.id;
    if (!animalId) {
      console.error("No animal ID provided in URL parameters.");
      return;
    }

    fetchAnimal(animalId);
    
  }, [params]);
    const dateOfBirth = animal?.date_of_birth ? new Date(animal.date_of_birth) : null;
    return (
      <div className="p-4">
        {animal ? (
          <div>
            <h1 className="text-2xl font-bold">{animal.name}</h1>
            <div className="flex flex-col gap-2 mt-4">
            <p>Breed: {animal.breed}</p>
            <p>DOB: {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Unknown"}</p>
            <p>Age: {dateOfBirth ? calculateAge(dateOfBirth) : "Unknown"}</p>
            <p>Gender: {animal.gender}</p>
            <p>Description: {animal.description}</p>
            <p>Status: {animal.status}</p>
          </div>
          </div>
        ) : (
          <p>Loading animal details...</p>
        )}
      </div>
    );
}