import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";
const INACTIVITY_TIMEOUT = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      lastActivity: Date.now(), // ✅ Track last activity time

      // Update last activity
      updateActivity: () => {
        set({ lastActivity: Date.now() });
      },

      // Check if session is expired
      checkSessionExpiry: () => {
        const state = get();
        const timeSinceLastActivity = Date.now() - state.lastActivity;
        
        if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
          console.log("Session expired due to inactivity");
          get().logout();
          toast.error("Your session has expired due to inactivity. Please login again.");
          return true;
        }
        return false;
      },

      register: async (userData) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${BASE_URL}/api/auth/register`, userData, {
            withCredentials: true
          });
          set({ 
            user: response.data.user, 
            isAuthenticated: true, 
            loading: false,
            lastActivity: Date.now() // ✅ Set initial activity time
          });
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
          set({ 
            user: response.data.user, 
            isAuthenticated: true, 
            loading: false,
            lastActivity: Date.now() // ✅ Set initial activity time
          });
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
          await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
            withCredentials: true
          });
          set({ user: null, isAuthenticated: false, lastActivity: null });
          toast.success("Logged out successfully!");
        } catch (error) {
          console.error("Logout error:", error);
          // Force logout even if API fails
          set({ user: null, isAuthenticated: false, lastActivity: null });
        }
      },

      checkAuth: async () => {
        // Check session expiry first
        if (get().checkSessionExpiry()) {
          return;
        }

        try {
          const response = await axios.get(`${BASE_URL}/api/auth/me`, {
            withCredentials: true
          });
          set({ 
            user: response.data.user, 
            isAuthenticated: true,
            lastActivity: Date.now() // ✅ Update activity
          });
        } catch (error) {
          set({ user: null, isAuthenticated: false, lastActivity: null });
        }
      },

      isAdmin: () => {
        const state = get();
        return state.user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
