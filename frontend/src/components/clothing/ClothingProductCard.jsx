import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useClothingStore } from "../../store/useClothingStore";

function ClothingProductCard({ product, subcategory }) {
  const { deleteProduct } = useClothingStore();

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
          ₹{Number(product.price).toFixed(2)}
        </p>
        
        {/* Additional Info based on subcategory */}
        <div className="text-sm text-base-content/70 space-y-1">
          {product.brand && <p>Brand: {product.brand}</p>}
          {product.size && <p>Size: {product.size}</p>}
          {product.color && (
            <div className="flex items-center gap-2">
              <span>Color:</span>
              <div className="badge badge-sm" style={{ backgroundColor: product.color.toLowerCase() }}>
                {product.color}
              </div>
            </div>
          )}
          {product.material && <p>Material: {product.material}</p>}
          {product.fit && <p>Fit: {product.fit}</p>}
          {product.gender && <span className="badge badge-primary badge-sm">{product.gender}</span>}
          {product.stock_quantity !== undefined && (
            <p className={product.stock_quantity > 0 ? "text-success" : "text-error"}>
              Stock: {product.stock_quantity}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/clothing/${subcategory}/${product.id}`}
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

export default ClothingProductCard;
