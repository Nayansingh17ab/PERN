import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
