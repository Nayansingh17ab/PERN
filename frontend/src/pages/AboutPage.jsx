import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  HeadphonesIcon,
  UsersIcon,
  AwardIcon,
  TrendingUpIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon
} from "lucide-react";

function AboutPage() {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "1000+", label: "Products" },
    { number: "25+", label: "Categories" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      description: "Visionary leader with 15+ years in e-commerce"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      description: "Expert in supply chain and logistics management"
    },
    {
      name: "Amit Patel",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      description: "Building innovative solutions for seamless shopping"
    }
  ];

  const milestones = [
    { year: "2024", event: "ShopHub Founded", description: "Started our journey with a vision" },
    { year: "2024", event: "1000+ Products", description: "Expanded our catalog significantly" },
    { year: "2024", event: "10K Customers", description: "Reached our first major milestone" },
    { year: "2025", event: "Pan India", description: "Now delivering across all states" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="relative h-[70vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            About ShopHub
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8 leading-relaxed">
            Transforming the way India shops online with quality products, 
            competitive prices, and exceptional service since 2024
          </p>
          <div className="flex gap-4">
            <a href="#story" className="btn btn-primary btn-lg">
              Our Story
            </a>
            <a href="#team" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black">
              Meet the Team
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div id="story" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                From a small startup to one of India's most trusted e-commerce platforms
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <div className="card bg-base-100 shadow-2xl">
                  <div className="card-body">
                    <h3 className="text-3xl font-bold mb-4">The Beginning</h3>
                    <p className="text-lg mb-4">
                      Founded in 2024, ShopHub was born from a simple yet powerful idea: 
                      to make online shopping accessible, affordable, and enjoyable for 
                      every Indian household.
                    </p>
                    <p className="text-lg mb-4">
                      What started as a passion project by three friends has now grown 
                      into a thriving marketplace serving over 10,000 customers across India.
                    </p>
                    <p className="text-lg">
                      We believe in the power of choice, quality, and customer satisfaction. 
                      Every decision we make is guided by these core principles.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600" 
                  alt="Our Office"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <TrendingUpIcon className="w-12 h-12" />
                    <h3 className="text-3xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-lg">
                    To revolutionize online shopping in India by providing a seamless, 
                    trustworthy platform that offers quality products at competitive prices, 
                    delivered right to your doorstep.
                  </p>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-accent to-info text-accent-content shadow-2xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <AwardIcon className="w-12 h-12" />
                    <h3 className="text-3xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-lg">
                    To become India's most loved e-commerce platform, known for 
                    exceptional customer service, product quality, and innovative 
                    shopping experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Why Choose ShopHub?</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="bg-primary text-primary-content p-4 rounded-full mb-4">
                  <ShoppingBagIcon className="w-12 h-12" />
                </div>
                <h3 className="card-title text-xl mb-2">Wide Selection</h3>
                <p className="text-base-content/70">
                  1000+ products across 25 categories to choose from
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="bg-secondary text-secondary-content p-4 rounded-full mb-4">
                  <TruckIcon className="w-12 h-12" />
                </div>
                <h3 className="card-title text-xl mb-2">Fast Delivery</h3>
                <p className="text-base-content/70">
                  Quick and reliable shipping across India
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="bg-accent text-accent-content p-4 rounded-full mb-4">
                  <ShieldCheckIcon className="w-12 h-12" />
                </div>
                <h3 className="card-title text-xl mb-2">Secure Payments</h3>
                <p className="text-base-content/70">
                  Safe and encrypted payment processing
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="bg-info text-info-content p-4 rounded-full mb-4">
                  <HeadphonesIcon className="w-12 h-12" />
                </div>
                <h3 className="card-title text-xl mb-2">24/7 Support</h3>
                <p className="text-base-content/70">
                  Always here to help with your queries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <ul className="timeline timeline-vertical">
              {milestones.map((milestone, idx) => (
                <li key={idx}>
                  {idx !== 0 && <hr className="bg-primary" />}
                  <div className="timeline-start timeline-box bg-base-100 shadow-xl">
                    <div className="text-primary font-bold text-xl mb-2">{milestone.year}</div>
                    <div className="font-bold text-lg mb-1">{milestone.event}</div>
                    <div className="text-sm text-base-content/70">{milestone.description}</div>
                  </div>
                  <div className="timeline-middle">
                    <CheckCircleIcon className="w-6 h-6 text-primary" />
                  </div>
                  <hr className="bg-primary" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-base-content/70">
              The passionate people behind ShopHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <figure className="px-6 pt-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="rounded-xl w-full h-64 object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h3 className="card-title justify-center text-2xl">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                  <p className="text-base-content/70">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 inline-block">
                <HeartIcon className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Customer First</h3>
              <p className="opacity-90">
                Every decision starts with our customers' needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 inline-block">
                <StarIcon className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Quality Excellence</h3>
              <p className="opacity-90">
                We never compromise on product quality
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 inline-block">
                <TrendingUpIcon className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Innovation</h3>
              <p className="opacity-90">
                Constantly improving our platform and services
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 inline-block">
                <ShieldCheckIcon className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Trust & Integrity</h3>
              <p className="opacity-90">
                Honest pricing and transparent communication
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="relative py-32 bg-cover bg-center bg-fixed"
       

           style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200')",
        }}
        
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and experience the ShopHub difference
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/" className="btn btn-primary btn-lg">
              Start Shopping
            </a>
            <a href="/contact" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
