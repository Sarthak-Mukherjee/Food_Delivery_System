import { create } from 'zustand';
import { food, categories as categoriesApi } from '../lib/api';
import { FoodItem, Category } from '../types';

interface FoodState {
  foodItems: FoodItem[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  fetchFoodItems: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addFoodItem: (newFoodItem: FoodItem) => Promise<void>;
  editFoodItem: (id: string, updatedFoodItem: Partial<FoodItem>) => Promise<void>;
  deleteFoodItem: (id: string) => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  foodItems: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null,

  fetchFoodItems: async () => {
    try {
      set({ isLoading: true, error: null });
      const foodItems = await food.getAll();
      set({ foodItems, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch food items:', error);
      set({ error: 'Failed to fetch food items', isLoading: false, foodItems: [] });
    }
  },

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const categories = await categoriesApi.getAll();
      set({ categories, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      set({ error: 'Failed to fetch categories', isLoading: false, categories: [] });
    }
  },

  addFoodItem: async (newFoodItem: FoodItem) => {
    try {
      set({ isLoading: true, error: null });
      const addedFoodItem = await food.add(newFoodItem);
      set((state) => ({
        foodItems: [...state.foodItems, addedFoodItem],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to add food item:', error);
      set({ error: 'Failed to add food item', isLoading: false });
    }
  },

  editFoodItem: async (id: string, updatedFoodItem: Partial<FoodItem>) => {
    try {
      set({ isLoading: true, error: null });
      const editedFoodItem = await food.update(id, updatedFoodItem);
      set((state) => ({
        foodItems: state.foodItems.map((foodItem) =>
          foodItem.id === id ? { ...foodItem, ...editedFoodItem } : foodItem
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to edit food item:', error);
      set({ error: 'Failed to edit food item', isLoading: false });
    }
  },

  deleteFoodItem: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await food.delete(id);
      set((state) => ({
        foodItems: state.foodItems.filter((foodItem) => foodItem.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to delete food item:', error);
      set({ error: 'Failed to delete food item', isLoading: false });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
}));
