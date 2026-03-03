import { useState, type FC } from "react";
import type { Animal, MedicalLog } from "@/types/types";
import { calculateAge } from "@/lib/utils";
import { Camera } from "lucide-react";
import { useMedicalLogStore } from "@/store/medicalLog/medicalLogStore";
import { Button } from "./ui/button";
import { ManageMedicalLogForm } from "./form/manageMedicalLogForm";
import { Modal } from "./modal/modal";

export interface AnimalProfileProps {
  animal: Animal;
}

const STATUS_LABELS: Record<string, string> = {
  A: "Available",
  X: "Adopted",
  F: "Fostered",
};

const STATUS_STYLES: Record<string, string> = {
  A: "bg-yellow-100 text-yellow-800",
  X: "bg-gray-100 text-gray-600",
  F: "bg-purple-100 text-purple-800",
};

const AnimalProfile: FC<AnimalProfileProps> = ({ animal }) => {
  const dateOfBirth = animal.date_of_birth
    ? new Date(animal.date_of_birth)
    : null;
  const age = dateOfBirth ? calculateAge(dateOfBirth) : null;
  const statusLabel = animal.status
    ? STATUS_LABELS[animal.status] ?? animal.status
    : "Unknown";
  const statusStyle = animal.status
    ? STATUS_STYLES[animal.status] ?? "bg-gray-100 text-gray-600"
    : "bg-gray-100 text-gray-600";
  const photo = animal.photo_url;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const { createMedicalLog } = useMedicalLogStore();

  const handleCreateMedicalLog = () => {
    setModalTitle("Create Medical Log Entry");
    setModalOpen(true);
  };

  const handleSubmit = async (medicalLog: MedicalLog) => {
    await createMedicalLog(medicalLog);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0">
          {photo ? (
            <img
              className="h-64 w-full object-cover md:h-full md:w-64"
              src={photo}
              alt={`Photo of ${animal.name}`}
            />
          ) : (
            <div className="h-64 w-full bg-gray-200 flex flex-col items-center justify-center text-gray-500 md:h-full md:w-64">
              <Camera className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 p-6 w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{animal.name}</h1>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${statusStyle}`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <p className="font-medium text-gray-500">Species</p>
              <p className="text-gray-900">{animal.species}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Breed</p>
              <p className="text-gray-900">{animal.breed ?? "Unknown"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Date of Birth</p>
              <p className="text-gray-900">
                {dateOfBirth ? dateOfBirth.toLocaleDateString() : "Unknown"}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Age</p>
              <p className="text-gray-900">
                {age !== null
                  ? age === 0
                    ? "< 1 year"
                    : `${age} year${age !== 1 ? "s" : ""}`
                  : "Unknown"}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Gender</p>
              <p className="text-gray-900">{animal.gender ?? "Unknown"}</p>
            </div>
          </div>

          {animal.description && (
            <div>
              <p className="font-medium text-gray-500 text-sm">Description</p>
              <p className="text-gray-700 text-sm mt-1">{animal.description}</p>
            </div>
          )}

          <div className="px-6 pt-4 pb-2 flex justify-end">
            <Button onClick={handleCreateMedicalLog}>
              Add Medical Log Entry
            </Button>
          </div>
        </div>
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
    </div>
  );
};

export default AnimalProfile;
