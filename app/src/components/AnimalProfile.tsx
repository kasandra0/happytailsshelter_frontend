import { type FC } from "react";
import { type Animal, type MedicalLog } from "@/types/types";
import { calculateAge } from "@/lib/utils";
import { Camera } from "lucide-react";

import { STATUS_LABELS, STATUS_STYLES } from "@/constants";

export interface AnimalProfileProps {
  animal: Animal;
  medicalLog?: MedicalLog;
  isPast?: boolean;
  layout?: "horizontal" | "vertical";
}

const AnimalProfile: FC<AnimalProfileProps> = ({ animal, medicalLog, isPast = false, layout = "horizontal" }) => {
  const ageData = animal.date_of_birth
    ? calculateAge(animal.date_of_birth)
    : null;
  const statusLabel = isPast
    ? "Previously Fostered"
    : animal.status
      ? STATUS_LABELS[animal.status] ?? animal.status
      : "Unknown";
  const statusStyle = isPast
    ? "bg-gray-100 text-gray-500"
    : animal.status
      ? STATUS_STYLES[animal.status] ?? "bg-gray-100 text-gray-600"
      : "bg-gray-100 text-gray-600";

  const photo = animal.photo_url;


  const isVertical = layout === "vertical";

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden flex h-full ${isPast ? "opacity-60 grayscale" : ""
        } ${isVertical ? "flex-col" : "flex-col md:flex-row"}`}
    >
      <div
        className={`shrink-0 ${isVertical ? "w-full h-48 sm:h-64 md:h-72" : "w-full h-64 md:h-auto md:w-64"
          }`}
      >
        {photo ? (
          <img
            className="w-full h-full object-cover"
            src={photo}
            alt={`Photo of ${animal.name}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500">
            <Camera className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium">No image available</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6 w-full grow bg-white">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{animal.name}</h1>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap ${statusStyle}`}
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
            <p className="font-medium text-gray-500">Age</p>
            <p className="text-gray-900">
              {ageData !== null ? ageData.display : "Unknown"}
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
            <p className="text-gray-700 text-sm mt-1">
              {animal.description}
            </p>
          </div>
        )}

        {medicalLog && (
          <div>
            <p className="font-medium text-gray-500 text-sm">Medical Log</p>
            <p className="text-sm mt-1">
              <strong>{medicalLog.created_date ? new Date(medicalLog.created_date).toLocaleString() : ""}</strong>
            </p>
            <p className="text-gray-700 text-sm mt-1 break-words">
              {medicalLog.description}
            </p>
          </div>
        )}

        {isPast && (
          <div className="mt-2 text-center mt-auto">
            <span className="text-xs text-gray-400 italic">
              This animal is no longer in your care
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalProfile;
