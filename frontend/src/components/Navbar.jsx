import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, LogOutIcon, PackageIcon, MenuIcon, XIcon, InfoIcon, PhoneIcon, HelpCircleIcon, TagIcon, SettingsIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();
  const { getCartCount } = useCartStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = getCartCount();

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
          {mobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/offers" onClick={() => setMobileMenuOpen(false)}>Offers</Link></li>
              <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
              <li><Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQs</Link></li>
              {isAdmin() && (
                <li><Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link></li>
              )}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          🛒 ShopHub
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/" className="btn btn-ghost btn-sm">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="btn btn-ghost btn-sm">
              <InfoIcon className="w-4 h-4 mr-1" />
              About Us
            </Link>
          </li>
          <li>
            <Link to="/offers" className="btn btn-ghost btn-sm">
              <TagIcon className="w-4 h-4 mr-1" />
              Offers
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn btn-ghost btn-sm">
              <PhoneIcon className="w-4 h-4 mr-1" />
              Contact
            </Link>
          </li>
          <li>
            <Link to="/faq" className="btn btn-ghost btn-sm">
              <HelpCircleIcon className="w-4 h-4 mr-1" />
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side Actions */}
      <div className="navbar-end gap-2">
        <ThemeSelector />

        {/* Cart */}
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="badge badge-sm badge-primary indicator-item">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* User Menu */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-base text-white shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-base-100 hover:ring-4 transition-all hover:scale-105">
                <span className="leading-none">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-300"
            >
              <li className="menu-title px-4 py-3 border-b border-base-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                    <span className="leading-none">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{user?.name || "User"}</p>
                    <p className="text-xs text-base-content/60">{user?.email || ""}</p>
                  </div>
                </div>
              </li>
              
              {/* Admin Dashboard Link */}
              {isAdmin() && (
                <li>
                  <Link to="/admin/dashboard" className="flex items-center gap-3 py-3">
                    <SettingsIcon className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                </li>
              )}
              
              <li>
                <Link to="/orders" className="flex items-center gap-3 py-3">
                  <PackageIcon className="w-5 h-5" />
                  <span>My Orders</span>
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
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
