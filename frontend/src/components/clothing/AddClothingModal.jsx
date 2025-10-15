import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useClothingStore } from "../../store/useClothingStore";

function AddClothingModal({ subcategory }) {
  const { addProduct, formData, setFormData, loading, subcategories } = useClothingStore();

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
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        );

      case "hooded":
        return (
          <div key={field} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Hooded</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={formData.hooded || false}
                onChange={(e) => setFormData({ ...formData, hooded: e.target.checked })}
              />
            </label>
          </div>
        );

      case "size":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text">Size</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.size || ""}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            >
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
          </div>
        );

      case "gender":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.gender || ""}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        );

      case "fit":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text">Fit</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.fit || ""}
              onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
            >
              <option value="">Select fit</option>
              <option value="Slim Fit">Slim Fit</option>
              <option value="Regular Fit">Regular Fit</option>
              <option value="Loose Fit">Loose Fit</option>
              <option value="Oversized">Oversized</option>
            </select>
          </div>
        );

      case "pack_of":
      case "stock_quantity":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text capitalize">{field.replace(/_/g, " ")}</span>
            </label>
            <input
              type="number"
              placeholder={`Enter ${field.replace(/_/g, " ")}`}
              className={commonClasses}
              value={formData[field] || ""}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
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

export default AddClothingModal;
