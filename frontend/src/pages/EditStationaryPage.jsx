import { useNavigate, useParams } from "react-router-dom";
import { useStationaryStore } from "../store/useStationaryStore";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function EditStationaryPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
    subcategories,
  } = useStationaryStore();

  const navigate = useNavigate();
  const { subcategory, id } = useParams();

  useEffect(() => {
    fetchProduct(id, subcategory);
  }, [id, subcategory]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id, subcategory);
      navigate("/stationary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id);
  };

  const subcategoryConfig = subcategories[subcategory];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error || "Product not found"}</span>
        </div>
      </div>
    );
  }

  const renderField = (field) => {
    const commonClasses = "input input-bordered w-full";

    switch (field) {
      case "description":
        return (
          <div key={field} className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        );

      case "refillable":
        return (
          <div key={field} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Refillable</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={formData.refillable || false}
                onChange={(e) => setFormData({ ...formData, refillable: e.target.checked })}
              />
            </label>
          </div>
        );

      case "price":
      case "pages":
      case "pack_of":
      case "quantity":
      case "stock_quantity":
        return (
          <div key={field} className="form-control">
            <label className="label">
              <span className="label-text capitalize">{field.replace(/_/g, " ")}</span>
            </label>
            <input
              type="number"
              step={field === "price" ? "0.01" : "1"}
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
              className={commonClasses}
              value={formData[field] || ""}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/stationary")}
            className="btn btn-outline btn-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </button>
          <button onClick={handleDelete} className="btn btn-error btn-sm">
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>

        {/* Product Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-6">
              Edit {subcategoryConfig?.name} Product
            </h2>

            {/* Product Image Preview */}
            {formData.image && (
              <div className="mb-6">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="rounded-xl max-h-64 w-full object-cover"
                />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcategoryConfig?.fields.map((field) => renderField(field))}
              </div>

              <div className="card-actions justify-end mt-6">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate("/stationary")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStationaryPage;
