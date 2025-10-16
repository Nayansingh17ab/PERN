import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, ShoppingCartIcon, UsersIcon, PackageIcon } from "lucide-react";

function AdminAnalyticsPage() {
  const metrics = [
    { title: "Revenue", value: "₹2.5M", change: "+15.3%", trend: "up", icon: <DollarSignIcon className="w-8 h-8" /> },
    { title: "Orders", value: "856", change: "+23.1%", trend: "up", icon: <ShoppingCartIcon className="w-8 h-8" /> },
    { title: "Customers", value: "10,542", change: "+8.7%", trend: "up", icon: <UsersIcon className="w-8 h-8" /> },
    { title: "Products Sold", value: "3,421", change: "-2.4%", trend: "down", icon: <PackageIcon className="w-8 h-8" /> }
  ];

  const topProducts = [
    { name: "Wireless Headphones", category: "Electronics", sales: 145, revenue: "₹1,45,000" },
    { name: "Cotton T-Shirt", category: "Clothing", sales: 234, revenue: "₹46,800" },
    { name: "Organic Honey", category: "Food", sales: 189, revenue: "₹56,700" },
    { name: "Notebook Set", category: "Stationary", sales: 156, revenue: "₹31,200" },
    { name: "Rice 5kg", category: "Grocery", sales: 298, revenue: "₹89,400" }
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-base-content/70">Track your store performance</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-base-content/60">{metric.title}</p>
                    <p className="text-3xl font-bold mt-2">{metric.value}</p>
                    <div className={`flex items-center gap-1 mt-2 ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
                      {metric.trend === 'up' ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
                      <span className="text-sm font-semibold">{metric.change}</span>
                    </div>
                  </div>
                  <div className="text-primary">
                    {metric.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Products */}
        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Top Selling Products</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="font-semibold">{product.name}</td>
                      <td><span className="badge badge-primary">{product.category}</span></td>
                      <td>{product.sales}</td>
                      <td className="font-bold text-success">{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Placeholder for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Revenue Chart</h2>
              <div className="h-64 flex items-center justify-center bg-base-300 rounded-lg">
                <p className="text-base-content/50">Chart Placeholder</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Sales by Category</h2>
              <div className="h-64 flex items-center justify-center bg-base-300 rounded-lg">
                <p className="text-base-content/50">Chart Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalyticsPage;
