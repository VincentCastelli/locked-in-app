import { create } from "zustand";
import { signInApi, signUpApi } from "../api/auth";

interface User {
  _id: string;
  email: string;
  createdAt?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await signInApi(email, password);
      set({
        user: {
          _id: response.userId,
          email: response.email,
          createdAt: response.createdAt,
        },
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
        user: {
          _id: response.userId,
          email: response.email,
          createdAt: response.createdAt,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signOut: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
    });
  },
}));
