import { TagIcon, PercentIcon, GiftIcon, TruckIcon, SparklesIcon, ClockIcon, CopyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

function OffersPage() {
  const { isAdmin } = useAuthStore();

  const offers = [
    {
      id: 1,
      title: "Flat 50% OFF on Electronics",
      description: "Get amazing discounts on laptops, mobiles, and accessories",
      code: "ELEC50",
      validTill: "Dec 31, 2025",
      icon: <PercentIcon className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-500",
      category: "electronics"
    },
    {
      id: 2,
      title: "Buy 2 Get 1 FREE on Clothing",
      description: "Stock up on your favorite fashion items",
      code: "CLOTH2GET1",
      validTill: "Dec 15, 2025",
      icon: <GiftIcon className="w-12 h-12" />,
      color: "from-pink-500 to-rose-500",
      category: "clothing"
    },
    {
      id: 3,
      title: "₹200 OFF on First Order",
      description: "New customer special! Minimum order ₹999",
      code: "FIRST200",
      validTill: "Dec 31, 2025",
      icon: <SparklesIcon className="w-12 h-12" />,
      color: "from-purple-500 to-indigo-500",
      category: "all"
    },
    {
      id: 4,
      title: "Free Shipping on All Orders",
      description: "No minimum order value required",
      code: "FREESHIP",
      validTill: "Dec 31, 2025",
      icon: <TruckIcon className="w-12 h-12" />,
      color: "from-green-500 to-emerald-500",
      category: "all"
    },
    {
      id: 5,
      title: "30% OFF on Grocery Items",
      description: "Save on your daily essentials",
      code: "GROCERY30",
      validTill: "Dec 20, 2025",
      icon: <TagIcon className="w-12 h-12" />,
      color: "from-orange-500 to-amber-500",
      category: "grocery"
    },
    {
      id: 6,
      title: "Combo Deals on Stationary",
      description: "Bundle and save up to 40%",
      code: "STATIO40",
      validTill: "Dec 25, 2025",
      icon: <GiftIcon className="w-12 h-12" />,
      color: "from-indigo-500 to-purple-500",
      category: "stationary"
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code "${code}" copied!`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative py-16 md:py-24 bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1500')",
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/85 to-accent/90"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <TagIcon className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Exclusive Offers & Deals</h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Save big with our exclusive deals and discounts
          </p>
          
          {/* Offer Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div className="text-center animate-scale-in bg-white/10 backdrop-blur-sm p-3 rounded-lg" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl font-bold mb-1">6+</div>
              <div className="text-sm opacity-90">Active Offers</div>
            </div>
            <div className="text-center animate-scale-in bg-white/10 backdrop-blur-sm p-3 rounded-lg" style={{ animationDelay: "0.4s" }}>
              <div className="text-3xl font-bold mb-1">50%</div>
              <div className="text-sm opacity-90">Max Discount</div>
            </div>
            <div className="text-center animate-scale-in bg-white/10 backdrop-blur-sm p-3 rounded-lg" style={{ animationDelay: "0.5s" }}>
              <div className="text-3xl font-bold mb-1">Free</div>
              <div className="text-sm opacity-90">Shipping</div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-wider animate-fade-in">LIMITED TIME</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in">Today's Best Deals</h2>
            <div className="w-20 h-1 bg-primary mx-auto animate-scale-x"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {offers.map((offer, idx) => (
              <div 
                key={offer.id}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up overflow-hidden group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${offer.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform">
                      {offer.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{offer.title}</h3>
                  </div>
                </div>

                <div className="card-body">
                  <p className="text-base-content/70 mb-4">{offer.description}</p>
                  
                  {/* Coupon Code */}
                  <div className="bg-base-300 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-base-content/60 mb-1">Coupon Code</div>
                        <div className="font-mono text-xl font-bold text-primary">{offer.code}</div>
                      </div>
                      <button 
                        onClick={() => copyCode(offer.code)}
                        className="btn btn-circle btn-sm btn-primary"
                      >
                        <CopyIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Valid Till */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-2 text-base-content/60">
                      <ClockIcon className="w-4 h-4" />
                      <span>Valid Till: {offer.validTill}</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Link 
                    to={`/${offer.category}`}
                    className="btn btn-primary w-full"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Section */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card bg-base-100 shadow-xl animate-fade-in">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4">Terms & Conditions</h3>
              <ul className="space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Offers are valid till the mentioned expiry date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Coupon codes cannot be combined with other offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Minimum order value may apply for certain offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ShopHub reserves the right to modify or cancel offers without prior notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Offers are applicable on select products and categories only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - ADMIN/CUSTOMER CONDITIONAL */}
      <div 
        className="relative py-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <GiftIcon className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          
          {isAdmin() ? (
            <>
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Manage Offers</h2>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Create and manage promotional campaigns
              </p>
              <Link to="/admin/dashboard" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Don't Miss Out!</h2>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Subscribe to get notified about new offers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input input-lg flex-1 text-base-content"
                />
                <button className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0">
                  Subscribe Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OffersPage;
