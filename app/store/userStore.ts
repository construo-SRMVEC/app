import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Address, Product } from "@/types";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  recentlyViewed: string[];
  favorites: string[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      recentlyViewed: [],
      favorites: [],

      login: async (email, password) => {
        // In a real app, this would make an API call
        // For demo purposes, we'll simulate a successful login
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({
            user: {
              id: "1",
              name: "Demo User",
              email,
              addresses: [],
              favorites: [],
              recentlyViewed: [],
            },
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      register: async (name, email, password) => {
        // In a real app, this would make an API call
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({
            user: {
              id: "1",
              name,
              email,
              addresses: [],
              favorites: [],
              recentlyViewed: [],
            },
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          console.error("Registration error:", error);
          return false;
        }
      },

      addAddress: (addressData) => {
        const { user } = get();
        if (!user) return;

        const newAddress: Address = {
          ...addressData,
          id: Date.now().toString(),
        };

        set({
          user: {
            ...user,
            addresses: [...user.addresses, newAddress],
          },
        });
      },

      removeAddress: (addressId) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            addresses: user.addresses.filter((addr) => addr.id !== addressId),
          },
        });
      },

      setDefaultAddress: (addressId) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            addresses: user.addresses.map((addr) => ({
              ...addr,
              isDefault: addr.id === addressId,
            })),
          },
        });
      },

      addToFavorites: (productId) => {
        const { favorites } = get();
        if (favorites.includes(productId)) return;

        set({
          favorites: [...favorites, productId],
        });
      },

      removeFromFavorites: (productId) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter((id) => id !== productId),
        });
      },

      addToRecentlyViewed: (productId) => {
        const { recentlyViewed } = get();

        // Remove if already exists to avoid duplicates
        const filtered = recentlyViewed.filter((id) => id !== productId);

        // Add to the beginning of the array (most recent first)
        set({
          recentlyViewed: [productId, ...filtered].slice(0, 10), // Keep only the 10 most recent
        });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
