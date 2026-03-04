import AnimalProfile from "@/components/AnimalProfile";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface AnimalProfilePageProps {}

export function AnimalProfilePage({}: AnimalProfilePageProps) {
  const { getAnimal, selectedAnimal } = useAnimalStore();
  const params = useParams();

  useEffect(() => {
    const animalId = params.id;

    if (!animalId) {
      return;
    }

    getAnimal(Number(animalId));
  }, [params]);
  return (
    <div className="p-4">
      {selectedAnimal ? (
        <AnimalProfile animal={selectedAnimal} />
      ) : (
        <p>Loading animal details...</p>
      )}
    </div>
  );
}
