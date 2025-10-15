import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Grocery subcategories configuration
const GROCERY_SUBCATEGORIES = {
  fruits: {
    name: "Fruits",
    endpoint: "/api/grocery/fruits",
    fields: ["name", "image", "price", "description", "type", "origin", "weight", "organic", "season", "stock_quantity"]
  },
  vegetables: {
    name: "Vegetables",
    endpoint: "/api/grocery/vegetables",
    fields: ["name", "image", "price", "description", "type", "origin", "weight", "organic", "season", "stock_quantity"]
  },
  staples: {
    name: "Staples",
    endpoint: "/api/grocery/staples",
    fields: ["name", "image", "price", "description", "brand", "type", "weight", "origin", "organic", "expiry_date", "stock_quantity"]
  },
  spices: {
    name: "Spices",
    endpoint: "/api/grocery/spices",
    fields: ["name", "image", "price", "description", "brand", "weight", "origin", "type", "form", "expiry_date", "stock_quantity"]
  },
  cleaningSupplies: {
    name: "Cleaning Supplies",
    endpoint: "/api/grocery/cleaning-supplies",
    fields: ["name", "image", "price", "description", "brand", "type", "volume", "scent", "eco_friendly", "stock_quantity"]
  }
};

export const useGroceryStore = create((set, get) => ({
  subcategories: GROCERY_SUBCATEGORIES,
  currentSubcategory: "fruits",
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {},

  setCurrentSubcategory: (subcategory) => {
    set({ currentSubcategory: subcategory, products: [], formData: {} });
  },

  setFormData: (formData) => set({ formData }),
  
  resetForm: () => set({ formData: {} }),

  fetchProducts: async (subcategory) => {
    const subcat = subcategory || get().currentSubcategory;
    set({ loading: true });
    try {
      const endpoint = GROCERY_SUBCATEGORIES[subcat].endpoint;
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      set({ products: response.data, error: null });
    } catch (err) {
      set({ error: "Failed to fetch products", products: [] });
      toast.error("Failed to fetch products");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id, subcategory) => {
    const subcat = subcategory || get().currentSubcategory;
    set({ loading: true });
    try {
      const endpoint = GROCERY_SUBCATEGORIES[subcat].endpoint;
      const response = await axios.get(`${BASE_URL}${endpoint}/${id}`);
      set({
        currentProduct: response.data,
        formData: response.data,
        error: null,
      });
    } catch (error) {
      set({ error: "Failed to fetch product", currentProduct: null });
      toast.error("Failed to fetch product");
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData, currentSubcategory } = get();
      const endpoint = GROCERY_SUBCATEGORIES[currentSubcategory].endpoint;
      await axios.post(`${BASE_URL}${endpoint}`, formData);
      await get().fetchProducts(currentSubcategory);
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Failed to add product");
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData, currentSubcategory } = get();
      const endpoint = GROCERY_SUBCATEGORIES[currentSubcategory].endpoint;
      const response = await axios.put(`${BASE_URL}${endpoint}/${id}`, formData);
      set({ currentProduct: response.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id, subcategory) => {
    const subcat = subcategory || get().currentSubcategory;
    set({ loading: true });
    try {
      const endpoint = GROCERY_SUBCATEGORIES[subcat].endpoint;
      await axios.delete(`${BASE_URL}${endpoint}/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      set({ loading: false });
    }
  },
}));
