import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { PackageIcon, TruckIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders/my-orders", {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <ClockIcon className="w-5 h-5 text-warning" />;
      case "shipped":
        return <TruckIcon className="w-5 h-5 text-info" />;
      case "delivered":
        return <CheckCircleIcon className="w-5 h-5 text-success" />;
      case "cancelled":
        return <XCircleIcon className="w-5 h-5 text-error" />;
      default:
        return <PackageIcon className="w-5 h-5 text-base-content" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      processing: "badge-warning",
      shipped: "badge-info",
      delivered: "badge-success",
      cancelled: "badge-error",
      pending: "badge-ghost"
    };
    return badges[status] || "badge-ghost";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <PackageIcon className="w-32 h-32 mx-auto text-base-content/30 mb-6" />
          <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-base-content/70 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-base-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>
                    <span className={`badge ${getStatusBadge(order.order_status)}`}>
                      {order.order_status}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ₹{parseFloat(order.total_amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-base-content/70">
                    {order.payment_method.toUpperCase()} • {order.payment_status}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="py-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {order.items && order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold line-clamp-1">{item.product_name}</h4>
                        <p className="text-sm text-base-content/70 capitalize">
                          {item.department} • {item.subcategory}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <span className="font-semibold">₹{parseFloat(item.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="pt-4 border-t border-base-300">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-sm text-base-content/70">
                  {order.shipping_address}<br />
                  {order.city}, {order.state} - {order.pincode}<br />
                  Phone: {order.phone}
                </p>
              </div>

              {/* Order Status Timeline */}
              <div className="pt-4 border-t border-base-300">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.order_status)}
                  <span className="font-semibold capitalize">
                    {order.order_status === "processing" && "Order is being processed"}
                    {order.order_status === "shipped" && "Order has been shipped"}
                    {order.order_status === "delivered" && "Order delivered successfully"}
                    {order.order_status === "cancelled" && "Order was cancelled"}
                    {order.order_status === "pending" && "Order is pending"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="card-actions justify-end pt-4">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate(`/order-details/${order.id}`)}
                >
                  View Details
                </button>
                {order.order_status === "delivered" && (
                  <button className="btn btn-primary btn-sm">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
