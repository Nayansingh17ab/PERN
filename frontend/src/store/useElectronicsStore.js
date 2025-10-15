import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Electronics subcategories configuration
const ELECTRONICS_SUBCATEGORIES = {
  mobiles: {
    name: "Mobiles",
    endpoint: "/api/electronics/mobiles",
    fields: ["name", "image", "price", "description", "brand", "model", "ram", "storage", "display_size", "processor", "camera", "battery", "color", "warranty_period", "stock_quantity"]
  },
  laptops: {
    name: "Laptops",
    endpoint: "/api/electronics/laptops",
    fields: ["name", "image", "price", "description", "brand", "model", "processor", "ram", "storage", "display_size", "graphics", "operating_system", "color", "warranty_period", "stock_quantity"]
  },
  televisions: {
    name: "Televisions",
    endpoint: "/api/electronics/televisions",
    fields: ["name", "image", "price", "description", "brand", "model", "screen_size", "resolution", "display_type", "smart_tv", "refresh_rate", "connectivity", "warranty_period", "stock_quantity"]
  },
  homeAppliances: {
    name: "Home Appliances",
    endpoint: "/api/electronics/home-appliances",
    fields: ["name", "image", "price", "description", "brand", "model", "type", "capacity", "power_consumption", "color", "energy_rating", "warranty_period", "stock_quantity"]
  },
  accessories: {
    name: "Accessories",
    endpoint: "/api/electronics/accessories",
    fields: ["name", "image", "price", "description", "brand", "type", "compatibility", "color", "material", "warranty_period", "stock_quantity"]
  }
};

export const useElectronicsStore = create((set, get) => ({
  subcategories: ELECTRONICS_SUBCATEGORIES,
  currentSubcategory: "mobiles",
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
      const endpoint = ELECTRONICS_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = ELECTRONICS_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = ELECTRONICS_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = ELECTRONICS_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = ELECTRONICS_SUBCATEGORIES[subcat].endpoint;
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
