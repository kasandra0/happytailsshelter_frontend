import type { Animal } from "@/types/types";

const BASE_URL = 'http://localhost:3000/api/';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    // console.log(`Making API request to: ${url} with options:`, options);
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

export const getAnimalById = async (id: number) => {
  try {
    const response = await api.get<{ data: Animal }>(`animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching animal with id ${id}:`, error);
    throw error;
  }
};