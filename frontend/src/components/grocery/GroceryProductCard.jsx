import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useGroceryStore } from "../../store/useGroceryStore";

function GroceryProductCard({ product, subcategory }) {
  const { deleteProduct } = useGroceryStore();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(product.id, subcategory);
    }
  };

  // Format expiry date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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
        
        {/* Additional Info based on subcategory */}
        <div className="text-sm text-base-content/70 space-y-1">
          {product.brand && <p>Brand: {product.brand}</p>}
          {product.type && <p>Type: {product.type}</p>}
          {product.weight && <p>Weight: {product.weight}</p>}
          {product.volume && <p>Volume: {product.volume}</p>}
          {product.origin && <p>Origin: {product.origin}</p>}
          {product.season && <p>Season: {product.season}</p>}
          {product.form && <p>Form: {product.form}</p>}
          {product.scent && <p>Scent: {product.scent}</p>}
          {product.expiry_date && (
            <p className="text-warning">Expiry: {formatDate(product.expiry_date)}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {product.organic && <span className="badge badge-success badge-sm">Organic</span>}
            {product.eco_friendly && <span className="badge badge-success badge-sm">Eco Friendly</span>}
          </div>
          {product.stock_quantity !== undefined && (
            <p className={product.stock_quantity > 0 ? "text-success" : "text-error"}>
              Stock: {product.stock_quantity}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/grocery/${subcategory}/${product.id}`}
            className="btn btn-sm btn-primary btn-outline"
          >
            <EditIcon className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error btn-outline"
          >
            <Trash2Icon className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroceryProductCard;
