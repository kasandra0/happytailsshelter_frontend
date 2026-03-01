import axios from "axios";
import type { User } from "@/types/types";

const BASE_URL = 'http://localhost:3000/api/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Include cookies in requests
});

export const getCurrentUser = async (): Promise<User> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`users/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        const raw = response.data.data;
        return {
            userId: Number(raw.user_id),
            email: raw.email,
            firstName: raw.first_name,
            lastName: raw.last_name,
            role: Number(raw.role),
        };
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};
