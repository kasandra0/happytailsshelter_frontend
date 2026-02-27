import { api } from "@/lib/api";
import type { MedicalLog } from "@/types/types";
import { create } from "zustand";

interface MedicalLogState {
  medicalLogs: MedicalLog[];
  selectedMedicalLog: MedicalLog | null;
  loading: boolean;
  error: string | null;

  fetchMedicalLogs: () => Promise<void>;
  createMedicalLog: (
    medicalLog: Omit<MedicalLog, "medical_log_id">
  ) => Promise<void>;
  updateMedicalLog: (medicalLog: MedicalLog) => Promise<void>;
  deleteMedicalLog: (medical_log_id: number) => Promise<void>;
  setSelectedMedicalLog: (medicalLog: MedicalLog | null) => void;
}

export const useMedicalLogStore = create<MedicalLogState>((set) => ({
  medicalLogs: [],
  selectedMedicalLog: null,
  loading: false,
  error: null,

  fetchMedicalLogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<{ data: MedicalLog[] }>("medical-log");
      set({ medicalLogs: response.data });
    } catch (error) {
      set({ error: "Failed to fetch medical logs" });
    } finally {
      set({ loading: false });
    }
  },

  createMedicalLog: async (medicalLog) => {
    set({ loading: true, error: null });
    try {
      const noIdData = {
        animal_id: medicalLog.animal_id,
        type: medicalLog.type,
        created_date: medicalLog.created_date,
        user_id: medicalLog.user_id,
        description: medicalLog.description,
        start_date: medicalLog.start_date,
        end_date: medicalLog.end_date,
      };
      const response = await api.post<{ data: MedicalLog }>(
        "medical-log",
        noIdData
      );
      set((state) => ({ medicalLogs: [...state.medicalLogs, response.data] }));
    } catch (error) {
      set({ error: "Failed to create medical log" });
    } finally {
      set({ loading: false });
    }
  },

  updateMedicalLog: async (medicalLog) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put<{ data: MedicalLog }>(
        `medical-log/${medicalLog.log_history_id}`,
        medicalLog
      );
      set((state) => ({
        medicalLogs: state.medicalLogs.map((ml) =>
          ml.log_history_id === medicalLog.log_history_id ? response.data : ml
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update medical log" });
    } finally {
      set({ loading: false });
    }
  },

  deleteMedicalLog: async (medical_log_id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`medical-log/${medical_log_id}`);
      set((state) => ({
        medicalLogs: state.medicalLogs.filter(
          (ml) => ml.log_history_id !== medical_log_id
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
