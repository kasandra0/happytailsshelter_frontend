import { axiosInstance } from "@/services/authService";
import type { MedicalLog } from "@/types/types";
import { create } from "zustand";

interface MedicalLogState {
  medicalLogs: MedicalLog[];
  selectedMedicalLog: MedicalLog | undefined;
  loading: boolean;
  error: string | null;

  fetchMedicalLogsForAnimal: (animalId: number) => Promise<void>;
  createMedicalLog: (
    animalId: number,
    medicalLog: Omit<MedicalLog, "log_history_id">
  ) => Promise<void>;
  updateMedicalLog: (medicalLog: MedicalLog) => Promise<void>;
  deleteMedicalLog: (log_history_id: number) => Promise<void>;
  setSelectedMedicalLog: (medicalLog: MedicalLog | undefined) => void;
}

export const useMedicalLogStore = create<MedicalLogState>((set) => ({
  medicalLogs: [],
  selectedMedicalLog: undefined,
  loading: false,
  error: null,

  fetchMedicalLogsForAnimal: async (animalId) => {
    set({ loading: true, error: null });
    try {
      const response = (
        await axiosInstance.get<{ data: MedicalLog[] }>(
          `animals/${animalId}/medical-logs`
        )
      ).data;
      set({ medicalLogs: response.data });
    } catch (error) {
      set({ error: "Failed to fetch medical logs" });
    } finally {
      set({ loading: false });
    }
  },

  createMedicalLog: async (animalId, medicalLog) => {
    set({ loading: true, error: null });
    try {
      medicalLog.created_date = new Date()
      const { animal, user, ...payload } = medicalLog as any;

      await axiosInstance.post<{ data: MedicalLog }>(
        `animals/${animalId}/medical-logs`,
        payload
      );

      // refetch to get joined user/animal data
      const updated = (
        await axiosInstance.get<{ data: MedicalLog[] }>(
          `animals/${animalId}/medical-logs`
        )
      ).data;
      set({ medicalLogs: updated.data });
    } catch (error) {
      set({ error: "Failed to create medical log" });
    } finally {
      set({ loading: false });
    }
  },

  updateMedicalLog: async (medicalLog) => {
    set({ loading: true, error: null });
    try {
      const { animal, user, log_history_id, ...payload } = medicalLog as any;
      await axiosInstance.put<{ data: MedicalLog }>(
        `medical-log/${medicalLog.log_history_id}`,
        payload
      );
      // refetch to get joined user/animal data
      const updated = (
        await axiosInstance.get<{ data: MedicalLog[] }>(
          `animals/${medicalLog.animal_id}/medical-logs`
        )
      ).data;
      set({ medicalLogs: updated.data });
    } catch (error) {
      set({ error: "Failed to update medical log" });
    } finally {
      set({ loading: false });
    }
  },

  deleteMedicalLog: async (log_history_id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`medical-log/${log_history_id}`);
      set((state) => ({
        medicalLogs: state.medicalLogs.filter(
          (ml) => ml.log_history_id !== log_history_id
        ),
      }));
    } catch (error) {
      set({ error: "Failed to delete medical log" });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedMedicalLog: (medicalLog) =>
    set({ selectedMedicalLog: medicalLog }),
}));
