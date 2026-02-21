import type { Animal } from "@/types/animal";
import CardComponent from "../card/cardComponent";
import puppy1 from "../../assets/puppy1.jpeg";
import kitty from "../../assets/kitty.jpeg";
import puppy2 from "../../assets/puppy2.jpeg";

const data: Animal[] = [
  {
    animal_id: 1,
    microchip: "100000000000001",
    name: "Buddy",
    date_of_birth: new Date("2019-03-15"),
    gender: "M",
    color: "Golden",
    breed: "Golden Retriever",
    species: "Dog",
    weight: 28.5,
    status: "A",
    description: "Friendly and energetic dog who loves to fetch.",
    photo_url: puppy1,
    created_at: new Date("2026-02-18 02:06:06.877472"),
    updated_at: new Date("2026-02-18 02:06:06.877472"),
  },
  {
    animal_id: 2,
    microchip: "100000000000002",
    name: "Luna",
    date_of_birth: new Date("2020-07-22"),
    gender: "F",
    color: "Black",
    breed: "Domestic Shorthair",
    species: "Cat",
    weight: 4.2,
    status: "A",
    description: "Calm indoor cat who enjoys sunbathing.",
    photo_url: kitty,
    created_at: new Date("2026-02-18 02:06:06.877472"),
    updated_at: new Date("2026-02-18 02:06:06.877472"),
  },
  {
    animal_id: 3,
    microchip: "100000000000003",
    name: "Max",
    date_of_birth: new Date("2018-11-05"),
    gender: "M",
    color: "Brindle",
    breed: "Boxer",
    species: "Dog",
    weight: 32.1,
    status: "F",
    description: "Playful and loyal companion good with kids.",
    photo_url: puppy2,
    created_at: new Date("2026-02-18 02:06:06.877472"),
    updated_at: new Date("2026-02-18 02:06:06.877472"),
  },
  {
    animal_id: 4,
    microchip: "100000000000002",
    name: "Bow tie",
    date_of_birth: new Date("2019-03-15"),
    gender: "M",
    color: "Golden",
    breed: "Golden Retriever",
    species: "Dog",
    weight: 28.5,
    status: "A",
    description: "Friendly and energetic dog who loves to fetch.",
    photo_url: puppy1,
    created_at: new Date("2026-02-18 02:06:06.877472"),
    updated_at: new Date("2026-02-18 02:06:06.877472"),
  },
  {
    animal_id: 5,
    microchip: "100000000000004",
    name: "Spider",
    date_of_birth: new Date("2020-07-22"),
    gender: "M",
    color: "Black",
    breed: "Domestic Shorthair",
    species: "Cat",
    weight: 4.2,
    status: "A",
    description: "Energetic playful rascal",
    photo_url: kitty,
    created_at: new Date("2026-02-18 02:06:06.877472"),
    updated_at: new Date("2026-02-18 02:06:06.877472"),
  },
  {
    animal_id: 6,
    microchip: "100000000000006",
    name: "Max",
    date_of_birth: new Date("2018-11-05"),
    gender: "M",
    color: "Brindle",
    breed: "Boxer",
    species: "Dog",
    weight: 32.1,
    status: "F",
    description: "Playful and loyal companion good with kids.",
    photo_url: puppy2,
    created_at: new Date("2026-02-18 02:06:06.877472"),
    updated_at: new Date("2026-02-18 02:06:06.877472"),
  },
];

export default function AnimalListingComponent() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {data.map((animal) => (
          <CardComponent
            key={animal.animal_id}
            title={animal.name}
            image={animal.photo_url ?? ""}
            tag={animal.status == "A" ? "Available" : "Adopted"}
            description={animal.description ?? ""}
            buttonText="Adopt me"
            click={
              animal.status === "A" ? () => console.log("click") : undefined
            }
          />
        ))}
      </div>
    </>
  );
}
