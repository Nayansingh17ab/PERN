import { Link, useNavigate } from "react-router-dom";
import { 
  LogOutIcon, 
  PackageIcon, 
  LayoutDashboardIcon,
  ShoppingBagIcon,
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  MenuIcon,
  XIcon
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";

function AdminNavbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const adminNav = [
    { name: "Dashboard", icon: <LayoutDashboardIcon className="w-4 h-4" />, path: "/admin/dashboard" },
    { name: "Products", icon: <ShoppingBagIcon className="w-4 h-4" />, path: "/admin/products" },
    { name: "Orders", icon: <PackageIcon className="w-4 h-4" />, path: "/admin/orders" },
    { name: "Customers", icon: <UsersIcon className="w-4 h-4" />, path: "/admin/customers" },
    { name: "Analytics", icon: <BarChart3Icon className="w-4 h-4" />, path: "/admin/analytics" },
    { name: "Settings", icon: <SettingsIcon className="w-4 h-4" />, path: "/admin/settings" }
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b-2 border-primary/20">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
          {mobileMenuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {adminNav.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/admin/dashboard" className="btn btn-ghost text-xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🛒 ShopHub Admin
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {adminNav.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className="btn btn-ghost btn-sm gap-2">
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        <ThemeSelector />

        {/* Admin Profile */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <span className="leading-none">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-300">
            <li className="menu-title px-4 py-3 border-b border-base-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'A'}</span>
                </div>
                <div>
                  <p className="font-bold text-sm">{user?.name || "Admin"}</p>
                  <p className="text-xs text-base-content/60">{user?.email || ""}</p>
                  <div className="badge badge-primary badge-xs mt-1">Admin</div>
                </div>
              </div>
            </li>
            <li>
              <Link to="/admin/settings" className="flex items-center gap-3 py-3">
                <SettingsIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center gap-3 py-3 text-error">
                <LogOutIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
