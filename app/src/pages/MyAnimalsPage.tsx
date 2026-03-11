import AnimalProfile from "@/components/AnimalProfile";
import type { ANIMAL_STATUS } from "@/constants";
import { GlobalContext } from "@/hooks/GlobalContext";
import { useAnimalStore } from "@/store/animals/animalStore";
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore";
import { useContext, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";

interface MyAnimalsPageProps { }

const MyAnimalsPage: FC<MyAnimalsPageProps> = () => {
  const { fetchAnimals, loading: animalsLoading } = useAnimalStore();
  const {
    fosterHistory,
    fetchUserFosterHistory,
    loading: fosterHistoryLoading,
  } = useFosterHistoryStore();
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimals();
    if (user) {
      fetchUserFosterHistory(user.user_id);
    }
  }, [user]);

  const now = new Date();

  const activeFosterHistory = fosterHistory.filter((log) => {
    const isEndDatePast = log.end_date && new Date(log.end_date) < now;
    const isAdopted = log.animal?.status === ("X" satisfies ANIMAL_STATUS);
    const isAdoptedByOther = isAdopted && log.user_id !== user?.user_id;
    return !isEndDatePast && !isAdoptedByOther;
  });


  const pastFosterHistory = fosterHistory.filter((log) => {
    const isEndDatePast = log.end_date && new Date(log.end_date) < now;
    const isAdopted = log.animal?.status === ("X" satisfies ANIMAL_STATUS);
    const isAdoptedByOther = isAdopted && log.user_id !== user?.user_id;
    return isEndDatePast || isAdoptedByOther;
  });

  const handleAnimalClick = (animalId?: number) => {
    if (animalId) {
      navigate(`/fosterparent/animals/${animalId}`);
    }
  };

  if (animalsLoading || fosterHistoryLoading) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {fosterHistory.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          You currently have no animals assigned to you.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {activeFosterHistory.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Currently Fostering</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeFosterHistory.map((log) => (
                  <div
                    key={log.foster_history_id}
                    onClick={() => handleAnimalClick(log.animal?.animal_id)}
                    className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] flex flex-col h-full"
                  >
                    <AnimalProfile animal={log.animal} layout="vertical" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastFosterHistory.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-500">
                Previously Fostered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastFosterHistory.map((log) => (
                  <div
                    key={log.foster_history_id}
                    onClick={() => handleAnimalClick(log.animal?.animal_id)}
                    className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] flex flex-col h-full"
                  >
                    <AnimalProfile animal={log.animal} isPast={true} layout="vertical" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAnimalsPage;
