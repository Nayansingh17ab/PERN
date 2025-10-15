import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Clothing subcategories configuration
const CLOTHING_SUBCATEGORIES = {
  shirts: {
    name: "Shirts",
    endpoint: "/api/clothing/shirts",
    fields: ["name", "image", "price", "description", "size", "color", "material", "brand", "pattern", "sleeve_type", "collar_type", "fit", "gender", "stock_quantity"]
  },
  pants: {
    name: "Pants",
    endpoint: "/api/clothing/pants",
    fields: ["name", "image", "price", "description", "size", "color", "material", "brand", "fit", "waist_size", "length", "style", "gender", "stock_quantity"]
  },
  jackets: {
    name: "Jackets",
    endpoint: "/api/clothing/jackets",
    fields: ["name", "image", "price", "description", "size", "color", "material", "brand", "jacket_type", "closure_type", "weather_type", "hooded", "gender", "stock_quantity"]
  },
  tshirts: {
    name: "T-Shirts",
    endpoint: "/api/clothing/tshirts",
    fields: ["name", "image", "price", "description", "size", "color", "material", "brand", "pattern", "sleeve_type", "neck_type", "fit", "gender", "stock_quantity"]
  },
  innerwears: {
    name: "Inner Wears",
    endpoint: "/api/clothing/innerwears",
    fields: ["name", "image", "price", "description", "size", "color", "material", "brand", "type", "pack_of", "gender", "stock_quantity"]
  }
};

export const useClothingStore = create((set, get) => ({
  subcategories: CLOTHING_SUBCATEGORIES,
  currentSubcategory: "shirts",
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
      const endpoint = CLOTHING_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = CLOTHING_SUBCATEGORIES[subcat].endpoint;
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
      const endpoint = CLOTHING_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = CLOTHING_SUBCATEGORIES[currentSubcategory].endpoint;
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
      const endpoint = CLOTHING_SUBCATEGORIES[subcat].endpoint;
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
