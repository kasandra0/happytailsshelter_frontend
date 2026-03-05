import AnimalInventoryCheckout from "@/components/AnimalInventoryCheckoutTable";
import AnimalProfile from "@/components/AnimalProfile";
import FosterHistoryTable from "@/components/FosterHistoryTable";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useAnimalStore } from "@/store/animals/animalStore";
import { ADMIN_ROLE } from "@/types/types";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

interface AnimalProfilePageProps {}

export function AnimalProfilePage({}: AnimalProfilePageProps) {
  const { getAnimal, selectedAnimal } = useAnimalStore();
  const { user, isLoading } = useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    const animalId = params.id;

    if (!animalId) {
      console.error("No animal ID provided in URL parameters.");
      return;
    }

    getAnimal(Number(animalId));
  }, [params]);
  return (
    <div className="flex flex-col gap-2 p-4">
      {selectedAnimal ? (
        <>
          <AnimalProfile animal={selectedAnimal} />
          {user?.role === ADMIN_ROLE && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FosterHistoryTable animal={selectedAnimal} />
              <AnimalInventoryCheckout animal={selectedAnimal} />
            </div>
          )}
        </>
      ) : (
        <p>Loading animal details...</p>
      )}
    </div>
  );
}
