import { HelpCircleIcon, SearchIcon, PhoneIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

function FAQPage() {
  const { isAdmin } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 3-5 business days. Express delivery is available in select cities with 1-2 day delivery."
        },
        {
          q: "Can I track my order?",
          a: "Yes! Once your order is shipped, you'll receive a tracking number via email. You can also track orders from your 'My Orders' page."
        },
        {
          q: "What if I'm not home during delivery?",
          a: "Our delivery partner will attempt delivery twice. If unsuccessful, the package will be held at the local facility for 7 days for pickup."
        }
      ]
    },
    {
      category: "Payments & Pricing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept Cash on Delivery (COD), Credit/Debit Cards, UPI, Net Banking, and popular digital wallets."
        },
        {
          q: "Is it safe to use my credit card?",
          a: "Yes, absolutely! All transactions are encrypted with industry-standard SSL technology. We never store your card details."
        },
        {
          q: "Can I get a refund?",
          a: "Yes, refunds are processed within 5-7 business days for prepaid orders. For COD orders, we provide store credit."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer 7-day returns on most products. Items must be unused, in original packaging with tags intact."
        },
        {
          q: "How do I return an item?",
          a: "Go to 'My Orders', select the item, click 'Return', and choose a reason. We'll arrange a pickup within 2-3 days."
        },
        {
          q: "Can I exchange products?",
          a: "Yes, exchanges are available for size/color differences. Request an exchange from your order page."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click 'Register' in the top-right corner, enter your details, and verify your email. That's it!"
        },
        {
          q: "I forgot my password. What should I do?",
          a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your inbox."
        },
        {
          q: "Is my personal information secure?",
          a: "Yes, we use advanced encryption and never share your data with third parties without consent."
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative py-16 md:py-24 bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1500')",
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/85 to-accent/90"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <HelpCircleIcon className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Find answers to common questions about shopping with us
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-lg w-full text-base-content pr-12"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-base-content/50" />
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, idx) => (
              <div key={idx} className="mb-12 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIdx) => (
                    <div key={faqIdx} className="collapse collapse-plus bg-base-200 shadow-lg hover:shadow-xl transition-all">
                      <input type="radio" name={`faq-${idx}`} />
                      <div className="collapse-title text-lg font-semibold flex items-center gap-3">
                        <span className="text-primary">Q:</span>
                        {faq.q}
                      </div>
                      <div className="collapse-content">
                        <p className="text-base-content/80 leading-relaxed pl-8 border-l-2 border-primary/30">
                          <span className="text-secondary font-semibold">A:</span> {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <HelpCircleIcon className="w-20 h-20 mx-auto mb-4 text-base-content/30" />
              <p className="text-xl text-base-content/60">No results found for "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")} className="btn btn-primary mt-4">
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Still Need Help Section - ADMIN/CUSTOMER CONDITIONAL */}
      <div 
        className="relative py-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1500')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          {isAdmin() ? (
            <>
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Manage FAQs</h2>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Add, edit, or remove frequently asked questions
              </p>
              <Link to="/admin/dashboard" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Still Need Help?</h2>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Our customer support team is here to help!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="card bg-white/10 backdrop-blur-sm shadow-xl hover:bg-white/20 transition-all animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <div className="card-body items-center text-center">
                    <PhoneIcon className="w-12 h-12 mb-4" />
                    <h3 className="card-title">Call Us</h3>
                    <p className="mb-4">Mon-Sat, 9 AM - 6 PM</p>
                    <a href="tel:+911234567890" className="btn bg-white text-primary hover:bg-gray-100 border-0">
                      +91 1234567890
                    </a>
                  </div>
                </div>

                <div className="card bg-white/10 backdrop-blur-sm shadow-xl hover:bg-white/20 transition-all animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <div className="card-body items-center text-center">
                    <MailIcon className="w-12 h-12 mb-4" />
                    <h3 className="card-title">Email Us</h3>
                    <p className="mb-4">We'll respond within 24 hours</p>
                    <a href="mailto:support@shophub.com" className="btn bg-white text-primary hover:bg-gray-100 border-0">
                      support@shophub.com
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
