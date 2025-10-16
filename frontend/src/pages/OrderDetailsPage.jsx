import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PackageIcon, TruckIcon, CheckCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      setOrder(data.order);
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        className="btn btn-ghost mb-6"
        onClick={() => navigate("/orders")}
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Orders
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Order #{order.id}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-base-content/70">Order Date</p>
                  <p className="font-semibold">
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Order Status</p>
                  <p className="font-semibold capitalize">{order.order_status}</p>
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Payment Method</p>
                  <p className="font-semibold">{order.payment_method.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Payment Status</p>
                  <p className="font-semibold capitalize">{order.payment_status}</p>
                </div>
              </div>

              {/* Order Items */}
              <h3 className="font-bold text-lg mb-3">Items Ordered</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-base-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product_name}</h4>
                      <p className="text-sm text-base-content/70 capitalize">
                        {item.department} • {item.subcategory}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Quantity: {item.quantity}</span>
                        <span className="font-bold text-primary">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
                {order.shipping_address}<br />
                {order.city}, {order.state} - {order.pincode}<br />
                Phone: {order.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h3 className="card-title">Order Summary</h3>
              
              <div className="divider"></div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{(parseFloat(order.total_amount) - parseFloat(order.tax_amount)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST):</span>
                  <span>₹{parseFloat(order.tax_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-success">FREE</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{parseFloat(order.total_amount).toFixed(2)}</span>
              </div>

              {/* Order Timeline */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Order Status</h4>
                <ul className="steps steps-vertical">
                  <li className="step step-primary">Order Placed</li>
                  <li className={`step ${order.order_status !== 'pending' ? 'step-primary' : ''}`}>
                    Processing
                  </li>
                  <li className={`step ${order.order_status === 'shipped' || order.order_status === 'delivered' ? 'step-primary' : ''}`}>
                    Shipped
                  </li>
                  <li className={`step ${order.order_status === 'delivered' ? 'step-primary' : ''}`}>
                    Delivered
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
