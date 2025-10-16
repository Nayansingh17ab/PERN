import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      userId: null, // Track which user owns this cart

      // Initialize cart for specific user
      initCart: (userId) => {
        const currentUserId = get().userId;
        
        // If different user, clear cart
        if (currentUserId !== userId) {
          set({ cart: [], userId });
        } else {
          set({ userId });
        }
      },

      // Add item to cart
      addToCart: (product, department, subcategory) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success("Quantity updated in cart!");
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1, department, subcategory }],
          });
          toast.success("Added to cart!");
        }
      },

      // Remove item from cart
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
        toast.success("Removed from cart!");
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({ cart: [] });
        toast.success("Cart cleared!");
      },

      // Clear cart when user logs out
      resetCart: () => {
        set({ cart: [], userId: null });
      },

      // Get cart total
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get cart count
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
      // Partition storage by userId
      partialize: (state) => ({
        cart: state.cart,
        userId: state.userId,
      }),
    }
  )
);
