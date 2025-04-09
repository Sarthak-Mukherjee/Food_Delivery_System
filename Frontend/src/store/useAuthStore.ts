import { create } from 'zustand';
import { User } from '../types';
import { auth } from '../lib/api';

// Mock user for development testing

// Set to false to use real backend authentication


interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string,  password: string, role:string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Use real authentication
  user: null,
  isLoading: false,
  error: null,
  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await auth.login(username, password);
      console.log('Login successful:', user,token);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (err) {
      console.error('Login failed:', err);
      set({ error: 'Invalid credentials', isLoading: false });
    }
  },
  register: async (username, password,role) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await auth.register(username, password,role);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (err) {
      console.error('Registration failed:', err);
      set({ error: 'Registration failed', isLoading: false });
    }
  },
  logout: async () => {
    try {
      await auth.logout();
      set({ user: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
}));