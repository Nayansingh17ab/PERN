import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivityTracker from "./components/ActivityTracker";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Customer Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import OffersPage from "./pages/OffersPage";
import FAQPage from "./pages/FAQPage";

// Product Pages
import ClothingPage from "./pages/ClothingPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import FoodItemsPage from "./pages/FoodItemsPage";
import GroceryPage from "./pages/GroceryPage";
import StationaryPage from "./pages/StationaryPage";

// Edit Pages (Admin Only)
import EditClothingPage from "./pages/EditClothingPage";
import EditElectronicsPage from "./pages/EditElectronicsPage";
import EditFoodItemsPage from "./pages/EditFoodItemsPage";
import EditGroceryPage from "./pages/EditGroceryPage";
import EditStationaryPage from "./pages/EditStationaryPage";

// Customer Protected Pages
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

// Route Protection Components
function CustomerProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admin to dashboard
  if (isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function HomeRoute() {
  const { isAuthenticated, isAdmin } = useAuthStore();

  // Redirect admin to dashboard
  if (isAuthenticated && isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}

function CustomerRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuthStore();

  // Redirect admin to dashboard if they try to access customer pages
  if (isAuthenticated && isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  const { theme } = useThemeStore();
  const { checkAuth, checkSessionExpiry, isAdmin } = useAuthStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!checkSessionExpiry()) {
      checkAuth();
    }
  }, [checkAuth, checkSessionExpiry]);

  return (
    <>
      <Toaster position="top-center" />
      <ActivityTracker />

      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Home Route - Conditional */}
        <Route path="/" element={<HomeRoute />} />

        {/* Customer-Only Pages */}
        <Route
          path="/about"
          element={
            <CustomerRoute>
              <AboutPage />
            </CustomerRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerRoute>
              <ContactPage />
            </CustomerRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <CustomerRoute>
              <OffersPage />
            </CustomerRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <CustomerRoute>
              <FAQPage />
            </CustomerRoute>
          }
        />

        {/* Product Pages - Accessible by both (different navbars) */}
        <Route
          path="/clothing"
          element={
            <>
              {isAdmin() ? <AdminNavbar /> : <Navbar />}
              <ClothingPage />
            </>
          }
        />
        <Route
          path="/electronics"
          element={
            <>
              {isAdmin() ? <AdminNavbar /> : <Navbar />}
              <ElectronicsPage />
            </>
          }
        />
        <Route
          path="/food-items"
          element={
            <>
              {isAdmin() ? <AdminNavbar /> : <Navbar />}
              <FoodItemsPage />
            </>
          }
        />
        <Route
          path="/grocery"
          element={
            <>
              {isAdmin() ? <AdminNavbar /> : <Navbar />}
              <GroceryPage />
            </>
          }
        />
        <Route
          path="/stationary"
          element={
            <>
              {isAdmin() ? <AdminNavbar /> : <Navbar />}
              <StationaryPage />
            </>
          }
        />

        {/* Customer Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Navbar />
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <CustomerProtectedRoute>
              <Navbar />
              <CheckoutPage />
            </CustomerProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <CustomerProtectedRoute>
              <Navbar />
              <OrderSuccessPage />
            </CustomerProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Navbar />
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminNavbar />
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminNavbar />
              <AdminOrdersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <AdminNavbar />
              <AdminCustomersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminNavbar />
              <AdminAnalyticsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminNavbar />
              <AdminSettingsPage />
            </AdminRoute>
          }
        />

        {/* Admin Edit Routes */}
        <Route
          path="/edit/clothing"
          element={
            <AdminRoute>
              <AdminNavbar />
              <EditClothingPage />
            </AdminRoute>
          }
        />
        <Route
          path="/edit/electronics"
          element={
            <AdminRoute>
              <AdminNavbar />
              <EditElectronicsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/edit/food-items"
          element={
            <AdminRoute>
              <AdminNavbar />
              <EditFoodItemsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/edit/grocery"
          element={
            <AdminRoute>
              <AdminNavbar />
              <EditGroceryPage />
            </AdminRoute>
          }
        />
        <Route
          path="/edit/stationary"
          element={
            <AdminRoute>
              <AdminNavbar />
              <EditStationaryPage />
            </AdminRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
