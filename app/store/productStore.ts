import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/types";
import { products } from "@/mocks/products";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string | null;
  selectedFilters: {
    priceRange: [number, number] | null;
    ratings: number | null;
    sortBy: "price-asc" | "price-desc" | "rating" | "newest" | null;
  };
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setFilters: (filters: Partial<ProductState["selectedFilters"]>) => void;
  resetFilters: () => void;
  getProductById: (id: string) => Product | undefined;
}

const initialFilters = {
  priceRange: null,
  ratings: null,
  sortBy: null,
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products,
      filteredProducts: products,
      searchQuery: "",
      selectedCategory: null,
      selectedFilters: initialFilters,

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        const { selectedCategory, selectedFilters } = get();
        const filtered = applyFilters(
          products,
          query,
          selectedCategory,
          selectedFilters
        );
        set({ filteredProducts: filtered });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        const { searchQuery, selectedFilters } = get();
        const filtered = applyFilters(
          products,
          searchQuery,
          category,
          selectedFilters
        );
        set({ filteredProducts: filtered });
      },

      setFilters: (filters) => {
        const newFilters = { ...get().selectedFilters, ...filters };
        set({ selectedFilters: newFilters });

        const { searchQuery, selectedCategory } = get();
        const filtered = applyFilters(
          products,
          searchQuery,
          selectedCategory,
          newFilters
        );
        set({ filteredProducts: filtered });
      },

      resetFilters: () => {
        set({
          selectedFilters: initialFilters,
          searchQuery: "",
          selectedCategory: null,
          filteredProducts: products,
        });
      },

      getProductById: (id) => {
        return products.find((product) => product.id === id);
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        selectedCategory: state.selectedCategory,
        selectedFilters: state.selectedFilters,
      }),
    }
  )
);

// Helper function to apply filters
function applyFilters(
  allProducts: Product[],
  query: string,
  category: string | null,
  filters: ProductState["selectedFilters"]
): Product[] {
  let filtered = [...allProducts];

  // Apply search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Apply category filter
  if (category) {
    filtered = filtered.filter((product) => product.category === category);
  }

  // Apply price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter((product) => {
      const price = product.discountPrice || product.price;
      return price >= min && price <= max;
    });
  }

  // Apply ratings filter
  if (filters.ratings) {
    filtered = filtered.filter((product) => product.rating >= filters.ratings);
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer products have higher IDs for this demo
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }
  }

  return filtered;
}
