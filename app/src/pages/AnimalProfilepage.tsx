import AnimalProfile from "@/components/AnimalProfile";
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
    return (
      <div className="p-4">
        {animal ? (
          <AnimalProfile animal={animal}/>
        ) : (
          <p>Loading animal details...</p>
        )}
      </div>
    );
}