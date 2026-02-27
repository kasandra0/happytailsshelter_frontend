import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Include cookies in requests
});

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}auth/login`,
         { email, password });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

