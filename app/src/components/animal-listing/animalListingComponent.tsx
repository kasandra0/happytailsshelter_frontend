import type { Animal } from "@/types/types";
import CardComponent from "../card/cardComponent";
import puppy1 from "../../assets/puppy1.jpeg";
import kitty from "../../assets/kitty.jpeg";
import puppy2 from "../../assets/puppy2.jpeg";
import type { FC } from "react";

export interface AnimalListingComponentProps {
  animal?: Animal;
}

const AnimalListingComponent: FC<AnimalListingComponentProps> = ({
  animal,
}) => {

  return (
    <>
      <div className="flex w-full h-full">
        {animal && (
          <CardComponent
            key={animal.animal_id}
            title={animal.name}
            image={animal.photo_url}
            tag={animal.status == "A" ? "Available" : "Adopted"}
            description={animal.description ?? ""}
            buttonText="Adopt me"
            click={
              animal.status === "A" ? () => console.log("click") : undefined
            }
          />
        )}
      </div>
    </>
  );
};
export default AnimalListingComponent;
