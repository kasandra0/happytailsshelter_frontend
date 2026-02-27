import AnimalListingComponent from "@/components/animal-listing/animalListingComponent";
import { useAnimalStore } from "@/store/animals/animalStore";
import { userFosterHistoryStore } from "@/store/animals/fosterhistory/fosterHistoryStore";
import type { Animal } from "@/types/types";
import { useEffect, type FC, type Key } from "react";

interface MyAnimalsPageProps {}

const MyAnimalsPage: FC<MyAnimalsPageProps> = () => {
  const { fetchAnimals } = useAnimalStore();
  const { fosterHistory, fetchUserFosterHistory } = userFosterHistoryStore();
  useEffect(() => {
    fetchAnimals();
    
    fetchUserFosterHistory(1);
  }, []);

  return (
    <div>
      <h1>My Animals</h1>
      {fosterHistory.map((fosterHistoryLog: { animal_id: Key | null | undefined; animal: Animal | undefined; }) => {
        return (
        <div key={fosterHistoryLog.animal_id}>
          <AnimalListingComponent animal={fosterHistoryLog.animal} />
          {fosterHistoryLog.animal && <h2>{fosterHistoryLog.animal.name}</h2>}
        </div>
      )}
      )}
    </div>
  );
};

export default MyAnimalsPage;
