import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivityTracker from "./components/ActivityTracker";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Public Pages
import HomePage from "./pages/HomePage";
import ClothingPage from "./pages/ClothingPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import FoodItemsPage from "./pages/FoodItemsPage";
import GroceryPage from "./pages/GroceryPage";
import StationaryPage from "./pages/StationaryPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

// Edit Pages (Admin Only)
import EditClothingPage from "./pages/EditClothingPage";
import EditElectronicsPage from "./pages/EditElectronicsPage";
import EditFoodItemsPage from "./pages/EditFoodItemsPage";
import EditGroceryPage from "./pages/EditGroceryPage";
import EditStationaryPage from "./pages/EditStationaryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

function App() {
  const { theme } = useThemeStore();
  const { checkAuth, checkSessionExpiry } = useAuthStore(); // ✅ Combined into single declaration

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    // Check session expiry on app load
    if (!checkSessionExpiry()) {
      checkAuth();
    }
  }, [checkAuth, checkSessionExpiry]); // ✅ Added dependencies

  return (
    <div className="min-h-screen bg-base-200">
      <ActivityTracker /> {/* ✅ Moved outside Routes */}
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/clothing" element={<ClothingPage />} />
        <Route path="/electronics" element={<ElectronicsPage />} />
        <Route path="/food-items" element={<FoodItemsPage />} />
        <Route path="/grocery" element={<GroceryPage />} />
        <Route path="/stationary" element={<StationaryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/order-details/:orderId" element={<OrderDetailsPage />} />

        {/* Admin Protected Routes */}
        <Route
          path="/clothing/:subcategory/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditClothingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/electronics/:subcategory/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditElectronicsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-items/:subcategory/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditFoodItemsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grocery/:subcategory/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditGroceryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stationary/:subcategory/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditStationaryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
