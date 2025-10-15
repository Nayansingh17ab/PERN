import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentStore } from "../store/useDepartmentStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function DepartmentPage() {
  const { department } = useParams();
  const { 
    products = [], 
    loading, 
    error, 
    fetchProducts, 
    setCurrentDepartment,
    departments 
  } = useDepartmentStore();

  useEffect(() => {
    setCurrentDepartment(department);
    fetchProducts(department);
  }, [department, fetchProducts, setCurrentDepartment]);

  const departmentName = departments[department]?.name || department;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {departmentName}
          </h1>
          <p className="text-base-content/70 mt-2">
            Manage your {departmentName.toLowerCase()} inventory
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => fetchProducts(department)}
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("add_product_modal").showModal()}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && !loading && (
        <div className="text-center py-16">
          <PackageIcon className="w-24 h-24 mx-auto text-base-content/30 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No products found</h3>
          <p className="text-base-content/70">
            Get started by adding your first product to this department
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} department={department} />
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal department={department} />
    </div>
  );
}

export default DepartmentPage;
