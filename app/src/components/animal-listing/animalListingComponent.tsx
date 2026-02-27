import type { Animal } from "@/types/types";
import CardComponent from "../card/cardComponent";
import puppy1 from "../../assets/puppy1.jpeg";
import kitty from "../../assets/kitty.jpeg";
import puppy2 from "../../assets/puppy2.jpeg";
import type { FC } from "react";

export interface AnimalListingComponentProps{
  animal?: Animal;
};

const AnimalListingComponent: FC<AnimalListingComponentProps> = ({ animal }) => {
  const getAnimalPhoto = (index: number) => {
    return index%3 === 0 ? puppy1
      : index%3 === 1
        ? kitty
        : puppy2;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {animal &&
          <CardComponent
            key={animal.animal_id}
            title={animal.name}
            image={getAnimalPhoto(0)}
            tag={animal.status == "A" ? "Available" : "Adopted"}
            description={animal.description ?? ""}
            buttonText="Adopt me"
            click={
              animal.status === "A" ? () => console.log("click") : undefined
            }
          />
}
      </div>
    </>
  );
}
export default AnimalListingComponent;