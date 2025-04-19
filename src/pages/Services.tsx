
import Layout from "../components/layout/Layout";
import { FileText, Users, Microscope, TrendingUp, Truck, Wrench } from "lucide-react";

const services = [
  {
    title: "Technical Consultation",
    description: "Expert advice on product selection and application methods for your specific project requirements.",
    icon: FileText,
    features: [
      "Project-specific product recommendations",
      "On-site technical consultation",
      "Application method guidance",
      "Custom solution development"
    ]
  },
  {
    title: "Training Programs",
    description: "Comprehensive training for contractors and applicators on proper product application techniques.",
    icon: Users,
    features: [
      "Hands-on application workshops",
      "Product knowledge sessions",
      "Best practices training",
      "Safety and handling procedures"
    ]
  },
  {
    title: "Laboratory Services",
    description: "Testing and analysis services to ensure optimal product performance for your specific conditions.",
    icon: Microscope,
    features: [
      "Material compatibility testing",
      "Product customization",
      "Quality assurance testing",
      "Performance verification"
    ]
  },
  {
    title: "Project Support",
    description: "On-site technical support during critical application phases of your construction project.",
    icon: TrendingUp,
    features: [
      "Application supervision",
      "Quality control monitoring",
      "Troubleshooting assistance",
      "Post-application inspection"
    ]
  },
  {
    title: "Supply Chain Solutions",
    description: "Reliable logistics and supply chain management for timely product delivery to your project site.",
    icon: Truck,
    features: [
      "Just-in-time delivery",
      "Project scheduling integration",
      "Bulk supply management",
      "International shipping coordination"
    ]
  },
  {
    title: "Maintenance Programs",
    description: "Planned maintenance services to ensure the longevity of applied products and systems.",
    icon: Wrench,
    features: [
      "Regular inspection schedules",
      "Preventive maintenance planning",
      "Repair recommendations",
      "Performance monitoring"
    ]
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl text-white/80">
              Comprehensive support services to ensure optimal product selection, application, and performance.
            </p>
          </div>
        </div>
      </div>

      {/* Services overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comprehensive Support for Your Projects</h2>
            <p className="text-muted-foreground">
              At Saint Woven Saver, we believe that superior products must be accompanied by exceptional service. Our range of services ensures that you get the maximum benefit from our construction chemical solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-muted">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                <div className="p-6 bg-white">
                  <h4 className="text-sm font-semibold text-primary mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-secondary/20 mt-1 mr-3 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service process section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Service Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center md:block">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                      1
                    </div>
                  </div>
                  <div className="md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-semibold mb-3">Initial Consultation</h3>
                    <p className="text-muted-foreground">
                      We begin by understanding your project requirements, challenges, and objectives through a detailed consultation with our technical team.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center md:block">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                      2
                    </div>
                  </div>
                  <div className="md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-semibold mb-3">Product Recommendation</h3>
                    <p className="text-muted-foreground">
                      Based on your specific needs, our experts recommend the most suitable products from our extensive range of construction chemicals.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center md:block">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                      3
                    </div>
                  </div>
                  <div className="md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-semibold mb-3">Product Demonstration</h3>
                    <p className="text-muted-foreground">
                      We conduct demonstrations to showcase product performance and application techniques, ensuring you understand the benefits and usage procedures.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center md:block">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                      4
                    </div>
                  </div>
                  <div className="md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-semibold mb-3">Technical Support</h3>
                    <p className="text-muted-foreground">
                      Our technical team provides on-site support during application, ensuring proper usage and optimal performance of our products.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center md:block">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold relative z-10">
                      5
                    </div>
                  </div>
                  <div className="md:w-5/6 md:pl-6">
                    <h3 className="text-xl font-semibold mb-3">Follow-up & Maintenance</h3>
                    <p className="text-muted-foreground">
                      We provide ongoing support and maintenance guidance to ensure long-term performance and durability of our products in your project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Client Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.67 11.67C14.45 11.67 12.5 12.33 10.83 13.67C9.17 15 8.33 16.83 8.33 19.17C8.33 21.5 9.17 23.33 10.83 24.67C12.5 26 14.45 26.67 16.67 26.67C17.22 26.67 17.69 26.87 18.08 27.25C18.47 27.64 18.67 28.11 18.67 28.67C18.67 29.22 18.47 29.69 18.08 30.08C17.69 30.47 17.22 30.67 16.67 30.67C13.22 30.67 10.28 29.56 7.83 27.33C5.39 25.11 4.17 22.39 4.17 19.17C4.17 15.94 5.39 13.22 7.83 11C10.28 8.78 13.22 7.67 16.67 7.67C17.22 7.67 17.69 7.87 18.08 8.25C18.47 8.64 18.67 9.11 18.67 9.67C18.67 10.22 18.47 10.69 18.08 11.08C17.69 11.47 17.22 11.67 16.67 11.67ZM31.67 11.67C29.45 11.67 27.5 12.33 25.83 13.67C24.17 15 23.33 16.83 23.33 19.17C23.33 21.5 24.17 23.33 25.83 24.67C27.5 26 29.45 26.67 31.67 26.67C32.22 26.67 32.69 26.87 33.08 27.25C33.47 27.64 33.67 28.11 33.67 28.67C33.67 29.22 33.47 29.69 33.08 30.08C32.69 30.47 32.22 30.67 31.67 30.67C28.22 30.67 25.28 29.56 22.83 27.33C20.39 25.11 19.17 22.39 19.17 19.17C19.17 15.94 20.39 13.22 22.83 11C25.28 8.78 28.22 7.67 31.67 7.67C32.22 7.67 32.69 7.87 33.08 8.25C33.47 8.64 33.67 9.11 33.67 9.67C33.67 10.22 33.47 10.69 33.08 11.08C32.69 11.47 32.22 11.67 31.67 11.67Z" fill="#E2E8F0" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4">
                "The technical support provided by Saint Woven Saver was exceptional. Their team guided us through product selection and application, resulting in a flawless waterproofing solution for our high-rise project."
              </p>
              <div className="border-t border-muted pt-4">
                <p className="font-semibold">Ahmed Khalid</p>
                <p className="text-sm text-muted-foreground">Project Manager, Al Futtaim Construction</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.67 11.67C14.45 11.67 12.5 12.33 10.83 13.67C9.17 15 8.33 16.83 8.33 19.17C8.33 21.5 9.17 23.33 10.83 24.67C12.5 26 14.45 26.67 16.67 26.67C17.22 26.67 17.69 26.87 18.08 27.25C18.47 27.64 18.67 28.11 18.67 28.67C18.67 29.22 18.47 29.69 18.08 30.08C17.69 30.47 17.22 30.67 16.67 30.67C13.22 30.67 10.28 29.56 7.83 27.33C5.39 25.11 4.17 22.39 4.17 19.17C4.17 15.94 5.39 13.22 7.83 11C10.28 8.78 13.22 7.67 16.67 7.67C17.22 7.67 17.69 7.87 18.08 8.25C18.47 8.64 18.67 9.11 18.67 9.67C18.67 10.22 18.47 10.69 18.08 11.08C17.69 11.47 17.22 11.67 16.67 11.67ZM31.67 11.67C29.45 11.67 27.5 12.33 25.83 13.67C24.17 15 23.33 16.83 23.33 19.17C23.33 21.5 24.17 23.33 25.83 24.67C27.5 26 29.45 26.67 31.67 26.67C32.22 26.67 32.69 26.87 33.08 27.25C33.47 27.64 33.67 28.11 33.67 28.67C33.67 29.22 33.47 29.69 33.08 30.08C32.69 30.47 32.22 30.67 31.67 30.67C28.22 30.67 25.28 29.56 22.83 27.33C20.39 25.11 19.17 22.39 19.17 19.17C19.17 15.94 20.39 13.22 22.83 11C25.28 8.78 28.22 7.67 31.67 7.67C32.22 7.67 32.69 7.87 33.08 8.25C33.47 8.64 33.67 9.11 33.67 9.67C33.67 10.22 33.47 10.69 33.08 11.08C32.69 11.47 32.22 11.67 31.67 11.67Z" fill="#E2E8F0" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4">
                "The training program provided by Saint Woven Saver was comprehensive and practical. Our application team now has the expertise to correctly apply their advanced waterproofing systems."
              </p>
              <div className="border-t border-muted pt-4">
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Training Manager, Gulf Contractors LLC</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.67 11.67C14.45 11.67 12.5 12.33 10.83 13.67C9.17 15 8.33 16.83 8.33 19.17C8.33 21.5 9.17 23.33 10.83 24.67C12.5 26 14.45 26.67 16.67 26.67C17.22 26.67 17.69 26.87 18.08 27.25C18.47 27.64 18.67 28.11 18.67 28.67C18.67 29.22 18.47 29.69 18.08 30.08C17.69 30.47 17.22 30.67 16.67 30.67C13.22 30.67 10.28 29.56 7.83 27.33C5.39 25.11 4.17 22.39 4.17 19.17C4.17 15.94 5.39 13.22 7.83 11C10.28 8.78 13.22 7.67 16.67 7.67C17.22 7.67 17.69 7.87 18.08 8.25C18.47 8.64 18.67 9.11 18.67 9.67C18.67 10.22 18.47 10.69 18.08 11.08C17.69 11.47 17.22 11.67 16.67 11.67ZM31.67 11.67C29.45 11.67 27.5 12.33 25.83 13.67C24.17 15 23.33 16.83 23.33 19.17C23.33 21.5 24.17 23.33 25.83 24.67C27.5 26 29.45 26.67 31.67 26.67C32.22 26.67 32.69 26.87 33.08 27.25C33.47 27.64 33.67 28.11 33.67 28.67C33.67 29.22 33.47 29.69 33.08 30.08C32.69 30.47 32.22 30.67 31.67 30.67C28.22 30.67 25.28 29.56 22.83 27.33C20.39 25.11 19.17 22.39 19.17 19.17C19.17 15.94 20.39 13.22 22.83 11C25.28 8.78 28.22 7.67 31.67 7.67C32.22 7.67 32.69 7.87 33.08 8.25C33.47 8.64 33.67 9.11 33.67 9.67C33.67 10.22 33.47 10.69 33.08 11.08C32.69 11.47 32.22 11.67 31.67 11.67Z" fill="#E2E8F0" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4">
                "The laboratory services provided invaluable insights for our challenging infrastructure project. The customized solutions developed specifically for our environment performed exceptionally well."
              </p>
              <div className="border-t border-muted pt-4">
                <p className="font-semibold">Rajesh Patel</p>
                <p className="text-sm text-muted-foreground">Chief Engineer, Metro Development Authority</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
