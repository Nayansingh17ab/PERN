import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircleIcon, PackageIcon } from "lucide-react";

function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        credentials: "include"
      });
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircleIcon className="w-24 h-24 text-success mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-base-content/70 mb-8">
          Thank you for your order. Your order ID is <span className="font-bold text-primary">#{orderId}</span>
        </p>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Order Details</h2>
            <div className="text-left space-y-2">
              <p><strong>Total Amount:</strong> ₹{order?.order.total_amount}</p>
              <p><strong>Payment Method:</strong> {order?.order.payment_method.toUpperCase()}</p>
              <p><strong>Shipping Address:</strong> {order?.order.shipping_address}, {order?.order.city}, {order?.order.state} - {order?.order.pincode}</p>
              <p><strong>Phone:</strong> {order?.order.phone}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="btn btn-primary">
            <PackageIcon className="w-5 h-5 mr-2" />
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
