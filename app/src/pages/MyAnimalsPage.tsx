import AnimalListingComponent from "@/components/animal-listing/animalListingComponent";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
import type { Animal } from "@/types/types";
import { useContext, useEffect, type FC, type Key } from "react";
import { useNavigate } from "react-router-dom";

interface MyAnimalsPageProps {}

const MyAnimalsPage: FC<MyAnimalsPageProps> = () => {
  const { fetchAnimals } = useAnimalStore();
  const { fosterHistory, fetchUserFosterHistory } = useFosterHistoryStore();
  const { user, isLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimals();
    if (user) {
      fetchUserFosterHistory(user.userId);
    }
  }, [user]);

  const handleAnimalClick = (animalId?: number) => {
    if (animalId) {
      navigate(`/fosterparent/animals/${animalId}`);
    }
  };

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
              <div
                key={fosterHistoryLog.animal_id}
                onClick={() =>
                  handleAnimalClick(fosterHistoryLog.animal?.animal_id)
                }
                className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
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
