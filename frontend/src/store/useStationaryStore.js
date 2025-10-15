import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Stationary subcategories configuration
const STATIONARY_SUBCATEGORIES = {
  pens: {
    name: "Pens",
    endpoint: "/api/stationary/pens",
    fields: ["name", "image", "price", "description", "brand", "type", "color", "ink_color", "tip_size", "pack_of", "refillable", "stock_quantity"]
  },
  notebooks: {
    name: "Notebooks",
    endpoint: "/api/stationary/notebooks",
    fields: ["name", "image", "price", "description", "brand", "pages", "size", "ruling", "binding", "cover_type", "stock_quantity"]
  },
  filesFolders: {
    name: "Files & Folders",
    endpoint: "/api/stationary/files-folders",
    fields: ["name", "image", "price", "description", "brand", "type", "size", "material", "color", "capacity", "stock_quantity"]
  },
  artSupplies: {
    name: "Art Supplies",
    endpoint: "/api/stationary/art-supplies",
    fields: ["name", "image", "price", "description", "brand", "type", "color", "quantity", "material", "stock_quantity"]
  },
  officeSupplies: {
    name: "Office Supplies",
    endpoint: "/api/stationary/office-supplies",
    fields: ["name", "image", "price", "description", "brand", "type", "material", "color", "size", "stock_quantity"]
  }
};

export const useStationaryStore = create((set, get) => ({
  subcategories: STATIONARY_SUBCATEGORIES,
  currentSubcategory: "pens",
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
      const endpoint = STATIONARY_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = STATIONARY_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = STATIONARY_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = STATIONARY_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = STATIONARY_SUBCATEGORIES[subcat].endpoint;
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
