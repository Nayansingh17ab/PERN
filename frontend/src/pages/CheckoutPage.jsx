import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { CreditCardIcon, WalletIcon, BanknoteIcon, CheckCircleIcon } from "lucide-react";
import toast from "react-hot-toast";

function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    paymentMethod: "cod"
  });

  const subtotal = getCartTotal();
  const taxAmount = subtotal * 0.18;
  const totalAmount = subtotal + taxAmount;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          cart,
          totalAmount,
          taxAmount,
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate(`/order-success/${data.order.id}`);
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Shipping Information</h2>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Address *</span>
                  </label>
                  <textarea
                    name="shippingAddress"
                    className="textarea textarea-bordered h-24"
                    placeholder="House No., Street, Locality"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">City *</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="input input-bordered"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">State *</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="input input-bordered"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Pincode *</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      className="input input-bordered"
                      pattern="[0-9]{6}"
                      maxLength="6"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="input input-bordered"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer border rounded-lg p-4 hover:bg-base-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      className="radio radio-primary"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    <BanknoteIcon className="w-6 h-6" />
                    <div className="flex-1">
                      <span className="font-semibold">Cash on Delivery</span>
                      <p className="text-sm text-base-content/70">Pay when you receive</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer border rounded-lg p-4 hover:bg-base-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      className="radio radio-primary"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                    />
                    <WalletIcon className="w-6 h-6" />
                    <div className="flex-1">
                      <span className="font-semibold">UPI Payment</span>
                      <p className="text-sm text-base-content/70">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer border rounded-lg p-4 hover:bg-base-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      className="radio radio-primary"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                    />
                    <CreditCardIcon className="w-6 h-6" />
                    <div className="flex-1">
                      <span className="font-semibold">Credit/Debit Card</span>
                      <p className="text-sm text-base-content/70">Visa, Mastercard, Rupay</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-base-content/70">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-success">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST):</span>
                  <span className="font-semibold">₹{taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
