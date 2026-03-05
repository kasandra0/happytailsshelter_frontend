import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL + "api/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Include cookies in requests
});

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token")
  } catch (error) {
    throw error;
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post(`auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
