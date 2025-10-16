import { useState } from "react";
import { SearchIcon, UserIcon, MailIcon, PhoneIcon, CalendarIcon, ShoppingBagIcon } from "lucide-react";

function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", orders: 12, totalSpent: "₹24,599", joinedDate: "Jan 15, 2024", status: "active" },
    { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "+91 98765 43211", orders: 8, totalSpent: "₹15,299", joinedDate: "Feb 20, 2024", status: "active" },
    { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43212", orders: 15, totalSpent: "₹35,999", joinedDate: "Mar 10, 2024", status: "active" },
    { id: 4, name: "Sneha Gupta", email: "sneha@example.com", phone: "+91 98765 43213", orders: 5, totalSpent: "₹8,999", joinedDate: "Apr 5, 2024", status: "inactive" },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765 43214", orders: 20, totalSpent: "₹45,499", joinedDate: "Jan 25, 2024", status: "active" }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Customer Management</h1>
          <p className="text-base-content/70">View and manage all customers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-primary">
              <UserIcon className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Customers</div>
            <div className="stat-value text-primary">{customers.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-title">Active</div>
            <div className="stat-value text-success">{customers.filter(c => c.status === 'active').length}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-title">New This Month</div>
            <div className="stat-value text-info">12</div>
          </div>
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-title">Avg. Orders</div>
            <div className="stat-value text-accent">12</div>
          </div>
        </div>

        {/* Search */}
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar placeholder">
                    <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-16">
                      <span className="text-2xl">{customer.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="card-title text-lg">{customer.name}</h3>
                    <div className={`badge ${customer.status === 'active' ? 'badge-success' : 'badge-ghost'} badge-sm`}>
                      {customer.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MailIcon className="w-4 h-4 text-base-content/60" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-base-content/60" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-base-content/60" />
                    <span>Joined {customer.joinedDate}</span>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-base-content/60">Total Orders</p>
                    <p className="text-lg font-bold">{customer.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Total Spent</p>
                    <p className="text-lg font-bold text-success">{customer.totalSpent}</p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminCustomersPage;
