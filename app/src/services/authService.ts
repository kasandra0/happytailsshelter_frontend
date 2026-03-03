import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    alert("Logout functionality not implemented yet.");
  } catch (error) {
    console.error("Logout error:", error);
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
    const response = await axiosInstance.post(`api/auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
