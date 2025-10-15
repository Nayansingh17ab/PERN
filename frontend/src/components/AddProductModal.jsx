import { useState } from "react";
import toast from "react-hot-toast";

function AddProductModal({ department, subcategory, onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    brand: "",
    stock_quantity: 0,
    // Dynamic fields based on department
    ...(department === "clothing" && { size: "", color: "", material: "", fit: "", gender: "" }),
    ...(department === "electronics" && { model: "", warranty_period: "", ram: "", storage: "" }),
    ...(department === "fooditems" && { weight: "", flavor: "", expiry_date: "", ingredients: "" }),
    ...(department === "grocery" && { weight: "", organic: false, origin: "" }),
    ...(department === "stationary" && { type: "", pages: "", color: "" })
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/${department}/${subcategory}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        document.getElementById("add_product_modal").close();
        // Reset form
        setFormData({
          name: "",
          image: "",
          price: "",
          description: "",
          brand: "",
          stock_quantity: 0
        });
        if (onProductAdded) onProductAdded();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Dynamic field configurations for each department
  const getExtraFields = () => {
    switch (department) {
      case "clothing":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Size</span></label>
                <input type="text" className="input input-bordered" value={formData.size || ""} onChange={(e) => handleChange("size", e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Color</span></label>
                <input type="text" className="input input-bordered" value={formData.color || ""} onChange={(e) => handleChange("color", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Material</span></label>
                <input type="text" className="input input-bordered" value={formData.material || ""} onChange={(e) => handleChange("material", e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Fit</span></label>
                <select className="select select-bordered" value={formData.fit || ""} onChange={(e) => handleChange("fit", e.target.value)}>
                  <option value="">Select Fit</option>
                  <option value="Slim">Slim</option>
                  <option value="Regular">Regular</option>
                  <option value="Loose">Loose</option>
                </select>
              </div>
            </div>
          </>
        );
      
      case "electronics":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Model</span></label>
                <input type="text" className="input input-bordered" value={formData.model || ""} onChange={(e) => handleChange("model", e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Warranty Period</span></label>
                <input type="text" className="input input-bordered" value={formData.warranty_period || ""} onChange={(e) => handleChange("warranty_period", e.target.value)} placeholder="e.g., 1 year" />
              </div>
            </div>
            {(subcategory === "mobiles" || subcategory === "laptops") && (
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">RAM</span></label>
                  <input type="text" className="input input-bordered" value={formData.ram || ""} onChange={(e) => handleChange("ram", e.target.value)} placeholder="e.g., 8GB" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Storage</span></label>
                  <input type="text" className="input input-bordered" value={formData.storage || ""} onChange={(e) => handleChange("storage", e.target.value)} placeholder="e.g., 256GB" />
                </div>
              </div>
            )}
          </>
        );
      
      case "fooditems":
      case "grocery":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Weight/Volume</span></label>
                <input type="text" className="input input-bordered" value={formData.weight || ""} onChange={(e) => handleChange("weight", e.target.value)} placeholder="e.g., 500g" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Origin</span></label>
                <input type="text" className="input input-bordered" value={formData.origin || ""} onChange={(e) => handleChange("origin", e.target.value)} />
              </div>
            </div>
            {department === "grocery" && (
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox" checked={formData.organic || false} onChange={(e) => handleChange("organic", e.target.checked)} />
                  <span className="label-text">Organic</span>
                </label>
              </div>
            )}
          </>
        );
      
      case "stationary":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Type</span></label>
              <input type="text" className="input input-bordered" value={formData.type || ""} onChange={(e) => handleChange("type", e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Color</span></label>
              <input type="text" className="input input-bordered" value={formData.color || ""} onChange={(e) => handleChange("color", e.target.value)} />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">
          Add New Product - {department}/{subcategory}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields - Always Present */}
          <div className="form-control">
            <label className="label"><span className="label-text">Product Name *</span></label>
            <input type="text" className="input input-bordered" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Image URL *</span></label>
            <input type="url" className="input input-bordered" value={formData.image} onChange={(e) => handleChange("image", e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Price *</span></label>
              <input type="number" step="0.01" className="input input-bordered" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Stock Quantity</span></label>
              <input type="number" className="input input-bordered" value={formData.stock_quantity} onChange={(e) => handleChange("stock_quantity", parseInt(e.target.value) || 0)} />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Brand</span></label>
            <input type="text" className="input input-bordered" value={formData.brand} onChange={(e) => handleChange("brand", e.target.value)} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea className="textarea textarea-bordered" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} rows="3" />
          </div>

          {/* Department-Specific Fields */}
          {getExtraFields()}

          {/* Actions */}
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => document.getElementById("add_product_modal").close()}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Add Product"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddProductModal;
