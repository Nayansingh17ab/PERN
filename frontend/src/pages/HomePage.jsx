import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  const departments = [
    {
      id: "clothing",
      name: "Clothing",
      icon: "👕",
      description: "Shirts, Pants, Jackets & More",
      gradient: "from-blue-500 to-purple-500",
      path: "/clothing"
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: "📱",
      description: "Mobiles, Laptops, TVs & More",
      gradient: "from-cyan-500 to-blue-500",
      path: "/electronics"
    },
    {
      id: "food-items",
      name: "Food Items",
      icon: "🍕",
      description: "Snacks, Beverages, Dairy & More",
      gradient: "from-orange-500 to-red-500",
      path: "/food-items"
    },
    {
      id: "grocery",
      name: "Grocery",
      icon: "🛒",
      description: "Fruits, Vegetables, Staples & More",
      gradient: "from-green-500 to-emerald-500",
      path: "/grocery"
    },
    {
      id: "stationary",
      name: "Stationary",
      icon: "✏️",
      description: "Pens, Notebooks, Art Supplies & More",
      gradient: "from-yellow-500 to-orange-500",
      path: "/stationary"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to E-Shop
        </h1>
        <p className="text-xl text-base-content/70 mb-2">
          Your One-Stop Shopping Destination
        </p>
        {isAuthenticated && (
          <p className="text-lg">
            Welcome back, <span className="font-semibold text-primary">{user?.name}</span>! 
            {user?.role === 'admin' ? ' 👑 Admin' : ' 🛍️'}
          </p>
        )}
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {departments.map((dept) => (
          <Link 
            key={dept.id} 
            to={dept.path}
            className="group"
          >
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className={`card-body items-center text-center bg-gradient-to-br ${dept.gradient} text-white rounded-2xl`}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {dept.icon}
                </div>
                <h2 className="card-title text-2xl font-bold mb-2">
                  {dept.name}
                </h2>
                <p className="text-white/90 mb-4">
                  {dept.description}
                </p>
                <button className="btn btn-white btn-sm group-hover:btn-accent transition-all duration-300">
                  Browse Products →
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="divider mb-8">Our Features</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-base-100 rounded-box shadow-lg">
          <div className="text-5xl mb-4">🚚</div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-base-content/70">Quick and reliable shipping to your doorstep</p>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-box shadow-lg">
          <div className="text-5xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-base-content/70">Safe and encrypted payment processing</p>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-box shadow-lg">
          <div className="text-5xl mb-4">🎁</div>
          <h3 className="text-xl font-bold mb-2">Best Prices</h3>
          <p className="text-base-content/70">Competitive prices on all products</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mt-12 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">1000+</div>
          <div className="stat-desc">Across all categories</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title">Categories</div>
          <div className="stat-value text-secondary">5</div>
          <div className="stat-desc">Multiple departments</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="stat-title">Happy Customers</div>
          <div className="stat-value text-accent">5000+</div>
          <div className="stat-desc">And growing daily</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
