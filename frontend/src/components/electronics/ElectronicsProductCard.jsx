import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useElectronicsStore } from "../../store/useElectronicsStore";

function ElectronicsProductCard({ product, subcategory }) {
  const { deleteProduct } = useElectronicsStore();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(product.id, subcategory);
    }
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
          ₹{Number(product.price).toLocaleString('en-IN')}
        </p>
        
        {/* Additional Info based on subcategory */}
        <div className="text-sm text-base-content/70 space-y-1">
          {product.brand && <p className="font-semibold text-base-content">{product.brand}</p>}
          {product.model && <p>Model: {product.model}</p>}
          {product.ram && <p>RAM: {product.ram}</p>}
          {product.storage && <p>Storage: {product.storage}</p>}
          {product.processor && <p>Processor: {product.processor}</p>}
          {product.display_size && <p>Display: {product.display_size}</p>}
          {product.screen_size && <p>Screen: {product.screen_size}</p>}
          {product.resolution && <p>Resolution: {product.resolution}</p>}
          {product.smart_tv && <span className="badge badge-success badge-sm">Smart TV</span>}
          {product.warranty_period && <p className="text-info">Warranty: {product.warranty_period}</p>}
          {product.stock_quantity !== undefined && (
            <p className={product.stock_quantity > 0 ? "text-success" : "text-error"}>
              Stock: {product.stock_quantity}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/electronics/${subcategory}/${product.id}`}
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

export default ElectronicsProductCard;
