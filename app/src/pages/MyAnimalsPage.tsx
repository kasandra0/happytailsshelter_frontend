import AnimalListingComponent from "@/components/animal-listing/animalListingComponent";
import { useAnimalStore } from "@/store/animals/animalStore";
import { userFosterHistoryStore } from "@/store/animals/fosterhistory/fosterHistoryStore";
import type { Animal } from "@/types/types";
import { useEffect, useState, type FC } from "react";

interface MyAnimalsPageProps {}

const MyAnimalsPage: FC<MyAnimalsPageProps> = () => {
  const { fetchAnimals, animals } = useAnimalStore();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const { fosterHistory, fetchUserFosterHistory } = userFosterHistoryStore();
  useEffect(() => {
    fetchAnimals();
    
    fetchUserFosterHistory(1);
  }, []);

  return (
    <div>
      <h1>My Animals</h1>
      {fosterHistory.map((fosterHistoryLog) => {
        return (
        <div key={fosterHistoryLog.animal_id}>
          <AnimalListingComponent animal={fosterHistoryLog.animal} />
          <h2>{fosterHistoryLog.animal.name}</h2>
        </div>
      )}
      )}
    </div>
  );
};

export default MyAnimalsPage;
