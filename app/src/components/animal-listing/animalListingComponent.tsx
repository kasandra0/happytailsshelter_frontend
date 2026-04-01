import type { Animal, MedicalLog } from "@/types/types";
import CardComponent from "../card/cardComponent";
import { useState, type FC } from "react";
import { useMedicalLogStore } from "@/store/medicalLog/medicalLogStore";
import { ManageMedicalLogForm } from "../form/manageMedicalLogForm";
import { Modal } from "../modal/modal";

export interface AnimalListingComponentProps {
  animal?: Animal;
}

const AnimalListingComponent: FC<AnimalListingComponentProps> = ({
  animal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const { createMedicalLog } = useMedicalLogStore();

  const handleCreateMedicalLog = () => {
    setModalTitle("Create Medical Log Entry");
    setModalOpen(true);
  };

  const handleSubmit = async (medicalLog: MedicalLog) => {
    await createMedicalLog(animal!.animal_id, medicalLog);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex w-full h-full  min-h-[400px]">
        {animal && (
          <CardComponent
            key={animal.animal_id}
            title={animal.name}
            image={animal.photo_url}
            tag={animal.status == "A" ? "Available" : "Adopted"}
            description={animal.description ?? ""}
            buttonText="Add Medical Log Entry"
            click={handleCreateMedicalLog}
          />
        )}
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        component={
          <ManageMedicalLogForm animal={animal} onSubmit={handleSubmit} />
        }
        onCancel={handleCancel}
        form="manage-medical-log-form"
      />
    </>
  );
};
export default AnimalListingComponent;
