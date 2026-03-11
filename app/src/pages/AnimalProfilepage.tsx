import AnimalInventoryCheckout from "@/components/AnimalInventoryCheckoutTable";
import AnimalMedicalLog from "@/components/AnimalMedicalLog";
import AnimalProfile from "@/components/AnimalProfile";
import FosterHistoryTable from "@/components/FosterHistoryTable";
import { ManageAnimalForm } from "@/components/form/manageAnimalForm";
import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
import type { Animal } from "@/types/types";
import { ADMIN_ROLE } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AnimalProfilePage() {
  const { getAnimal, selectedAnimal, setSelectedAnimal, updateAnimal } = useAnimalStore();
  const [editOpen, setEditOpen] = useState(false);
  const { fetchAnimalFosterHistory, fosterHistory } = useFosterHistoryStore();
  const { user } = useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    setSelectedAnimal(undefined);
    const animalId = params.id;
    if (!animalId) return;
    getAnimal(Number(animalId));
    fetchAnimalFosterHistory(Number(animalId));
  }, [params.id]);

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
        {user?.role === ADMIN_ROLE && (
          <div className="flex justify-end">
            <Button onClick={() => setEditOpen(true)}>Edit Profile</Button>
          </div>
        )}
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
          <Modal
            open={editOpen}
            onOpenChange={setEditOpen}
            title="Edit Profile"
            component={
              <ManageAnimalForm
                animal={selectedAnimal}
                onSubmit={async (data: Animal) => {
                  await updateAnimal(data);
                  await getAnimal(selectedAnimal.animal_id);
                  setEditOpen(false);
                }}
              />
            }
            onCancel={() => setEditOpen(false)}
            form="manage-animal-form"
          />
        </>
      ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
      )}
    </div>
  );
}
