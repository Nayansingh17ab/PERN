import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { ShoppingCartIcon, LogOutIcon, UserIcon, LogInIcon, UserPlusIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuthStore();
  const { getCartCount } = useCartStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/clothing">Clothing</Link></li>
            <li><Link to="/electronics">Electronics</Link></li>
            <li><Link to="/food-items">Food Items</Link></li>
            <li><Link to="/grocery">Grocery</Link></li>
            <li><Link to="/stationary">Stationary</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          🛒 E-Shop
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/clothing">Clothing</Link></li>
          <li><Link to="/electronics">Electronics</Link></li>
          <li><Link to="/food-items">Food Items</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
          <li><Link to="/stationary">Stationary</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeSelector />

        {isAuthenticated ? (
          <>
            {!isAdmin() && (
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCartIcon className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <span className="badge badge-sm indicator-item badge-primary">
                      {getCartCount()}
                    </span>
                  )}
                </div>
              </Link>
            )}

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <span className="text-lg font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="menu-title">
                  <span>{user?.name}</span>
                  <span className="badge badge-sm badge-primary">{user?.role}</span>
                </li>
                <li><Link to="/profile"><UserIcon className="w-4 h-4" /> Profile</Link></li>
                {!isAdmin() && <li><Link to="/orders"><ShoppingCartIcon className="w-4 h-4" /> My Orders</Link></li>}
                <li><button onClick={handleLogout}><LogOutIcon className="w-4 h-4" /> Logout</button></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">
              <LogInIcon className="w-4 h-4 mr-2" />
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
