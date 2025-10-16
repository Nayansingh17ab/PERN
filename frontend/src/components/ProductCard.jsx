import { EditIcon, Trash2Icon, ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";

function ProductCard({ product, subcategory, department, onDelete }) {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await onDelete(product.id, subcategory);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login to buy products");
      navigate("/login", { state: { from: `/${department}/${subcategory}` } });
      return;
    }
    // Add to cart
    addToCart(product, department, subcategory);
  };

  const handleEdit = () => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error("Please login as admin to edit products");
      navigate("/login", { state: { from: `/${department}/${subcategory}/${product.id}` } });
      return;
    }
    navigate(`/${department}/${subcategory}/${product.id}`);
  };

  const handleDeleteClick = () => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error("Please login as admin to delete products");
      navigate("/login", { state: { from: `/${department}/${subcategory}` } });
      return;
    }
    handleDelete();
  };

  // Dynamic field rendering based on what product has
  const renderProductDetails = () => {
    const details = [];

    // Common fields for all products
    if (product.brand) details.push({ label: "Brand", value: product.brand });
    if (product.type) details.push({ label: "Type", value: product.type });
    
    // Clothing specific
    if (product.size) details.push({ label: "Size", value: product.size });
    if (product.material) details.push({ label: "Material", value: product.material });
    if (product.fit) details.push({ label: "Fit", value: product.fit });
    if (product.gender) details.push({ label: "Gender", value: product.gender, badge: true });
    
    // Electronics specific
    if (product.model) details.push({ label: "Model", value: product.model });
    if (product.ram) details.push({ label: "RAM", value: product.ram });
    if (product.storage) details.push({ label: "Storage", value: product.storage });
    if (product.processor) details.push({ label: "Processor", value: product.processor });
    if (product.warranty_period) details.push({ label: "Warranty", value: product.warranty_period });
    
    // Food/Grocery specific
    if (product.weight) details.push({ label: "Weight", value: product.weight });
    if (product.volume) details.push({ label: "Volume", value: product.volume });
    if (product.flavor) details.push({ label: "Flavor", value: product.flavor });
    if (product.expiry_date) details.push({ label: "Expiry", value: new Date(product.expiry_date).toLocaleDateString() });
    if (product.organic) details.push({ label: "Organic", value: "Yes", badge: true });
    
    // Stationary specific
    if (product.pages) details.push({ label: "Pages", value: product.pages });
    if (product.ruling) details.push({ label: "Ruling", value: product.ruling });
    if (product.refillable !== undefined) details.push({ label: "Refillable", value: product.refillable ? "Yes" : "No" });

    return details;
  };

  const productDetails = renderProductDetails();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="px-4 pt-4">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg line-clamp-1">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          ₹{Number(product.price).toFixed(2)}
        </p>
        
        {/* Additional Info */}
        <div className="text-sm text-base-content/70 space-y-1">
          {productDetails.slice(0, 5).map((detail, index) => (
            <div key={index}>
              {detail.badge ? (
                <span className="badge badge-primary badge-sm">{detail.value}</span>
              ) : (
                <p>{detail.label}: {detail.value}</p>
              )}
            </div>
          ))}
          
          {/* Color display (special handling) */}
          {product.color && (
            <div className="flex items-center gap-2">
              <span>Color:</span>
              <div 
                className="badge badge-sm" 
                style={{ backgroundColor: product.color.toLowerCase() }}
              >
                {product.color}
              </div>
            </div>
          )}
          
          {/* Stock */}
          {product.stock_quantity !== undefined && (
            <p className={product.stock_quantity > 0 ? "text-success" : "text-error"}>
              Stock: {product.stock_quantity}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions justify-between mt-4">
          {/* Customer Actions */}
          {!isAdmin() && (
            <button
              onClick={handleBuyNow}
              className="btn btn-sm btn-primary flex-1"
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCartIcon className="w-4 h-4 mr-1" />
              Add to Cart
            </button>
          )}

          {/* Admin Actions */}
          {isAdmin() && (
            <>
              <button
                onClick={handleEdit}
                className="btn btn-sm btn-primary btn-outline"
              >
                <EditIcon className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="btn btn-sm btn-error btn-outline"
              >
                <Trash2Icon className="w-4 h-4 mr-1" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
