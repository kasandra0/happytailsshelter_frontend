import AnimalListingComponent from "@/components/animal-listing/animalListingComponent";
import { useAnimalStore } from "@/store/animals/animalStore";
import { userFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
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
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-center font-bold">My Animals</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fosterHistory.map(
          (fosterHistoryLog: {
            animal_id: Key | null | undefined;
            animal: Animal | undefined;
          }) => {
            return (
              <div key={fosterHistoryLog.animal_id}>
                <AnimalListingComponent animal={fosterHistoryLog.animal} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default MyAnimalsPage;
