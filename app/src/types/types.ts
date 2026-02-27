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

export type MedicalLog = {
  log_history_id: number;
  animal_id: number;
  type?: number;
  created_date: Date;
  user_id: number;
  description?: string;
  start_date?: Date;
  end_date?: Date;
};
export type FosterHistory = {
  foster_history_id: number;
  animal_id: number;
  user_id: number;
  animal: Animal;
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
}
