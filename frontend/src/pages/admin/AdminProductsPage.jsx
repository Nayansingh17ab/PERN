import { Link } from "react-router-dom";
import { PlusCircleIcon, PackageIcon } from "lucide-react";

function AdminProductsPage() {
  const departments = [
    { name: "Clothing", link: "/clothing", icon: "👕", count: "234", color: "from-pink-500 to-rose-500" },
    { name: "Electronics", link: "/electronics", icon: "💻", count: "189", color: "from-blue-500 to-cyan-500" },
    { name: "Food Items", link: "/food-items", icon: "🍎", count: "312", color: "from-orange-500 to-amber-500" },
    { name: "Grocery", link: "/grocery", icon: "🛒", count: "456", color: "from-green-500 to-emerald-500" },
    { name: "Stationary", link: "/stationary", icon: "📚", count: "167", color: "from-purple-500 to-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Management</h1>
          <p className="text-base-content/70">Manage products across all departments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-primary">
              <PackageIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">1,358</div>
            <div className="stat-desc">↗︎ 12% (90 days)</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-title">Active</div>
            <div className="stat-value text-success">1,245</div>
            <div className="stat-desc">91.7% of inventory</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-title">Low Stock</div>
            <div className="stat-value text-warning">23</div>
            <div className="stat-desc">Needs attention</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-title">Out of Stock</div>
            <div className="stat-value text-error">8</div>
            <div className="stat-desc">Restock needed</div>
          </div>
        </div>

        {/* Departments Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Manage by Department</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, idx) => (
              <Link
                key={idx}
                to={dept.link}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="card-body">
                  <div className={`bg-gradient-to-r ${dept.color} text-white p-4 rounded-lg w-fit text-4xl mb-3`}>
                    {dept.icon}
                  </div>
                  <h3 className="card-title">{dept.name}</h3>
                  <p className="text-base-content/70">{dept.count} products</p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm">
                      Manage Products
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductsPage;
