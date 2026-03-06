import { axiosInstance } from "@/services/authService";
import type { User } from "@/types/types";

function mapUser(raw: any): User {
  return {
    user_id: Number(raw.user_id),
    email: raw.email,
    first_name: raw.first_name,
    last_name: raw.last_name,
    role: Number(raw.role),
    status: raw.status,
    phone_number: raw.phone_number,
  };
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return mapUser(response.data.data);
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  data: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
  }
): Promise<User> => {
  const response = await axiosInstance.put<{ data: any }>(`users/${id}`, data);
  return mapUser(response.data.data);
};
