// src/types/types.ts 
export type Animal = {
  animal_id: number;
  microchip: string;
  name: string;
  date_of_birth?: Date;
  gender?: string;
  color?: string;
  breed?: string;
  species: string;
  weight?: number;
  status?: string;
  description?: string;
  photo_url?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type User = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
};