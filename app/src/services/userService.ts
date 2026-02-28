import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Include cookies in requests
});

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`users/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};
