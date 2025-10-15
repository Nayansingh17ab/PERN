import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      register: async (userData) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${BASE_URL}/api/auth/register`, userData, {
            withCredentials: true
          });
          set({ user: response.data.user, isAuthenticated: true, loading: false });
          toast.success("Registration successful!");
          return response.data;
        } catch (error) {
          set({ loading: false });
          toast.error(error.response?.data?.error || "Registration failed");
          throw error;
        }
      },

      login: async (credentials) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials, {
            withCredentials: true
          });
          set({ user: response.data.user, isAuthenticated: true, loading: false });
          toast.success("Login successful!");
          return response.data;
        } catch (error) {
          set({ loading: false });
          toast.error(error.response?.data?.error || "Login failed");
          throw error;
        }
      },

      logout: async () => {
        try {
          await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
          set({ user: null, isAuthenticated: false });
          toast.success("Logout successful!");
        } catch (error) {
          toast.error("Logout failed");
        }
      },

      checkAuth: async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/auth/me`, {
            withCredentials: true
          });
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },

      isAdmin: () => {
        return get().user?.role === 'admin';
      },

      isCustomer: () => {
        return get().user?.role === 'customer';
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
