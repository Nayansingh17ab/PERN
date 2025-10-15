import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDepartmentStore } from "../store/useDepartmentStore";
import { TrendingUpIcon, PackageIcon, DollarSignIcon } from "lucide-react";

function DashboardPage() {
  const { departments, fetchProducts } = useDepartmentStore();
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch products from all departments
    Object.keys(departments).forEach((dept) => {
      fetchProducts(dept).then((products) => {
        setStats((prev) => ({
          ...prev,
          [dept]: {
            count: products?.length || 0,
            value: products?.reduce((sum, p) => sum + Number(p.price), 0) || 0,
          },
        }));
      });
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(departments).map(([key, dept]) => (
          <Link
            key={key}
            to={`/department/${key}`}
            className="stats shadow hover:shadow-xl transition-all"
          >
            <div className="stat">
              <div className="stat-figure text-primary">
                <PackageIcon className="w-8 h-8" />
              </div>
              <div className="stat-title">{dept.name}</div>
              <div className="stat-value text-primary">
                {stats[key]?.count || 0}
              </div>
              <div className="stat-desc">
                Total Value: ₹{stats[key]?.value?.toFixed(2) || "0.00"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
