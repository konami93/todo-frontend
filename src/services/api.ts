import axios from "axios";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Task,
  User,
  TaskStatistics,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    return data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },
};

export const taskService = {
  getTasks: async (status?: "PENDING" | "COMPLETED"): Promise<Task[]> => {
    const params = status ? { status } : {};
    const { data } = await api.get<Task[]>("/tasks", { params });
    return data;
  },

  getTask: async (id: string): Promise<Task> => {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  createTask: async (task: Partial<Task>): Promise<Task> => {
    const { data } = await api.post<Task>("/tasks", task);
    return data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const { data } = await api.patch<Task>(`/tasks/${id}`, task);
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  getStatistics: async (): Promise<TaskStatistics> => {
    const { data } = await api.get<TaskStatistics>("/tasks/statistics");
    return data;
  },
};

export default api;
