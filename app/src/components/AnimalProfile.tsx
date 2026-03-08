import { type FC } from "react";
import { type Animal } from "@/types/types";
import { calculateAge } from "@/lib/utils";
import { Camera } from "lucide-react";

import { STATUS_LABELS, STATUS_STYLES } from "@/constants";

export interface AnimalProfileProps {
  animal: Animal;
  isPast?: boolean;
}

const AnimalProfile: FC<AnimalProfileProps> = ({ animal, isPast = false }) => {
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

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden ${
          isPast ? "opacity-60 grayscale" : ""
        }`}
      >
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

            {isPast && (
              <div className="mt-2">
                <span className="text-xs text-gray-400 italic">
                  This animal is no longer in your care
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfile;
