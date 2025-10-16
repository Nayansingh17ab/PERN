import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { ShoppingCartIcon, Trash2Icon, PlusIcon, MinusIcon, ShoppingBagIcon } from "lucide-react";
import toast from "react-hot-toast";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

const handleCheckout = () => {
  if (cart.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }
  navigate("/checkout");
};


  const handleIncrement = (item) => {
    if (item.quantity < item.stock_quantity) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      toast.error("Cannot exceed available stock!");
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingCartIcon className="w-32 h-32 mx-auto text-base-content/30 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-base-content/70 mb-8">Add some products to your cart to get started!</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Shopping Cart ({getCartCount()} items)</h1>
            <button
              className="btn btn-ghost btn-sm text-error"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="card bg-base-100 shadow-lg"
              >
                <div className="card-body">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-base-content/70 capitalize">
                        {item.department} • {item.subcategory}
                      </p>
                      {item.size && <p className="text-sm">Size: {item.size}</p>}
                      {item.color && <p className="text-sm">Color: {item.color}</p>}
                      <p className="text-lg font-bold text-primary mt-2">
                        ₹{Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        className="btn btn-ghost btn-circle btn-sm text-error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          className="btn btn-circle btn-sm"
                          onClick={() => handleDecrement(item)}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-circle btn-sm"
                          onClick={() => handleIncrement(item)}
                          disabled={item.quantity >= item.stock_quantity}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-lg font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <div className="divider"></div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-success">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST):</span>
                  <span className="font-semibold">₹{(getCartTotal() * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{(getCartTotal() * 1.18).toFixed(2)}</span>
              </div>

              <button
                className="btn btn-primary btn-block mt-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                className="btn btn-outline btn-block"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2 text-sm text-base-content/70">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
