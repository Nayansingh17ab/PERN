import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Food Items subcategories configuration
const FOODITEMS_SUBCATEGORIES = {
  snacks: {
    name: "Snacks",
    endpoint: "/api/fooditems/snacks",
    fields: ["name", "image", "price", "description", "brand", "weight", "flavor", "type", "ingredients", "nutritional_info", "allergens", "expiry_date", "stock_quantity"]
  },
  beverages: {
    name: "Beverages",
    endpoint: "/api/fooditems/beverages",
    fields: ["name", "image", "price", "description", "brand", "volume", "type", "flavor", "ingredients", "nutritional_info", "caffeine_content", "expiry_date", "stock_quantity"]
  },
  cannedGoods: {
    name: "Canned Goods",
    endpoint: "/api/fooditems/canned-goods",
    fields: ["name", "image", "price", "description", "brand", "weight", "type", "ingredients", "nutritional_info", "allergens", "expiry_date", "stock_quantity"]
  },
  dairy: {
    name: "Dairy",
    endpoint: "/api/fooditems/dairy",
    fields: ["name", "image", "price", "description", "brand", "weight", "type", "fat_content", "ingredients", "nutritional_info", "expiry_date", "organic", "stock_quantity"]
  },
  bakery: {
    name: "Bakery",
    endpoint: "/api/fooditems/bakery",
    fields: ["name", "image", "price", "description", "brand", "weight", "type", "ingredients", "nutritional_info", "allergens", "expiry_date", "stock_quantity"]
  }
};

export const useFoodItemsStore = create((set, get) => ({
  subcategories: FOODITEMS_SUBCATEGORIES,
  currentSubcategory: "snacks",
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
      const endpoint = FOODITEMS_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = FOODITEMS_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = FOODITEMS_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = FOODITEMS_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = FOODITEMS_SUBCATEGORIES[subcat].endpoint;
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
