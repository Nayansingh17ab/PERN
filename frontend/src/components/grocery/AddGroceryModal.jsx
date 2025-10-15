import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useGroceryStore } from "../../store/useGroceryStore";

function AddGroceryModal({ subcategory }) {
  const { addProduct, formData, setFormData, loading, subcategories } = useGroceryStore();

  const subcategoryConfig = subcategories[subcategory];

  const renderField = (field) => {
    const commonClasses = "input input-bordered w-full";
    
    switch (field) {
      case "name":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Package2Icon className="w-4 h-4" />
                Product Name *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className={commonClasses}
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        );
      
      case "price":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <DollarSignIcon className="w-4 h-4" />
                Price *
              </span>
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter price"
              className={commonClasses}
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
        );
      
      case "image":
        return (
          <div key={field} className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image URL *
              </span>
            </label>
            <input
              type="url"
              placeholder="Enter image URL"
              className={commonClasses}
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
        );
      
      case "description":
        return (
          <div key={field} className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Enter description"
              className="textarea textarea-bordered w-full"
              rows="2"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        );

      case "organic":
        return (
          <div key={field} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Organic</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={formData.organic || false}
                onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
              />
            </label>
          </div>
        );

      case "eco_friendly":
        return (
          <div key={field} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Eco Friendly</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={formData.eco_friendly || false}
                onChange={(e) => setFormData({ ...formData, eco_friendly: e.target.checked })}
              />
            </label>
          </div>
        );

      case "expiry_date":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text">Expiry Date</span>
            </label>
            <input
              type="date"
              className={commonClasses}
              value={formData.expiry_date || ""}
              onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
            />
          </div>
        );

      case "stock_quantity":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text">Stock Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className={commonClasses}
              value={formData.stock_quantity || ""}
              onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
            />
          </div>
        );

      default:
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text capitalize">{field.replace(/_/g, " ")}</span>
            </label>
            <input
              type="text"
              placeholder={`Enter ${field.replace(/_/g, " ")}`}
              className={commonClasses}
              value={formData[field] || ""}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
          </div>
        );
    }
  };

  return (
    <>
      <dialog id="add_product_modal" className="modal">
        <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("add_product_modal").close()}
          >
            ✕
          </button>

          {/* Modal Header */}
          <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
            <PlusCircleIcon className="w-6 h-6" />
            Add New {subcategoryConfig?.name} Product
          </h3>

          {/* Form */}
          <form onSubmit={addProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subcategoryConfig?.fields.map((field) => renderField(field))}
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("add_product_modal").close()}
              >
                Cancel
              </button>
              {loading ? (
                <button className="btn btn-primary" disabled>
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  <PlusCircleIcon className="w-4 h-4 mr-2" />
                  Add Product
                </button>
              )}
            </div>
          </form>
        </div>
      </dialog>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}

export default AddGroceryModal;
