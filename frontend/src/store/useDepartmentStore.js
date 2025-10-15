import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Department configuration
const DEPARTMENTS = {
  clothing: {
    name: "Clothing",
    endpoint: "/api/clothing",
    fields: ["name", "image", "price", "description", "size", "color", "material", "brand", "gender", "stock_quantity"]
  },
  foodItems: {
    name: "Food Items",
    endpoint: "/api/food-items",
    fields: ["name", "image", "price", "description", "category", "expiry_date", "weight", "nutritional_info", "ingredients", "allergens", "stock_quantity"]
  },
  stationary: {
    name: "Stationary",
    endpoint: "/api/stationary",
    fields: ["name", "image", "price", "description", "brand", "type", "color", "quantity_per_pack", "stock_quantity"]
  },
  grocery: {
    name: "Grocery",
    endpoint: "/api/grocery",
    fields: ["name", "image", "price", "description", "category", "weight", "expiry_date", "brand", "organic", "stock_quantity"]
  },
  electronics: {
    name: "Electronics",
    endpoint: "/api/electronics",
    fields: ["name", "image", "price", "description", "brand", "model", "warranty_period", "specifications", "color", "stock_quantity"]
  }
};

export const useDepartmentStore = create((set, get) => ({
  // State for all departments
  departments: DEPARTMENTS,
  currentDepartment: "clothing",
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {},

  // Set current department
  setCurrentDepartment: (dept) => {
    set({ currentDepartment: dept, products: [], formData: {} });
  },

  // Set form data
  setFormData: (formData) => set({ formData }),

  // Reset form
  resetForm: () => set({ formData: {} }),

  // Fetch all products from current department
  fetchProducts: async (department) => {
    const dept = department || get().currentDepartment;
    set({ loading: true });
    try {
      const endpoint = DEPARTMENTS[dept].endpoint;
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      set({ products: response.data, error: null });
    } catch (err) {
      set({ error: "Failed to fetch products", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch single product
  fetchProduct: async (id, department) => {
    const dept = department || get().currentDepartment;
    set({ loading: true });
    try {
      const endpoint = DEPARTMENTS[dept].endpoint;
      const response = await axios.get(`${BASE_URL}${endpoint}/${id}`);
      set({
        currentProduct: response.data,
        formData: response.data,
        error: null,
      });
    } catch (error) {
      set({ error: "Failed to fetch product", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  // Add product
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData, currentDepartment } = get();
      const endpoint = DEPARTMENTS[currentDepartment].endpoint;
      await axios.post(`${BASE_URL}${endpoint}`, formData);
      await get().fetchProducts(currentDepartment);
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

  // Update product
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData, currentDepartment } = get();
      const endpoint = DEPARTMENTS[currentDepartment].endpoint;
      const response = await axios.put(`${BASE_URL}${endpoint}/${id}`, formData);
      set({ currentProduct: response.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      set({ loading: false });
    }
  },

  // Delete product
  deleteProduct: async (id, department) => {
    const dept = department || get().currentDepartment;
    set({ loading: true });
    try {
      const endpoint = DEPARTMENTS[dept].endpoint;
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
