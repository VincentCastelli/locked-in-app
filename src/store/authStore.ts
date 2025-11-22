import { create } from "zustand";
import { signInApi, signUpApi, forgotPasswordApi } from "../api/auth";

interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  signOut: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await signInApi(email, password);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await signUpApi(email, password);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    try {
      set({ isLoading: true });
      await forgotPasswordApi(email);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signOut: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  setUser: (user: User, token: string) => {
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },
}));
