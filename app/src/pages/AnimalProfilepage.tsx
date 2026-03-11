import AnimalInventoryCheckout from "@/components/AnimalInventoryCheckoutTable";
import AnimalMedicalLog from "@/components/AnimalMedicalLog";
import AnimalProfile from "@/components/AnimalProfile";
import FosterHistoryTable from "@/components/FosterHistoryTable";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
import { ADMIN_ROLE } from "@/types/types";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export function AnimalProfilePage() {
  const { getAnimal, selectedAnimal, setSelectedAnimal } = useAnimalStore();
  const { fetchAnimalFosterHistory, fosterHistory } = useFosterHistoryStore();
  const { user } = useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    setSelectedAnimal(undefined);
    const animalId = params.id;
    if (!animalId) return;
    getAnimal(Number(animalId));
    fetchAnimalFosterHistory(Number(animalId));
  }, [params]);

  const isActiveFoster = (() => {
    if (!user || !selectedAnimal) return false;
    if (user.role === ADMIN_ROLE) return true; // admins always have full access

    const userRecord = fosterHistory.find(
      (log) => log.user_id === user.user_id
    );
    if (!userRecord) return false;

    const isEndDatePast = userRecord.end_date
      ? new Date(userRecord.end_date) < new Date()
      : false;
    const isAdoptedByOther =
      selectedAnimal.status === "X" && userRecord.user_id !== user.user_id;

    return !isEndDatePast && !isAdoptedByOther;
  })();

  return (
    <div className="flex flex-col gap-2 p-4">
      {selectedAnimal ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimalProfile animal={selectedAnimal} />
            <AnimalMedicalLog
              animal={selectedAnimal}
              isReadOnly={!isActiveFoster}
            />
          </div>
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
