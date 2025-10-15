import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal"; // ✅ ADD THIS
import toast from "react-hot-toast";

function ElectronicsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState("mobiles");
  const { isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const subcategoryTabs = [
    { id: "mobiles", name: "Mobiles", icon: "📱" },
    { id: "laptops", name: "Laptops", icon: "💻" },
    { id: "televisions", name: "Televisions", icon: "📺" },
    { id: "home-appliances", name: "Home Appliances", icon: "🏠" },
    { id: "accessories", name: "Accessories", icon: "🎧" }
  ];

  const fetchProducts = async (subcategory) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/electronics/${subcategory}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id, subcategory) => {
    try {
      const response = await fetch(`http://localhost:3000/api/electronics/${subcategory}/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      
      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts(currentSubcategory);
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts(currentSubcategory);
  }, [currentSubcategory]);

  const handleAddProduct = () => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error("Please login as admin to add products");
      navigate("/login", { state: { from: `/electronics` } });
      return;
    }
    document.getElementById("add_product_modal")?.showModal(); // ✅ CHANGE THIS LINE
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Electronics - {subcategoryTabs.find(t => t.id === currentSubcategory)?.name}
          </h1>
          <p className="text-base-content/70 mt-2">
            {isAdmin() ? "Manage" : "Browse"} {currentSubcategory} products
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-primary" onClick={() => fetchProducts(currentSubcategory)}>
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh
          </button>
          {isAdmin() && (
            <button className="btn btn-primary" onClick={handleAddProduct}>
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add Product
            </button>
          )}
        </div>
      </div>

      <div className="tabs tabs-boxed mb-6 bg-base-100 p-2 shadow-lg flex-wrap">
        {subcategoryTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab gap-2 ${currentSubcategory === tab.id ? 'tab-active' : ''}`}
            onClick={() => setCurrentSubcategory(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-16">
          <PackageIcon className="w-24 h-24 mx-auto text-base-content/30 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No products found</h3>
          <p className="text-base-content/70">
            {isAdmin() ? `Get started by adding your first ${currentSubcategory} product` : `Check back later for ${currentSubcategory} products`}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} subcategory={currentSubcategory} department="electronics" onDelete={deleteProduct} />
          ))}
        </div>
      )}

      {/* ✅ ADD THIS MODAL */}
      {isAdmin() && (
        <AddProductModal 
          department="electronics" 
          subcategory={currentSubcategory} 
          onProductAdded={() => fetchProducts(currentSubcategory)} 
        />
      )}
    </div>
  );
}

export default ElectronicsPage;
