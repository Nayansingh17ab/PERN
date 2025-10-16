import { useState } from "react";
import { 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  XCircleIcon,
  EyeIcon
} from "lucide-react";

function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    { id: "#ORD-001", customer: "Rahul Sharma", email: "rahul@example.com", amount: "₹2,499", items: 3, status: "completed", date: "Oct 15, 2025" },
    { id: "#ORD-002", customer: "Priya Patel", email: "priya@example.com", amount: "₹1,299", items: 1, status: "pending", date: "Oct 15, 2025" },
    { id: "#ORD-003", customer: "Amit Kumar", email: "amit@example.com", amount: "₹3,999", items: 5, status: "processing", date: "Oct 14, 2025" },
    { id: "#ORD-004", customer: "Sneha Gupta", email: "sneha@example.com", amount: "₹899", items: 2, status: "completed", date: "Oct 14, 2025" },
    { id: "#ORD-005", customer: "Vikram Singh", email: "vikram@example.com", amount: "₹5,499", items: 4, status: "cancelled", date: "Oct 13, 2025" },
    { id: "#ORD-006", customer: "Neha Reddy", email: "neha@example.com", amount: "₹1,799", items: 2, status: "completed", date: "Oct 13, 2025" },
    { id: "#ORD-007", customer: "Arjun Mehta", email: "arjun@example.com", amount: "₹4,299", items: 3, status: "processing", date: "Oct 12, 2025" },
    { id: "#ORD-008", customer: "Divya Shah", email: "divya@example.com", amount: "₹999", items: 1, status: "pending", date: "Oct 12, 2025" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'processing': return 'badge-info';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-error';
      default: return 'badge-ghost';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      case 'processing': return <ClockIcon className="w-4 h-4" />;
      case 'pending': return <AlertCircleIcon className="w-4 h-4" />;
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Orders", value: orders.length, color: "text-primary" },
    { label: "Completed", value: orders.filter(o => o.status === 'completed').length, color: "text-success" },
    { label: "Processing", value: orders.filter(o => o.status === 'processing').length, color: "text-info" },
    { label: "Pending", value: orders.filter(o => o.status === 'pending').length, color: "text-warning" },
    { label: "Cancelled", value: orders.filter(o => o.status === 'cancelled').length, color: "text-error" }
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Order Management</h1>
          <p className="text-base-content/70">View and manage all customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card bg-base-200 shadow">
              <div className="card-body p-4">
                <p className="text-sm text-base-content/60">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
              </div>

              {/* Status Filter */}
              <select 
                className="select select-bordered w-full md:w-48"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Export */}
              <button className="btn btn-primary gap-2">
                <DownloadIcon className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, idx) => (
                      <tr key={idx} className="hover">
                        <td className="font-mono font-bold">{order.id}</td>
                        <td>
                          <div>
                            <div className="font-semibold">{order.customer}</div>
                            <div className="text-sm text-base-content/60">{order.email}</div>
                          </div>
                        </td>
                        <td>{order.items} items</td>
                        <td className="font-semibold text-lg">{order.amount}</td>
                        <td>
                          <div className={`badge ${getStatusColor(order.status)} gap-2`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </td>
                        <td className="text-sm">{order.date}</td>
                        <td>
                          <button className="btn btn-ghost btn-sm">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-base-content/60">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrdersPage;
