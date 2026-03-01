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

export type InventoryItem = {
  inventory_item_id: number;
  name: string;
  type?: string;
  quantity?: number;
  cost?: string;
  lastupdated?: Date;
};

export type User = {
  userId: number;
  email: string;
  name?: string;
  firstName: string;
  lastName: string;
  role: number; // 2 - admin, 1 - foster parent
};
export const ADMIN_ROLE = 2;
export const FOSTER_PARENT_ROLE = 1;


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
