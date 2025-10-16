import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

function ContactPage() {
  const { isAdmin } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "Visit Us",
      details: ["123 Shopping Street", "Mumbai, Maharashtra 400001", "India"]
    },
    {
      icon: <PhoneIcon className="w-8 h-8" />,
      title: "Call Us",
      details: ["Customer Support: +91 9876543210", "Order Inquiries: +91 9876543211", "Mon-Sat: 9 AM - 8 PM"]
    },
    {
      icon: <MailIcon className="w-8 h-8" />,
      title: "Email Us",
      details: ["General: support@shophub.com", "Orders: orders@shophub.com", "We reply within 24 hours"]
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Working Hours",
      details: ["Monday - Saturday: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM", "24/7 Live Chat Available"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative py-16 md:py-24 bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1500')",
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/85 to-accent/90"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <SendIcon className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Get In Touch</h1>
          <p className="text-lg md:text-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Have questions? We'd love to hear from you!
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="card-body items-center text-center">
                  <div className="text-primary mb-4 animate-bounce-slow">
                    {info.icon}
                  </div>
                  <h3 className="card-title text-lg mb-3">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-base-content/70 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Map */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Form */}
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <h2 className="text-4xl font-bold mb-3">Send Us a Message</h2>
                <div className="w-20 h-1 bg-primary"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more..."
                    className="textarea textarea-bordered h-32 w-full focus:textarea-primary"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full">
                  <SendIcon className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="mb-6">
                <h2 className="text-4xl font-bold mb-3">Find Us Here</h2>
                <div className="w-20 h-1 bg-primary"></div>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px] hover:shadow-3xl transition-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.098394463094!2d77.59369931482177!3d12.971598990858995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="ShopHub Location"
                ></iframe>
              </div>
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
          {isAdmin() ? (
            <>
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Admin Panel</h2>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Manage customer inquiries and support tickets
              </p>
              <Link to="/admin/dashboard" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                View Dashboard
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Ready to Shop?</h2>
              <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Explore 1000+ products across 25+ categories
              </p>
              <a href="/" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Start Shopping
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
