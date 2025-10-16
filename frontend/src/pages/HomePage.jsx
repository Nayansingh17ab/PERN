import { Link } from "react-router-dom";
import { 
  ShirtIcon, 
  LaptopIcon, 
  AppleIcon, 
  ShoppingBasketIcon, 
  BookOpenIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  HeadphonesIcon,
  StarIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  SparklesIcon,
  CheckCircleIcon,
  AwardIcon,
  UsersIcon
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

function HomePage() {
  const { isAdmin } = useAuthStore();

  const departments = [
    {
      name: "Clothing",
      icon: <ShirtIcon className="w-12 h-12" />,
      description: "Latest fashion trends",
      link: "/clothing",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Electronics",
      icon: <LaptopIcon className="w-12 h-12" />,
      description: "Tech & gadgets",
      link: "/electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Food Items",
      icon: <AppleIcon className="w-12 h-12" />,
      description: "Fresh & delicious",
      link: "/food-items",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
      color: "from-orange-500 to-amber-500"
    },
    {
      name: "Grocery",
      icon: <ShoppingBasketIcon className="w-12 h-12" />,
      description: "Daily essentials",
      link: "/grocery",
      image: "https://images.unsplash.com/photo-1543168256-418811576931?w=400",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Stationary",
      icon: <BookOpenIcon className="w-12 h-12" />,
      description: "Office supplies",
      link: "/stationary",
      image: "https://images.unsplash.com/photo-1606660265514-358ebbadc80d?w=400",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const features = [
    {
      icon: <TruckIcon className="w-10 h-10" />,
      title: "Fast Delivery",
      description: "3-5 days delivery",
      highlight: "Free on ₹999+"
    },
    {
      icon: <ShieldCheckIcon className="w-10 h-10" />,
      title: "100% Secure",
      description: "Encrypted payments",
      highlight: "Safe Shopping"
    },
    {
      icon: <CreditCardIcon className="w-10 h-10" />,
      title: "Easy Returns",
      description: "7-day return policy",
      highlight: "No Questions"
    },
    {
      icon: <HeadphonesIcon className="w-10 h-10" />,
      title: "24/7 Support",
      description: "Always here to help",
      highlight: "Live Chat"
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing shopping experience! Fast delivery and quality products. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      verified: true
    },
    {
      name: "Priya Patel",
      location: "Delhi",
      rating: 5,
      comment: "Love the variety of products. The customer service is exceptional!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      verified: true
    },
    {
      name: "Amit Kumar",
      location: "Bangalore",
      rating: 5,
      comment: "Best prices online! I'm a regular customer now.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      verified: true
    }
  ];

  const trustBadges = [
    { icon: <ShieldCheckIcon className="w-8 h-8" />, text: "Secure Checkout" },
    { icon: <TruckIcon className="w-8 h-8" />, text: "Fast Shipping" },
    { icon: <AwardIcon className="w-8 h-8" />, text: "Quality Assured" },
    { icon: <UsersIcon className="w-8 h-8" />, text: "10K+ Customers" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Background */}
      <div 
        className="relative py-24 md:py-32 bg-cover bg-center bg-fixed overflow-hidden"
         style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/90 to-accent/95"></div>
        
        {/* Animated Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Main Title with Fade In Animation */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              Find Your Perfect Product
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-gray-100 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              Search across <span className="text-yellow-300 font-bold">1000+ products</span> in <span className="text-green-300 font-bold">25+ categories</span>
            </p>
            
           

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <CheckCircleIcon className="w-8 h-8 text-green-300" />
                  <div className="text-4xl font-bold">10K+</div>
                </div>
                <div className="text-sm opacity-90">Happy Customers</div>
              </div>
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards] bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <ShoppingBasketIcon className="w-8 h-8 text-blue-300" />
                  <div className="text-4xl font-bold">1000+</div>
                </div>
                <div className="text-sm opacity-90">Products</div>
              </div>
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards] bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <StarIcon className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                  <div className="text-4xl font-bold">4.8/5</div>
                </div>
                <div className="text-sm opacity-90">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="bg-base-200 py-8 border-b-2 border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {trustBadges.map((badge, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center gap-3 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-primary">{badge.icon}</div>
                <span className="font-semibold text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div id="categories" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">BROWSE</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">Shop by Category</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 opacity-0 animate-[scaleX_0.8s_ease-out_0.4s_forwards]"></div>
            <p className="text-lg text-base-content/70 opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
              Explore our wide range of products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {departments.map((dept, idx) => (
              <Link 
                key={idx}
                to={dept.link}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.8 + idx * 0.1}s` }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${dept.image}')` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${dept.color} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="mb-4 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                    {dept.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{dept.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{dept.description}</p>
                  <div className="btn btn-sm btn-circle btn-ghost group-hover:bg-white group-hover:text-primary transition-all duration-300">
                    <ArrowRightIcon className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">BENEFITS</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">Why ShopHub?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto opacity-0 animate-[scaleX_0.8s_ease-out_0.4s_forwards]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] group"
                style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
              >
                <div className="card-body items-center text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-5 rounded-full mb-4 text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-base-content/70 mb-3">{feature.description}</p>
                  <div className="badge badge-primary badge-outline">{feature.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 opacity-0 animate-[scaleX_0.8s_ease-out_0.4s_forwards]"></div>
            <p className="text-lg text-base-content/70 opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
              Real reviews • 4.8/5 average rating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.8 + idx * 0.1}s` }}
              >
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        {testimonial.verified && (
                          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-base-content/60">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-base-content/80 italic leading-relaxed">"{testimonial.comment}"</p>
                  
                  {testimonial.verified && (
                    <div className="badge badge-success badge-sm mt-3">Verified Purchase</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Parallax */}
      <div 
        className="relative py-24 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <TrendingUpIcon className="w-20 h-20 mx-auto mb-6 opacity-0 animate-[bounce_1s_ease-out_0.2s_infinite]" />
          
          {isAdmin() ? (
            <>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                Welcome, Admin!
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                Manage your store, products, and orders efficiently
              </p>
              <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                <Link to="/admin/dashboard" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 hover:scale-105 transition-transform">
                  Go to Dashboard
                </Link>
                <Link to="/clothing" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary hover:scale-105 transition-transform">
                  Manage Products
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                Ready to Start Shopping?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                Join <span className="text-yellow-300 font-bold">10,000+ satisfied customers</span> today!
              </p>
              <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                <Link to="/register" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 hover:scale-105 transition-transform">
                  Create Free Account
                </Link>
                <a href="#categories" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary hover:scale-105 transition-transform">
                  Browse Products
                </a>
              </div>
            </>
          )}

          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap text-sm opacity-0 animate-[fadeIn_0.8s_ease-out_1s_forwards]">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <TruckIcon className="w-5 h-5" />
              <span>Free Shipping Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl max-w-4xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] hover:scale-105 transition-transform duration-500">
            <div className="card-body text-center py-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6" />
                <span className="font-semibold text-sm tracking-wider">EXCLUSIVE DEALS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 10% Off Your First Order!</h2>
              <p className="text-lg mb-6 opacity-90">
                Subscribe for exclusive deals and new arrivals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input input-lg flex-1 text-base-content"
                />
                <button className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 hover:scale-105 transition-transform">
                  Subscribe Now
                </button>
              </div>
              <p className="text-sm mt-4 opacity-75">
                <CheckCircleIcon className="w-4 h-4 inline mr-1" />
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
