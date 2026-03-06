// src/types/types.ts
export type Animal = {
  animal_id: number;
  microchip: string;
  name: string;
  date_of_birth?: string;
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

export type InventoryCheckout = {
  checkout_id: number;
  animal_id: number;
  checkout_date: Date;
  return_date: Date;
  quantity: number;
  inventory_item_id: number;
  user_id: number;
  inventory_item?: InventoryItem;
  user?: User;
};

export type User = {
  user_id: number;
  email: string;
  name?: string;
  first_name: string;
  last_name: string;
  role: number; // 2 - admin, 1 - foster parent
  phone_number: string;
  status: string;
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
  animal?: Animal;
  user?: User;
};
export type FosterHistory = {
  foster_history_id: number;
  animal_id: number;
  user_id: number;
  animal: Animal;
  microchip: string;
  name: string;
  date_of_birth?: string;
  gender?: string;
  color?: string;
  breed?: string;
  species: string;
  weight?: number;
  status?: string;
  description?: string;
  photo_url?: string;
  start_date?: Date;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
  user_foster_history_user_idTouser?: User;
  user_foster_history_staff_idTouser?: User;
};
