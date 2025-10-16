import { 
  PackageIcon, 
  UsersIcon, 
  ShoppingCartIcon, 
  TrendingUpIcon,
  BarChart3Icon,
  SettingsIcon,
  PlusCircleIcon,
  ListIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminDashboard() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const stats = [
    {
      icon: <PackageIcon className="w-12 h-12" />,
      title: "Total Products",
      value: "1,234",
      change: "+12%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <ShoppingCartIcon className="w-12 h-12" />,
      title: "Total Orders",
      value: "856",
      change: "+23%",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <UsersIcon className="w-12 h-12" />,
      title: "Total Users",
      value: "10,542",
      change: "+8%",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <TrendingUpIcon className="w-12 h-12" />,
      title: "Revenue",
      value: "₹2.5M",
      change: "+15%",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const quickActions = [
    {
      title: "Add Products",
      description: "Add new products to store",
      icon: <PlusCircleIcon className="w-8 h-8" />,
      link: "/clothing",
      color: "btn-primary"
    },
    {
      title: "Manage Orders",
      description: "View and manage orders",
      icon: <ListIcon className="w-8 h-8" />,
      link: "/orders",
      color: "btn-secondary"
    },
    {
      title: "View Analytics",
      description: "Check sales analytics",
      icon: <BarChart3Icon className="w-8 h-8" />,
      link: "#",
      color: "btn-accent"
    },
    {
      title: "Settings",
      description: "Configure store settings",
      icon: <SettingsIcon className="w-8 h-8" />,
      link: "#",
      color: "btn-info"
    }
  ];

  const departments = [
    { name: "Clothing", link: "/clothing", color: "badge-primary" },
    { name: "Electronics", link: "/electronics", color: "badge-secondary" },
    { name: "Food Items", link: "/food-items", color: "badge-accent" },
    { name: "Grocery", link: "/grocery", color: "badge-success" },
    { name: "Stationary", link: "/stationary", color: "badge-warning" }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div 
        className="relative py-16 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1500')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">Admin Dashboard</h1>
          <p className="text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Manage your store efficiently
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="card-body">
                <div className={`bg-gradient-to-r ${stat.color} text-white p-4 rounded-lg w-fit mb-3`}>
                  {stat.icon}
                </div>
                <h3 className="text-base-content/60 text-sm">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="badge badge-success">{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.link}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="card-body items-center text-center">
                <div className="text-primary mb-3">
                  {action.icon}
                </div>
                <h3 className="card-title text-lg">{action.title}</h3>
                <p className="text-base-content/70 text-sm">{action.description}</p>
                <button className={`btn ${action.color} btn-sm mt-3`}>
                  Go to {action.title}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold mb-6">Manage Departments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {departments.map((dept, idx) => (
            <Link
              key={idx}
              to={dept.link}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="card-body items-center text-center py-6">
                <h3 className="font-bold">{dept.name}</h3>
                <div className={`badge ${dept.color} mt-2`}>Manage</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
